import uniqid from 'uniqid';

export const extendArrayWithKeys = (objArray) =>
	objArray.map((obj) => ({ ...obj, key: uniqid() }));

export const reorderArrayElementByKey = (array, key, vector = 1) => {
	const newArr = [...array];
	const index = newArr.findIndex((element) => element.key === key);
	const copy = newArr[index];

	newArr[index] = newArr[index + vector];
	newArr[index + vector] = copy;
	return newArr;
};
