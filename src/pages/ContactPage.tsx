import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import BaseLayout from '../layout/BaseLayout';

import '../styles/ContactPage.scss';

type Props = {
  location: {
    state: {
      accession?: string;
    }
  }
} & RouteComponentProps;

const ContactPage: React.FC<Props> = ({
  location: { state: { accession = '' } },
}) => {
  const [subject, setSubject] = useState('');
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (accession.length > 0) {
      setSubject(`Covid-19 UniProtKB/Swiss-Prot ${accession} entry update request`);
    }
  }, [accession]);

  return (
    <BaseLayout>
      <form action="https://www.uniprot.org/feedback" method="POST">
        <input type="hidden" name="entry" value={accession} />
        <div className="contact-page-form">
          <h3>Contact</h3>
          <div className="contact-page-form__row">
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                name="name"
              />
            </label>
          </div>
          <div className="contact-page-form__row">
            <label htmlFor="email">
              Email
              <input
                id="email"
                type="text"
                name="email"
              />
            </label>
          </div>
          <div className="contact-page-form__row">
            <label htmlFor="subject">
              Subject
              <input
                id="subject"
                type="text"
                name="subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </label>
          </div>
          <div className="contact-page-form__row">
            <label htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
              />
            </label>
          </div>
          <div className="contact-page-form__row">
            <input
              name="privacy_ok"
              type="checkbox"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
            />
            &nbsp;
            I agree to the processing of my data for the purposes described in this
            &nbsp;
            <a href="https://www.uniprot.org/help/privacy">privacy notice</a>.
          </div>
          <div className="contact-page-form__row">
            <button
              type="submit"
              className={`button ${!agree && 'disabled'}`}
              disabled={!agree}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </BaseLayout>
  );
}

export default withRouter(ContactPage);
