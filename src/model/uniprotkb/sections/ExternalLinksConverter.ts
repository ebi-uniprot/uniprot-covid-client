import { convertSection, UIModel } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { getXrefsForSection } from '../../utils/XrefUtils';
import UniProtKBEntryConfig from '../../../view/uniprotkb/UniProtEntryConfig';
import EntrySection from '../../types/EntrySection';
import { flattenArrays } from '../../../utils/utils';
import { CommentType } from '../../types/CommentTypes';

const convertExternalLinks = (data: UniProtkbAPIModel) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  const { comments, databaseCrossReferences } = data;

  if (comments) {
    convertedData.commentsData.set(
      CommentType.WEBRESOURCE,
      comments.filter(
        comment => comment.commentType === CommentType.WEBRESOURCE
      )
    );
  }

  if (databaseCrossReferences) {
    convertedData.xrefData = flattenArrays(
      UniProtKBEntryConfig.filter(
        ({ name }) => name !== EntrySection.ExternalLinks
      ).map(({ name }) => getXrefsForSection(databaseCrossReferences, name))
    );
  }
  return convertedData;
};
export default convertExternalLinks;
