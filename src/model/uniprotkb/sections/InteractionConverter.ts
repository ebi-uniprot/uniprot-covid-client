import Comment from '../../types/Comment';
import EntrySection from '../../types/EntrySection';
import { APIModel, convertSection } from '../SectionConverter';

const interactionComments = [Comment.SUBUNIT];

export const convertInteraction = (data: APIModel) => {
  return convertSection(
    data,
    interactionComments,
    undefined,
    undefined,
    EntrySection.Interaction
  );
};
