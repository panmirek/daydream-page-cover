export const getUpdatedKeyItems = (list = [], currentKey, property) =>
	list.map((item) =>
		item.key === currentKey ? { ...item, ...property } : item
	);

export const getListWithoutItem = (list = [], currentKey) =>
	list.filter((item) => item.key !== currentKey);
