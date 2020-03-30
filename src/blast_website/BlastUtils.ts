const params: { [key: string]: string } = {
  dataset: 'uniprotkb_refprotswissprot',
  threshold: '10',
  matrix: '',
  blastFilter: 'false',
  gapped: 'true',
  alignments: '250',
  redirect: 'yes',
  landingPage: 'no',
  url2: '',
};

const createHiddenField = (key: string, value: string) => {
  const hiddenField = document.createElement('input');
  hiddenField.type = 'hidden';
  hiddenField.name = key;
  hiddenField.value = value;
  return hiddenField;
};

const submitBlast = (sequence: string) => {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = '//www.uniprot.org/blast/';

  const sequenceField = createHiddenField('blastQuery', sequence);
  form.appendChild(sequenceField);

  Object.keys(params).forEach(key => {
    const hiddenField = createHiddenField(key, params[key]);
    form.appendChild(hiddenField);
  });

  document.body.appendChild(form);
  form.submit();
};

export default submitBlast;
