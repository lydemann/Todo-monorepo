export class ImmutableCollectionHelper {
	public static removeItem(array, index: number): any[] {
		return array.filter((item, idx) => idx !== index);
	}

	public static updateObjectInArray(array, index: number, item: any): any[] {
		return array.reduce(
			(acc, elm, i) => (i === index ? [...acc, { ...item }] : [...acc, elm]),
			[],
		);
	}
}
