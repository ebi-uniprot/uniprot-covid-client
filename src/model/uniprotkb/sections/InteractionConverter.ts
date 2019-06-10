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
  commentsData: FreeTextData;
  xrefData: XrefUIModel[];
};

export const convertInteraction = (data: InteractionAPIModel) => {
  const interactionData: InteractionUIModel = {
    commentsData: [],
    xrefData: [],
  };
  if (data.comments) {
    interactionData.commentsData = data.comments.filter(
      comment => comment.commentType === Comment.SUBUNIT
    );
  }
  if (data.databaseCrossReferences) {
    const xrefs = getXrefsForSection(
      data.databaseCrossReferences,
      EntrySection.Interaction
    );
    if (xrefs && typeof xrefs !== 'undefined') {
      interactionData.xrefData = xrefs;
    }
  }
  return interactionData;
};
