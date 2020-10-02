import React, { Component } from 'react';
import { describeArc } from '../../shared/methods/SharedMethods';
interface ITabProps {
	month: any;
	svgWidth: number;
	svgHeight: number;
	event: any;
	order: number;
}
interface ITabsState {}
export default class Tabs extends Component<ITabProps, ITabsState> {
	constructor(props: any) {
		super(props);
		this.state = {
			number: 0
		};
	}
	//---------------Helper-Methods--------------------//
	decideColor = (decider: string): string => {
		if (decider === 'fill') {
			return this.props.order % 2 === 0 ? '#577399' : '#495867';
		} else if (decider === 'stroke') {
			return this.props.order % 2 === 0 ? 'white' : 'black';
		}
		return '';
	};
	decidePosition = () => {};
	render() {
		let { month, svgHeight, svgWidth, event, order } = this.props;
		console.log(order, event.title);
		return (
			<g style={{ zIndex: 10 - order }}>
				<path
					id={`${month.name[0]}-arc-event`}
					d={describeArc(
						svgWidth / 2,
						svgHeight / 2,
						svgWidth / 10 + svgHeight / 10,
						month.startAngle,
						month.endAngle
					)}
					fill={this.decideColor('fill')}
					stroke={this.decideColor('stroke')}
					strokeWidth="2"
					// style={{ zIndex: 10 - order }}
					// onClick={() => this.onClickedMonth(month.name)}
				/>
				<defs>
					<path
						id={`p1-${month.name[0]}-${order}`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgWidth / 10.5 + svgHeight / 10.5,
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
						stroke="white"
					>
						{event.title}
					</textPath>
				</text>
			</g>
		);
	}
}
