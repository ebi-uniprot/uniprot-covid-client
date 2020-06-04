import React, { FC, useState, FormEvent, MouseEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Chip,
  SequenceSubmission,
  SearchInput,
  PageIntro,
  SpinnerIcon,
  // extractNameFromFASTAHeader,
} from 'franklin-sites';
import queryString from 'query-string';
import { throttle } from 'lodash-es';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import { FormParameters } from '../types/blastFormParameters';
import { Job } from '../types/blastJob';

import * as actions from '../../state/toolsActions';
import { LocationToPath, Location } from '../../../app/config/urls';
import initialFormValues, {
  BlastFormValues,
  BlastFormValue,
  BlastFields,
  SelectedTaxon,
} from '../config/BlastFormData';

import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';
import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import fetchData from '../../../shared/utils/fetchData';
import { uniProtKBAccessionRegEx } from '../../../uniprotkb/utils';

import './styles/BlastForm.scss';
import {
  SType,
  Program,
  Sequence,
  Matrix,
  GapAlign,
  Database,
  Exp,
  Filter,
  Scores,
  TaxIDs,
} from '../types/blastServerParameters';
import infoMappings from '../../../shared/config/InfoMappings';
import { Tool } from '../../types';

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3848038/
const getAutoMatrixFor = (sequence: string): FormParameters['matrix'] => {
  if (sequence.length <= 34) {
    return 'PAM30';
  }
  if (sequence.length <= 49) {
    return 'PAM70';
  }
  if (sequence.length <= 85) {
    return 'BLOSUM80';
  }
  return 'BLOSUM62';
};

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
          value={formValues[type].selected as string}
          onChange={(e) => updateFormValues(type, e.target.value)}
        >
          {formObject.values &&
            formObject.values.map((formValue) => (
              <option
                value={String(formValue.value)}
                key={String(formValue.value)}
              >
                {formValue.label ? formValue.label : formValue.value}
              </option>
            ))}
        </select>
      </label>
    </section>
  );
};

interface CustomLocationState {
  parameters?: Job['parameters'];
}

type SequenceData = {
  primaryAccession: string;
  uniProtkbId: string;
};

type SequenceSubmissionOnChangeEvent = {
  sequence: string;
  valid: boolean;
  likelyType: 'na' | 'aa' | null;
  message: string | null;
};

function extractNameFromFASTAHeader(fasta: string): string | null | undefined {
  if (!fasta) {
    return;
  }

  const headers = fasta
    .split('\n')
    .map((line: string) => {
      return line.match(/>/g) ? line : null;
    })
    .filter(Boolean)
    .map((line: string | null) => {
      return line!.replace(/\s/gi, '').split('|');
    });

  if (headers && headers.length === 0) {
    return;
  }

  const accession = headers[0][1];

  return accession;
}

const BlastForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  const [displayAdvanced, setDisplayAdvanced] = useState(false);
  const [searchByIDValue, setSearchByIDValue] = useState('');
  const [sequenceImportFeedback, setSequenceImportFeedback] = useState('');

  const [formValues, setFormValues] = useState<Readonly<BlastFormValues>>(
    () => {
      // NOTE: we should use a similar logic to pre-fill fields based on querystring
      const parametersFromHistoryState: FormParameters | undefined = (history
        .location?.state as CustomLocationState)?.parameters;
      if (parametersFromHistoryState) {
        // if we get here, we got parameters passed with the location update to
        // use as pre-filled fields
        // yes, I'm doing that in one go to avoid having typescript complain about
        // the object not being of the right shape even though I want to construct
        // it in multiple steps 🙄
        return Object.freeze(
          Object.fromEntries(
            Object.entries(initialFormValues as BlastFormValues).map(
              ([key, field]) => [
                key,
                Object.freeze({
                  ...field,
                  selected:
                    parametersFromHistoryState[
                      field.fieldName as keyof FormParameters
                    ],
                }) as Readonly<BlastFormValue>,
              ]
            )
          )
        ) as Readonly<BlastFormValues>;
      }
      // otherwise, pass the default values
      return initialFormValues;
    }
  );

  const updateFormValue = (type: BlastFields, value: string) => {
    console.log('new value:', type, value);
    setFormValues({
      ...formValues,
      [type]: { ...formValues[type], selected: value },
    });
  };

  const updateTaxonFormValue = (path: string, id: string) => {
    // Only proceed if a node is selected
    if (!id) return;

    const taxonFormValues = formValues[BlastFields.taxons];
    const selected = (taxonFormValues.selected || []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) return;

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = path.replace(/ *\([^)]*\) */g, ' ');

    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selected: [{ id, label }, ...selected],
      },
    });
  };

  const removeTaxonFormValue = (id: string | number) => {
    const taxonFormValues = formValues[BlastFields.taxons];
    const selected = (taxonFormValues.selected || []) as SelectedTaxon[];
    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selected: selected.filter((taxon: SelectedTaxon) => taxon.id !== id),
      },
    });
  };

  const getTaxIDs = (taxons: SelectedTaxon[] = []) =>
    taxons.map(({ id }) => id).join(',');

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    const sequence = formValues[BlastFields.sequence].selected as Sequence;
    if (!sequence) return;

    setSubmitDisabled(true);
    setSending(true);

    const parameters: FormParameters = {
      stype: formValues[BlastFields.stype].selected as SType,
      program: formValues[BlastFields.program].selected as Program,
      sequence,
      database: formValues[BlastFields.targetDb].selected as Database,
      taxIDs: getTaxIDs(
        formValues[BlastFields.taxons].selected as SelectedTaxon[]
      ) as TaxIDs,
      threshold: formValues[BlastFields.threshold].selected as Exp,
      matrix:
        formValues[BlastFields.matrix].selected === 'auto'
          ? getAutoMatrixFor(
              formValues[BlastFields.sequence].selected as string
            )
          : (formValues[BlastFields.matrix].selected as Matrix),
      filter: formValues[BlastFields.filter].selected as Filter,
      gapped: (formValues[BlastFields.gapped].selected === 'true') as GapAlign,
      hits: parseInt(
        formValues[BlastFields.hits].selected as string,
        10
      ) as Scores,
    };

    const jobName = formValues[BlastFields.name].selected as string;

    // TODO: need to cast the values to the right types
    // e.g. hits 50 gets stored as a string somehow...

    // we emit an action containing only the parameters and the type of job
    // the reducer will be in charge of generating a proper job object for
    // internal state
    dispatch(actions.createJob(parameters, 'blast', jobName));
    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      history.push(LocationToPath[Location.Dashboard], { parameters });
    });
  };

  const resetSequenceData = () => {
    updateFormValue(BlastFields.sequence, '');
  };

  const updateImportSequenceFeedback = throttle((feedback: string) => {
    setSequenceImportFeedback(feedback);
  }, 500);

  const getSequenceByAccessionOrID = (input: string) => {
    if (!input) {
      resetSequenceData();
      return;
    }

    const clearInput: string = input.replace(/\s/g, '');

    if (clearInput.length === 0) {
      resetSequenceData();
      return;
    }

    const query: string = queryString.stringify({
      query: uniProtKBAccessionRegEx.test(clearInput)
        ? `accession:${clearInput}`
        : `id:${clearInput}`,
      fields: 'sequence, id',
    });

    updateImportSequenceFeedback('loading');

    fetchData(`${uniProtKBApiUrls.search}?${query}`)
      .then(({ data }) => {
        const { results } = data;
        if (results) {
          if (results.length > 0) {
            // updateFormValue(BlastFields.sequence, results[0].sequence.value);
            onSequenceChange({
              sequence: results[0].sequence.value,
              valid: true,
              likelyType: null,
              message: null,
            });
            setSequenceImportFeedback('success');
            return;
          } else {
            updateImportSequenceFeedback('no-results');
          }
          updateImportSequenceFeedback('no-results');
        } else {
          updateImportSequenceFeedback('invalid');
        }

        resetSequenceData();
      })
      .catch((e) => {
        console.error("can't get the sequence:", e);
      });
  };

  useEffect(() => {
    getSequenceByAccessionOrID(searchByIDValue);
  }, [searchByIDValue]);

  useEffect(() => {
    const matrix = getAutoMatrixFor(formValues.Sequence.selected as string);
    // eslint-disable-next-line no-shadow
    setFormValues((formValues: BlastFormValues) => ({
      ...formValues,
      [BlastFields.matrix]: {
        ...formValues[BlastFields.matrix],
        values: [
          { label: `Auto - ${matrix}`, value: 'auto' },
          ...(formValues[BlastFields.matrix].values || []).filter(
            (option) => option.value !== 'auto'
          ),
        ],
      },
    }));
  }, [formValues.Sequence.selected]);

  const { name, links, info } = infoMappings[Tool.blast];

  const onSequenceChange = (e: SequenceSubmissionOnChangeEvent) => {
    console.log('e:', e);
    if (e.sequence === formValues[BlastFields.sequence].selected) {
      return;
    }

    const name = extractNameFromFASTAHeader(e.sequence);

    if (name) {
      updateFormValue(BlastFields.name, name);
      console.log('got a name:', name);
    } else if (searchByIDValue) {
      updateFormValue(BlastFields.name, searchByIDValue);
    }
    console.log('name:', name);
    updateFormValue(BlastFields.sequence, e.sequence);
  };

  return (
    <SingleColumnLayout>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form onSubmit={submitBlastJob}>
        <fieldset>
          <section className="blast-form-section__item">
            <legend>
              Find a protein to BLAST by UniProt ID{' '}
              <small>(e.g. P05067 or A4_HUMAN or UPI0000000001)</small>.
            </legend>
            <div className="import-sequence-section">
              <SearchInput
                isLoading={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchByIDValue(e.target.value)
                }
                placeholder="P05067, A4_HUMAN, UPI0000000001"
                value={searchByIDValue}
              />
            </div>
          </section>
        </fieldset>
        <section className="text-block">
          <strong>OR</strong>
        </section>
        <fieldset>
          <section className="text-block">
            <legend>Enter either a protein or nucleotide sequence.</legend>
            <SequenceSubmission
              placeholder="MLPGLALLLL or AGTTTCCTCGGCAGCGGTAGGC"
              onChange={(e: SequenceSubmissionOnChangeEvent) =>
                onSequenceChange(e)
              }
              className="blast-form-textarea"
              value={String(formValues[BlastFields.sequence].selected)}
            />
          </section>
          <section className="blast-form-section">
            <FormSelect
              formValues={formValues}
              type={BlastFields.targetDb}
              updateFormValues={updateFormValue}
            />
            <section className="blast-form-section__item blast-form-section__item--taxon-select">
              <AutocompleteWrapper
                url={uniProtKBApiUrls.organismSuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict by taxonomy"
                clearOnSelect
              />
            </section>
            <section className="blast-form-section__item blast-form-section__item--selected-taxon">
              {(
                (formValues[BlastFields.taxons].selected as SelectedTaxon[]) ||
                []
              ).map(({ label, id }: SelectedTaxon) => (
                <div key={label}>
                  <Chip
                    onRemove={() => removeTaxonFormValue(id)}
                    className="secondary"
                  >
                    {label}
                  </Chip>
                </div>
              ))}
            </section>
          </section>
          <section>
            <section className="blast-form-section__item">
              <label>
                Name your BLAST job
                <input
                  name="title"
                  type="text"
                  autoComplete="off"
                  maxLength={22}
                  placeholder="my job title"
                  value={formValues[BlastFields.name].selected as string}
                  onChange={(e) =>
                    updateFormValue(BlastFields.name, e.target.value)
                  }
                />
              </label>
            </section>
          </section>
          <section className="blast-form-section">
            <button
              className="button primary blast-form-section__submit"
              type="submit"
              disabled={submitDisabled}
              onClick={submitBlastJob}
            >
              {sending ? <SpinnerIcon /> : 'Run Blast'}
            </button>
          </section>
          <section>
            <button
              type="button"
              className="button tertiary"
              onClick={() => setDisplayAdvanced((display) => !display)}
            >
              Advanced parameters {displayAdvanced ? '▾' : '▸'}
            </button>
            {displayAdvanced && (
              <>
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
                <section>
                  <input className="button secondary" type="reset" />
                </section>
              </>
            )}
          </section>
        </fieldset>
      </form>
    </SingleColumnLayout>
  );
};

export default BlastForm;
