import { v1 as uuidv1 } from 'uuid';

function getUniqueIdFromItemProperties(item) {
  let uid = '';
  if (item.term) {
    uid += `-${item.term}`;
  }
  if (item.label) {
    uid += `-${item.label}`;
  }
  if (item.valuePrefix) {
    uid += `-${item.valuePrefix}`;
  }
  if (item.itemType) {
    uid += `-${item.itemType}`;
  }
  return uid;
}

export default function appendUniqueValue(data, idFromItemProperties = true) {
  const idGenerator = idFromItemProperties ? getUniqueIdFromItemProperties : uuidv1;
  return data.map((item) => {
    const newItem = {
      ...item,
      value: getUniqueIdFromItemProperties(item),
    };
    const { items } = item;
    if (items) {
      newItem.items = appendUniqueValue(items, idGenerator);
    }
    return newItem;
  });
}
