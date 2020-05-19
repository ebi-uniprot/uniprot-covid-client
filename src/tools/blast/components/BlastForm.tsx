import React, { FC, Fragment, useState } from 'react';
import initialFormValues, {
  BlastFormValues,
  BlastFields,
} from '../config/BlastFormData';
import './styles/BlastForm.scss';
import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';

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

const BlastForm: FC<{ runBlastJob: (formValues: BlastFormValues) => void }> = ({
  runBlastJob,
}) => {
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
    const newFormValues = { ...formValues };
    newFormValues[BlastFields.taxon].selectedLabel = path;
    newFormValues[BlastFields.taxon].selected = id;
    setFormValues(newFormValues);
  };

  const submitBlastJob = () => {
    runBlastJob(formValues);
  };

  return (
    <Fragment>
      <h3>Submit new job</h3>
      <form>
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
                value={formValues[BlastFields.taxon].selectedLabel}
              />
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
                BlastFields.threshold,
                BlastFields.matrix,
                BlastFields.filter,
                BlastFields.gapped,
                BlastFields.hits,
              ].map((blastField) => (
                <FormSelect
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
            <button
              className="button primary"
              type="button"
              onClick={() => submitBlastJob()}
            >
              Submit
            </button>
          </section>
        </fieldset>
      </form>
    </Fragment>
  );
};

export default BlastForm;
