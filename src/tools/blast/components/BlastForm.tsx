import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
  useMemo,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Chip,
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  sequenceProcessor,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import { v1 } from 'uuid';

import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';
import SequenceSearchLoader, {
  ParsedSequence,
  SequenceSearchLoaderInterface,
} from '../../components/SequenceSearchLoader';

import { addMessage } from '../../../messages/state/messagesActions';

import useReducedMotion from '../../../shared/hooks/useReducedMotion';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';

import { createJob } from '../../state/toolsActions';

import { JobTypes } from '../../types/toolsJobTypes';
import { FormParameters } from '../types/blastFormParameters';
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
} from '../types/blastServerParameters';

import { LocationToPath, Location } from '../../../app/config/urls';
import defaultFormValues, {
  BlastFormValues,
  BlastFormValue,
  BlastFields,
  SelectedTaxon,
} from '../config/BlastFormData';
import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import infoMappings from '../../../shared/config/InfoMappings';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import '../../styles/ToolsForm.scss';

const BLAST_LIMIT = 20;

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
  formValue: BlastFormValue;
  updateFormValue: React.Dispatch<React.SetStateAction<BlastFormValue>>;
}> = ({ formValue, updateFormValue }) => {
  if (!formValue) {
    return null;
  }
  const label = BlastFields[formValue.fieldName as keyof typeof BlastFields];
  return (
    <section className="tools-form-section__item">
      <label htmlFor={label}>
        {label}
        <select
          value={formValue.selected as string}
          onChange={(e) =>
            updateFormValue({ ...formValue, selected: e.target.value })
          }
        >
          {formValue.values &&
            formValue.values.map((optionItem) => (
              <option
                value={String(optionItem.value)}
                key={String(optionItem.value)}
                data-testid={`${label}-${optionItem.value}`}
              >
                {optionItem.label ? optionItem.label : optionItem.value}
              </option>
            ))}
        </select>
      </label>
    </section>
  );
};

interface CustomLocationState {
  parameters?: Partial<FormParameters>;
}

const BlastForm = () => {
  // refs
  const sslRef = useRef<SequenceSearchLoaderInterface>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  // state
  const initialFormValues = useMemo(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (history.location
      ?.state as CustomLocationState)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      const formValues: Partial<BlastFormValues> = {};
      const defaultValuesEntries = Object.entries(defaultFormValues) as [
        BlastFields,
        BlastFormValue
      ][];
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      for (const [key, field] of defaultValuesEntries) {
        formValues[key] = Object.freeze({
          ...field,
          selected:
            parametersFromHistoryState[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        }) as Readonly<BlastFormValue>;
      }
      return Object.freeze(formValues) as Readonly<BlastFormValues>;
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [history]);

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if the user manually changed the title
  const [jobNameEdited, setJobNameEdited] = useState(false);
  // store parsed sequence objects
  const [parsedSequences, setParsedSequences] = useState<ParsedSequence[]>(
    sequenceProcessor(initialFormValues[BlastFields.sequence].selected)
  );

  // actual form fields
  const [stype, setSType] = useState<BlastFormValues[BlastFields.stype]>(
    initialFormValues[BlastFields.stype]
  );
  const [program, setProgram] = useState<BlastFormValues[BlastFields.program]>(
    initialFormValues[BlastFields.program]
  );
  const [sequence, setSequence] = useState<
    BlastFormValues[BlastFields.sequence]
  >(initialFormValues[BlastFields.sequence]);
  const [database, setDatabase] = useState<
    BlastFormValues[BlastFields.database]
  >(initialFormValues[BlastFields.database]);
  const [taxIDs, setTaxIDs] = useState<BlastFormValues[BlastFields.taxons]>(
    initialFormValues[BlastFields.taxons]
  );
  const [threshold, setThreshold] = useState<
    BlastFormValues[BlastFields.threshold]
  >(initialFormValues[BlastFields.threshold]);
  const [matrix, setMatrix] = useState<BlastFormValues[BlastFields.matrix]>(
    initialFormValues[BlastFields.matrix]
  );
  const [filter, setFilter] = useState<BlastFormValues[BlastFields.filter]>(
    initialFormValues[BlastFields.filter]
  );
  const [gapped, setGapped] = useState<BlastFormValues[BlastFields.gapped]>(
    initialFormValues[BlastFields.gapped]
  );
  const [hits, setHits] = useState<BlastFormValues[BlastFields.hits]>(
    initialFormValues[BlastFields.hits]
  );

  // extra job-related fields
  const [jobName, setJobName] = useState(initialFormValues[BlastFields.name]);

  // taxon field handlers
  const updateTaxonFormValue = (path: string, id?: string) => {
    // Only proceed if a node is selected
    if (!id) {
      return;
    }

    const selected = (taxIDs.selected || []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) {
      return;
    }

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = path.replace(/ *\([^)]*\) */g, ' ');

    setTaxIDs({
      ...taxIDs,
      selected: [{ id, label }, ...selected],
    });
  };

  const removeTaxonFormValue = (id: string | number) => {
    const selected = (taxIDs.selected || []) as SelectedTaxon[];
    setTaxIDs({
      ...taxIDs,
      selected: selected.filter((taxon: SelectedTaxon) => taxon.id !== id),
    });
  };

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    setParsedSequences([]);

    setSType(defaultFormValues[BlastFields.stype]);
    setProgram(defaultFormValues[BlastFields.program]);
    setSequence(defaultFormValues[BlastFields.sequence]);
    setDatabase(defaultFormValues[BlastFields.database]);
    setTaxIDs(defaultFormValues[BlastFields.taxons]);
    setThreshold(defaultFormValues[BlastFields.threshold]);
    setMatrix(defaultFormValues[BlastFields.matrix]);
    setFilter(defaultFormValues[BlastFields.filter]);
    setGapped(defaultFormValues[BlastFields.gapped]);
    setHits(defaultFormValues[BlastFields.hits]);

    setJobName(defaultFormValues[BlastFields.name]);

    // imperatively reset SequenceSearchLoader... 😷
    // eslint-disable-next-line no-unused-expressions
    sslRef.current?.reset();
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!sequence.selected) {
      return;
    }

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      stype: stype.selected as SType,
      program: program.selected as Program,
      sequence: sequence.selected as Sequence,
      database: database.selected as Database,
      taxIDs: taxIDs.selected as SelectedTaxon[],
      threshold: threshold.selected as Exp,
      // remove "auto", and transform into corresponding matrix
      matrix:
        matrix.selected === 'auto'
          ? getAutoMatrixFor(sequence.selected as string)
          : (matrix.selected as Matrix),
      filter: filter.selected as Filter,
      // transform string into boolean
      gapped: (gapped.selected === 'true') as GapAlign,
      // transform string into number
      hits: parseInt(hits.selected as string, 10) as Scores,
    };

    const multipleParameters = parsedSequences.map((parsedSequence) => ({
      ...parameters,
      sequence: parsedSequence.raw as Sequence,
    }));

    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after history.push so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      for (let i = 0; i < parsedSequences.length; i += 1) {
        // take extracted name by default
        let { name = '' } = parsedSequences[i];
        if (jobNameEdited) {
          // if one was submitted by user, and we only have one sequence, use it
          if (parsedSequences.length === 1) {
            name = jobName.selected as string;
          } else {
            // if we have more sequences, append a counter
            name = `${jobName.selected as string} - ${i + 1}`;
          }
        }
        dispatch(createJob(multipleParameters[i], JobTypes.BLAST, name));
      }

      history.push(LocationToPath[Location.Dashboard], {
        parameters: multipleParameters,
      });
    });
  };

  // effects
  // set the "Auto" matrix to the have the correct label depending on sequence
  useEffect(() => {
    const autoMatrix = getAutoMatrixFor(sequence.selected as string);
    setMatrix((matrix) => ({
      ...matrix,
      values: [
        { label: `Auto - ${autoMatrix}`, value: 'auto' },
        ...(matrix.values || []).filter((option) => option.value !== 'auto'),
      ],
    }));
  }, [sequence.selected]);

  const onSequenceChange = useCallback(
    (parsedSequences: ParsedSequence[]) => {
      const rawSequence = parsedSequences
        .map((parsedSequence) => parsedSequence.raw)
        .join('\n');

      if (rawSequence === sequence.selected) {
        return;
      }

      if (!jobNameEdited) {
        // if the user didn't manually change the title, autofill it
        setJobName((jobName) => {
          const potentialJobName = parsedSequences[0]?.name || '';
          if (jobName.selected === potentialJobName) {
            // avoid unecessary rerender by keeping the same object
            return jobName;
          }
          return { ...jobName, selected: potentialJobName };
        });
      }

      setParsedSequences(parsedSequences);
      setSequence((sequence) => ({ ...sequence, selected: rawSequence }));
      setSubmitDisabled(
        parsedSequences.length > BLAST_LIMIT ||
          parsedSequences.some((parsedSequence) => !parsedSequence.valid)
      );

      setSType((stype) => {
        // we want protein by default
        const selected =
          parsedSequences[0]?.likelyType === 'na' ? 'dna' : 'protein';
        if (stype.selected === selected) {
          // avoid unecessary rerender by keeping the same object
          return stype;
        }
        return { ...stype, selected };
      });
    },
    [jobNameEdited, sequence.selected]
  );

  // file handling
  useTextFileInput({
    input: fileInputRef.current,
    onFileContent: (content) => onSequenceChange(sequenceProcessor(content)),
    onError: (error) =>
      dispatch(
        addMessage({
          id: v1(),
          content: error.message,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
        })
      ),
    dndOverlay: <span>Drop your input file anywhere on this page</span>,
  });

  const { name, links, info } = infoMappings[JobTypes.BLAST];

  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form onSubmit={submitBlastJob} onReset={handleReset}>
        <fieldset>
          <section className="tools-form-section__item">
            <legend>
              Find a protein sequence to run BLAST sequence similarity search by
              UniProt ID (e.g. P05067 or A4_HUMAN or UPI0000000001).
            </legend>
            <div className="import-sequence-section">
              <SequenceSearchLoader ref={sslRef} onLoad={onSequenceChange} />
            </div>
          </section>
        </fieldset>
        <section className="text-block">
          <strong>OR</strong>
        </section>
        <fieldset>
          <section className="text-block">
            <legend>
              Enter one or more sequences ({BLAST_LIMIT} max). You may also
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              .
            </legend>
            <SequenceSubmission
              placeholder="Protein or nucleotide sequence(s) in FASTA format."
              onChange={onSequenceChange}
              value={parsedSequences.map((sequence) => sequence.raw).join('\n')}
            />
          </section>
          <section className="tools-form-section">
            <FormSelect formValue={database} updateFormValue={setDatabase} />
            <section className="tools-form-section__item tools-form-section__item--taxon-select">
              <AutocompleteWrapper
                placeholder="Enter taxonomy names or tax IDs"
                url={uniProtKBApiUrls.organismSuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict by taxonomy"
                clearOnSelect
              />
            </section>
            <section className="tools-form-section__item tools-form-section__item--selected-taxon">
              {((taxIDs.selected as SelectedTaxon[]) || []).map(
                ({ label, id }: SelectedTaxon) => (
                  <div key={label}>
                    <Chip
                      onRemove={() => removeTaxonFormValue(id)}
                      className="secondary"
                    >
                      {label}
                    </Chip>
                  </div>
                )
              )}
            </section>
          </section>
          <section className="tools-form-section">
            <section className="tools-form-section__item">
              <label>
                Name your BLAST job
                <input
                  name="title"
                  type="text"
                  autoComplete="off"
                  maxLength={100}
                  style={{
                    width: `${(jobName.selected as string).length + 2}ch`,
                  }}
                  placeholder="my job title"
                  value={jobName.selected as string}
                  onChange={(event) => {
                    setJobNameEdited(Boolean(event.target.value));
                    setJobName({ ...jobName, selected: event.target.value });
                  }}
                />
              </label>
            </section>
          </section>
          <details className="tools-form-advanced" open>
            <summary>
              <span>Advanced parameters</span>
            </summary>
            <section className="tools-form-section">
              {[
                [stype, setSType],
                [program, setProgram],
                [threshold, setThreshold],
                [matrix, setMatrix],
                [filter, setFilter],
                [gapped, setGapped],
                [hits, setHits],
              ].map(([stateItem, setStateItem]) => (
                <FormSelect
                  key={(stateItem as BlastFormValue).fieldName}
                  formValue={stateItem as BlastFormValue}
                  updateFormValue={
                    setStateItem as React.Dispatch<
                      React.SetStateAction<BlastFormValue>
                    >
                  }
                />
              ))}
            </section>
          </details>
          <section className="tools-form-section tools-form-section__main_actions">
            <section className="button-group tools-form-section__buttons">
              {sending && !reducedMotion && (
                <>
                  <SpinnerIcon />
                  &nbsp;
                </>
              )}
              <input className="button secondary" type="reset" />
              <button
                className="button primary"
                type="submit"
                disabled={submitDisabled}
                onClick={submitBlastJob}
              >
                {parsedSequences.length <= 1
                  ? 'Run BLAST'
                  : `BLAST ${parsedSequences.length} sequences`}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

export default BlastForm;
