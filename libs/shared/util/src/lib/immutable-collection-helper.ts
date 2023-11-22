/* eslint-disable @typescript-eslint/no-explicit-any */
export class ImmutableCollectionHelper {
	public static removeItem(array, index: number): any[] {
		return array.filter((_item, idx) => idx !== index);
	}

	public static updateObjectInArray(array, index: number, item: any): any[] {
		return array.reduce(
			(acc, elm, i: number) =>
				i === index ? [...acc, { ...item }] : [...acc, elm],
			[],
		);
	}
}
