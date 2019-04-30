import React, { Fragment } from 'react';
import { v1 } from 'uuid';
import { InfoList } from 'franklin-sites';
import { Link } from 'react-router-dom';
import EntrySectionType from './types/EntrySection';
import {
  entrySectionToKeywordCategories,
  KeywordCategory,
} from './types/keywordTypes';

type Keyword = {
  id?: string;
  value?: string;
  category?: KeywordCategory;
};

type Data = {
  keywords?: Keyword[];
};

type KeywordProps = {
  section: EntrySectionType;
  data: Data;
};

type KeywordListProps = {
  keywords?: Keyword[];
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

export const Keyword: React.FC<KeywordProps> = ({ data, section }) => {
  const { keywords } = data;
  const keywordCategories = entrySectionToKeywordCategories.get(section);
  if (!keywords || !keywordCategories) {
    return null;
  }
  const foundCategoryToKeywords: { [keywordCategory: string]: Keyword[] } = {};
  for (const keyword of keywords) {
    const { category, value, id } = keyword;
    if (!category || !value || !id || !keywordCategories.includes(category)) {
      continue;
    }
    if (category in foundCategoryToKeywords) {
      foundCategoryToKeywords[category].push(keyword);
    } else {
      foundCategoryToKeywords[category] = [keyword];
    }
  }
  const infoData = Object.keys(foundCategoryToKeywords)
    .sort()
    .map(foundCategory => ({
      title: foundCategory,
      content: (
        <KeywordList keywords={foundCategoryToKeywords[foundCategory]} />
      ),
    }));
  const node = infoData.length && (
    <Fragment>
      <h4>Keywords</h4>
      <InfoList infoData={infoData} />
    </Fragment>
  );
  return <Fragment>{node}</Fragment>;
};

export default Keyword;
