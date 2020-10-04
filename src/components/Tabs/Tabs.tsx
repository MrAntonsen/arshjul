import React, { Component } from 'react';
import { describeArc } from '../../shared/methods/SharedMethods';
import './Tabs.css';
interface ITabProps {
	month: any;
	svgWidth: number;
	svgHeight: number;
	event: any;
	eventsLength: number;
	order: number;
}
interface ITabsState {
	color: string;
}
export default class Tabs extends Component<ITabProps, ITabsState> {
	constructor(props: any) {
		super(props);
		this.state = {
			color: 'white'
		};
	}
	componentDidMount() {
		let color = this.getRandomColor();
		this.setState({ color });
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
			// return this.props.month.color === '#577399' ? this.props.order % 2 === 0 ? '#577399' : '#495867' :
			// this.props.month.color === '#495867' ? this.props.order % 2 === 0 ? '#495867' : '#577399' : '#495867';
		}
		//  else if (decider === 'stroke') {
		// 	return this.props.month.color === '#f1faee' ? this.props.order % 2 === 0 ? '#f1faee' : '#a8dadc' :
		// 	this.props.month.color === '#a8dadc' ? this.props.order % 2 === 0 ? '#a8dadc' : '#f1faee' : '#a8dadc';
		// }
		return '';
	};
	decidePosition = () => {};
	render() {
		let { month, svgHeight, svgWidth, event, order, eventsLength } = this.props;
		let koeff = order + 1;
		// console.log(svgWidth / 15.5 + svgHeight / 15.5 + (eventsLength - koeff) * 30);
		return (
			<g className="event-arc">
				<path
					id={`${month.name[0]}-arc-event`}
					d={describeArc(
						svgWidth / 2,
						svgHeight / 2,
						svgWidth / 15.5 + svgHeight / 15.5 + (eventsLength - koeff) * 30,
						month.startAngle,
						month.endAngle
					)}
					fill={this.state.color}
					stroke="#f1faee"
					strokeWidth="3"
					// style={{ zIndex: 10 - order }}
					// onClick={() => this.onClickedMonth(month.name)}
				/>
				<defs>
					<path
						id={`p1-${month.name[0]}-${order}`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgWidth / 16 + svgHeight / 16 + (eventsLength - koeff) * 30,
							month.startAngle,
							month.endAngle
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${month.name[0]}-${order}`}
						startOffset="10%"
						textAnchor="middle"
						className="wheel-label"
						stroke="black"
						fontSize="12px"
					>
						{event.title.length > 8 ? `${event.title.slice(0, 8)}...` : event.title}
					</textPath>
				</text>
			</g>
		);
	}
}
