import idx from 'idx';
import { UIModel } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { CommentType } from '../../types/CommentTypes';
import { getXrefsForSection } from '../../utils/XrefUtils';
import EntrySection from '../../types/EntrySection';

const convertExternalLinks = (data: UniProtkbAPIModel) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  const { comments, databaseCrossReferences, genes, organism } = data;

  if (comments) {
    convertedData.commentsData.set(
      CommentType.WEB_RESOURCE,
      comments.filter(
        comment => comment.commentType === CommentType.WEB_RESOURCE
      )
    );
  }
  if (databaseCrossReferences) {
    const commonName = idx(organism, o => o.commonName);
    convertedData.xrefData = getXrefsForSection(
      databaseCrossReferences,
      EntrySection.ExternalLinks,
      genes,
      commonName
    );
  }

  return convertedData;
};
export default convertExternalLinks;
