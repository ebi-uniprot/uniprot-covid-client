import { v1 as uuidv1 } from 'uuid';

export default function appendUniqueValue(data) {
  return data.map((item) => {
    const newItem = { ...item, value: uuidv1() };
    const { items } = item;
    if (items) {
      newItem.items = appendUniqueValue(items);
    }
    return newItem;
  });
}
