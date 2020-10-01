import React, { Component } from 'react';
import { describeArc } from '../../shared/methods/SharedMethods';
interface ITabProps {
	month: any;
	svgWidth: number;
	svgHeight: number;
	event: any;
}
interface ITabsState {}
export default class Tabs extends Component<ITabProps, ITabsState> {
	render() {
		let { month, svgHeight, svgWidth, event } = this.props;
		return (
			<g>
				<path
					id={`${month.name[0]}-arc-event`}
					d={describeArc(
						svgWidth / 2,
						svgHeight / 2,
						svgWidth / 10 + svgHeight / 10,
						month.startAngle,
						month.endAngle
					)}
					fill={month.color}
					stroke="black"
					strokeWidth="2"
					// onClick={() => this.onClickedMonth(month.name)}
				/>
				<defs>
					<path
						id={`p1-${month.name[0]}`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgWidth / 14 + svgHeight / 14,
							month.startAngle,
							month.endAngle
						)}
						fill="#ddd"
						stroke="#ddd"
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${month.name[0]}`}
						startOffset="15%"
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
