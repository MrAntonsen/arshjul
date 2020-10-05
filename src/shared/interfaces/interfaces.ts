export interface CartesianCoordinate {
	x: number;
	y: number;
}
export interface IEvent {
	eventName: string;
	month: string;
}
export interface ICategory {
	category: string;
	maxCount: number;
	events: IEvent[];
}
