export default function appendUniqueId(data, prefix = 'id') {
  return data.map((item, index) => {
    const id = `${prefix}_${index}`;
    const newItem = {
      ...item,
      id,
    };
    const { items } = item;
    if (items) {
      newItem.items = appendUniqueId(items, `${id}_`);
    }
    return newItem;
  });
}
