/* eslint-disable no-bitwise */
// Class for creating Guids: https://github.com/Steve-Fenton/TypeScriptUtilities/blob/master/Guid

export class Guid {
	public static newGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			// eslint-disable-next-line one-var
			const r = Math.random() * 16,
				v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
}
