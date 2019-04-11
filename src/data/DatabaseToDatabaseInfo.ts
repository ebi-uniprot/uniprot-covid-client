import Database from './Database';

type AttributesItem = {
  name: string;
  xmlTag: string;
  uriLink?: string;
};

type DatabaseInfo = {
  name: string;
  displayName?: string;
  category: string;
  uriLink: string;
  attributes?: AttributesItem[];
};

type DatabaseToDatabaseInfo = { [key in Database]: DatabaseInfo };

export default DatabaseToDatabaseInfo;
