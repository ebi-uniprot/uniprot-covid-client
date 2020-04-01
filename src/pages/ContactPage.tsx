import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../state/state-types';
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
  }, []);

  return (
    <BaseLayout>
      <form action="https://www.uniprot.org/feedback" method="POST">
        <input type="hidden" name="entry" value={accession} />
        <div className="contact-page-form">
          <h3>Contact</h3>
          <div className="contact-page-form__row">
            <span>
              Name
            </span>
            <input
              id="name"
              type="text"
              name="name"
            />
          </div>
          <div className="contact-page-form__row">
            <span>
              Email
            </span>
            <input
              id="email"
              type="text"
              name="email"
            />
          </div>
          <div className="contact-page-form__row">
            <span>
              Subject
            </span>
            <input
              id="subject"
              type="text"
              name="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div className="contact-page-form__row">
            <span>
              Message
            </span>
            <textarea
              id="message"
              name="message"
            ></textarea>
          </div>
          <div className="contact-page-form__row">
            <span></span>
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
            <span></span>
            {agree
              ? <button type="submit" className="button">Submit</button>
              : <button type="submit" className="button disabled" disabled>Submit</button>
            }
          </div>
        </div>
      </form>
    </BaseLayout>
  );
}

export default withRouter(ContactPage);
