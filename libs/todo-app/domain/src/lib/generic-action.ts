/**
 * GenericAction
 * @description GenericAction is a generic class that can be used to create actions
 * @param ActionType - The type of action
 * @param PayloadType - The type of payload
 * @returns GenericAction
 * @example
 */
export class GenericAction<ActionType, PayloadType> {
	public type: ActionType;
	public payload?: PayloadType;
	constructor(type: ActionType, payload?: PayloadType) {
		this.type = type;
		this.payload = payload;
	}
}
