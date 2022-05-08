import { Guid } from '@todo/shared/util';

export class TodoItem {
	public id: string;
	public title: string;
	public description: string;
	public dueDate?: string;
	public completed?: boolean;
	constructor(title: string, description: string, dueDate?: string) {
		this.id = Guid.newGuid();
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
	}
}
