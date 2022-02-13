import uniqid from 'uniqid';

export const extendArrayWithKeys = (objArray, props) =>
	objArray.map((obj) => ({ ...obj, ...props, key: uniqid() }));

export const reorderArrayElementByKey = (array, key, vector = 1) => {
	const newArr = [...array];
	const index = newArr.findIndex((element) => element.key === key);
	const copy = newArr[index];

	newArr[index] = newArr[index + vector];
	newArr[index + vector] = copy;
	return newArr;
};

export const getUpdatedKeyItems = (list = [], currentKey, property) =>
	list.map((item) =>
		item.key === currentKey ? { ...item, ...property } : item
	);

export const getListWithoutItem = (list = [], currentKey) =>
	list.filter((item) => item.key !== currentKey);

export const undefinedValuesToString = (obj) =>
	Object.fromEntries(
		Object.entries(obj).map(([key, val]) => [key, val || ''])
	);
