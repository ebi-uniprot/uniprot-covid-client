import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { KeywordCategory } from './types/keywordTypes';

export type Keyword = {
  id?: string;
  value?: string;
  category?: KeywordCategory;
};

type KeywordProps = {
  keywords: { [keywordCategory: string]: Keyword[] };
};

type KeywordListProps = {
  keywords: Keyword[];
};

type KeywordItempProps = {
  id?: string;
  value?: string;
};

export const KeywordItem: React.FC<KeywordItempProps> = ({ id, value }) => {
  if (!id || !value) {
    return null;
  }
  return <Link to={`/keywords/${id}`}>{value}</Link>;
};

export const KeywordList: React.FC<KeywordListProps> = ({ keywords }) => {
  if (!keywords) {
    return null;
  }
  const nodes = keywords.map((keyword, index) => {
    const { id, value } = keyword;
    if (!id || !value) {
      return null;
    }
    return (
      <Fragment key={v1()}>
        <KeywordItem id={id} value={value} />
        {index < keywords.length - 1 && ', '}
      </Fragment>
    );
  });

  return <Fragment>{nodes}</Fragment>;
};

export const Keyword: React.FC<KeywordProps> = ({ keywords }) => {
  const infoData = Object.keys(keywords)
    .sort()
    .map(foundCategory => ({
      title: foundCategory,
      content: <KeywordList keywords={keywords[foundCategory]} />,
    }));
  if (infoData.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <h4>Keywords</h4>
      <InfoList infoData={infoData} />
    </Fragment>
  );
};

export default Keyword;
