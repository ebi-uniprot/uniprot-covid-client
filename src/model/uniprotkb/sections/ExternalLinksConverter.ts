import { UIModel } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { CommentType } from '../../types/CommentTypes';

const convertExternalLinks = (data: UniProtkbAPIModel) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  const { comments } = data;

  if (comments) {
    convertedData.commentsData.set(
      CommentType.WEB_RESOURCE,
      comments.filter(
        comment => comment.commentType === CommentType.WEB_RESOURCE
      )
    );
  }

  return convertedData;
};
export default convertExternalLinks;
