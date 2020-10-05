import React, { Component } from 'react';
import { ICategory } from '../../shared/interfaces/interfaces';
import { describeArc } from '../../shared/methods/SharedMethods';
import './Tabs.css';
interface ITabProps {
	months: any;
	svgWidth: number;
	svgHeight: number;
	event: any;
	eventsLength: number;
	eventOrder: number;
	catOrder: number;
	category: ICategory;
	totRadius: number;
}
interface ITabsState {
	color: string;
	month: string;
	startAngle: number;
	endAngle: number;
}
export default class Tabs extends Component<ITabProps, ITabsState> {
	constructor(props: any) {
		super(props);
		this.state = {
			color: 'black',
			month: '',
			startAngle: 0,
			endAngle: 0
		};
	}
	componentDidMount() {
		let color = this.getRandomColor();
		let month = this.props.event.month;
		// let startAngle = this.months.
		if (month) {
			let mnd = this.props.months.find((mnth: any) => mnth.name[0] === month);
			let startAngle = mnd.startAngle;
			let endAngle = mnd.endAngle;
			// console.log(startAngle, endAngle);
			if (mnd) {
				this.setState({ color: color }, () => {
					this.setState(
						{
							month: this.props.event.month
						},
						() => {
							this.setState(
								{
									startAngle: startAngle,
									endAngle: endAngle
								},
								() => {
									// console.log(this.state);
								}
							);
						}
					);
				});
			}
			console.log(mnd);
		}
	}
	//---------------Helper-Methods--------------------//
	getRandomColor(): string {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	decideColor = (decider: string): string => {
		if (decider === 'fill') {
			return this.getRandomColor();
		}
		return '';
	};
	decidePosition = () => {};
	render() {
		const { svgHeight, svgWidth, event, eventOrder, eventsLength, category, catOrder } = this.props;
		const { startAngle, endAngle } = this.state;

		// console.log(svgWidth / 15.5 + svgHeight / 15.5 + (eventsLength - koeff) * 30);

		// svgWidth / 7 + svgHeight / 7 + (eventsLength - catOrder * 30 - 5);
		// console.log(eventsLength, catOrder, event.eventName, eventOrder);
		return (
			<g className="event-arc">
				<path
					id={`${event.eventName}-arc-event`}
					d={describeArc(
						svgWidth / 2,
						svgHeight / 2,
						svgWidth / 6.5 + svgHeight / 6.5 + (eventsLength - catOrder * 55),
						startAngle,
						endAngle
					)}
					fill={this.state.color}
					stroke="#f1faee"
					strokeWidth="3"
				/>
				<defs>
					{/* {console.log(category.maxCount)} */}
					<path
						id={`p2-${category.category}-${eventOrder}`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgWidth / 7 + svgHeight / 7 + (eventsLength - catOrder * 55),
							startAngle,
							endAngle
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p2-${category.category}-${eventOrder}`}
						startOffset="10%"
						textAnchor="middle"
						className="wheel-label"
						stroke="black"
						fontSize="12px"
					>
						{event.eventName.length > 8 ? `${event.eventName.slice(0, 8)}...` : event.eventName}
					</textPath>
				</text>
			</g>
		);
	}
}
