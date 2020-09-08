import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import './styles/uniprot-footer.scss';

const UniProtFooter: FC<HTMLAttributes<HTMLElement>> = (props) => (
  <footer {...props} className={cn('uniprot-footer', props.className)}>
    © 2002 – {new Date().getFullYear()}
    <span className="uniprot-footer__links">
      <a href="https://www.uniprot.org/help/about">UniProt Consortium</a>
      {' | '}
      <a href="https://www.uniprot.org/help/license">License & Disclaimer</a>
      {' | '}
      <a href="https://www.uniprot.org/help/privacy">Privacy Notice</a>
    </span>
  </footer>
);

export default UniProtFooter;
