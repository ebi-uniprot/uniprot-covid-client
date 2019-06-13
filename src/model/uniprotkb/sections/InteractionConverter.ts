import { FreeTextData } from '../../../view/uniprotkb/components/FreeTextView';
import Comment from '../../types/Comment';
import EntrySection from '../../types/EntrySection';
import { getXrefsForSection, Xref, XrefUIModel } from '../../utils/XrefUtils';

type InteractionAPIModel = {
  primaryAccession: string;
  comments?: FreeTextData;
  databaseCrossReferences?: Xref[];
};

export type InteractionUIModel = {
  commentsData: Map<Comment, FreeTextData>;
  xrefData: XrefUIModel[];
};

const interactionComments = [Comment.SUBUNIT];

export const convertInteraction = (data: InteractionAPIModel) => {
  const interactionData: InteractionUIModel = {
    commentsData: new Map(),
    xrefData: [],
  };
  const { comments, databaseCrossReferences } = data;
  if (comments) {
    interactionComments.forEach(commentType => {
      interactionData.commentsData.set(
        commentType,
        comments.filter(comment => comment.commentType === commentType)
      );
    });
  }
  if (databaseCrossReferences) {
    interactionData.xrefData = getXrefsForSection(
      databaseCrossReferences,
      EntrySection.Interaction
    );
  }
  return interactionData;
};
