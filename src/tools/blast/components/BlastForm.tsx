import React, { FC, Fragment, useState, FormEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { FormParameters } from '../types/blastFormParameters';

import * as actions from '../../state/toolsActions';

import initialFormValues, {
  BlastFormValues,
  BlastFields,
  SelectedNode,
  Value,
  FormValue,
} from '../config/BlastFormData';

import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';

import './styles/BlastForm.scss';

const Taxon: FC<{ children: string }> = ({ children }) => (
  <span className="taxon">{children}</span>
);

const FormSelect: FC<{
  formValues: BlastFormValues;
  type: BlastFields;
  updateFormValues: (type: BlastFields, value: string) => void;
}> = ({ formValues, type, updateFormValues }) => {
  const formObject = formValues[type];
  if (!formObject) {
    return null;
  }
  return (
    <section className="blast-form-section__item">
      <label htmlFor={type}>
        {type}
        <select
          id={type}
          value={formValues[type].selected}
          onChange={(e) => updateFormValues(type, e.target.value)}
        >
          {formObject.values &&
            formObject.values.map((formValue) => (
              <option value={formValue.value} key={formValue.value}>
                {formValue.label ? formValue.label : formValue.value}
              </option>
            ))}
        </select>
      </label>
    </section>
  );
};

const BlastForm = () => {
  const dispatch = useDispatch();

  const [displayAdvanced, setDisplayAdvanced] = useState(false);
  const [formValues, setFormValues] = useState<BlastFormValues>(
    initialFormValues
  );

  const updateFormValue = (type: BlastFields, value: string) => {
    const newFormValues = { ...formValues };
    newFormValues[type].selected = value;
    setFormValues(newFormValues);
  };

  const updateTaxonFormValue = (path: string, id: string) => {
    // Only proceed if a node is selected
    if (!id) return;

    const taxonFormValues = formValues[BlastFields.taxons];
    const { values } = taxonFormValues;
    // If already there, don't add again
    if (values.some(({ value }: FormValue) => value === id)) {
      setFormValues({
        ...formValues,
        [BlastFields.taxons]: {
          ...taxonFormValues,
          selectedLabel: '',
        },
      });
      return;
    }

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = path.replace(/ *\([^)]*\) */g, ' ');
    console.log({ id, label });

    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selectedLabel: '',
        values: [{ value: id, label }, ...values],
      },
    });
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    const parameters = {};
    for (const { fieldName, selected } of Object.values(formValues)) {
      if (selected) parameters[fieldName] = selected;
    }

    // we emit an action containing only the parameters and the type of job
    // the reducer will be in charge of generating a proper job object for
    // internal state
    dispatch(actions.createJob(parameters as FormParameters, 'blast'));
  };
  console.log(
    'formValues[BlastFields.taxon].selectedLabel',
    formValues[BlastFields.taxons].selectedLabel
  );
  return (
    <Fragment>
      <h3>Submit new job</h3>
      <form onSubmit={submitBlastJob}>
        <fieldset>
          <section>
            <legend>Sequence</legend>
            <textarea
              placeholder="MLPGLALLLL or AGTTTCCTCGGCAGCGGTAGGC"
              onChange={(e) =>
                updateFormValue(BlastFields.sequence, e.target.value)
              }
              className="blast-form-textarea"
            >
              {formValues[BlastFields.sequence].selected}
            </textarea>
          </section>
          <section className="blast-form-section">
            <FormSelect
              formValues={formValues}
              type={BlastFields.targetDb}
              updateFormValues={updateFormValue}
            />
            <section className="blast-form-section__item">
              <AutocompleteWrapper
                url="/uniprot/api/suggester?dict=organism&query=?"
                onSelect={updateTaxonFormValue}
                title="Restrict to taxonomy"
                value={formValues[BlastFields.taxons].selectedLabel}
                clearOnSelect={true}
              />
              {(formValues[BlastFields.taxons].values || []).map(
                ({ label }: FormValue) => (
                  <Taxon key={label}>{label}</Taxon>
                )
              )}
            </section>
          </section>
          {!displayAdvanced ? (
            <button
              type="button"
              className="button tertiary"
              onClick={() => setDisplayAdvanced(true)}
            >
              Advanced
            </button>
          ) : (
            <section className="blast-form-section">
              {[
                BlastFields.stype,
                BlastFields.program,
                BlastFields.threshold,
                BlastFields.matrix,
                BlastFields.filter,
                BlastFields.gapped,
                BlastFields.hits,
              ].map((blastField) => (
                <FormSelect
                  key={blastField}
                  formValues={formValues}
                  type={blastField}
                  updateFormValues={updateFormValue}
                />
              ))}
            </section>
          )}
          <section>
            <button className="button secondary" type="button">
              Clear
            </button>
            <input
              className="button primary"
              type="submit"
              onClick={submitBlastJob}
              value="Submit"
            />
          </section>
        </fieldset>
      </form>
    </Fragment>
  );
};

export default BlastForm;
