import Comment from '../../types/Comment';
import EntrySection from '../../types/EntrySection';
import { APIModel, convertSection } from '../SectionConverter';

const commentsCategories = [Comment.SUBUNIT];

export const convertInteraction = (data: APIModel) => {
  return convertSection(
    data,
    commentsCategories,
    undefined,
    undefined,
    EntrySection.Interaction
  );
};

export default convertInteraction;
