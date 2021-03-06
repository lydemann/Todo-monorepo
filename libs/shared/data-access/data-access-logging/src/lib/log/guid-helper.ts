export const createGuid = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		// tslint:disable-next-line:one-variable-per-declaration
		const r = Math.random() * 16,
			// tslint:disable-next-line: no-bitwise
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};
