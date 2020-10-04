import React, { Component } from 'react';
import { describeArc } from '../../shared/methods/SharedMethods';
import './MonthArc.css';
interface IMonthArcProps {
	month: any;
	svgWidth: number;
	svgHeight: number;
	showShortHand: boolean;
	onClickedMonth(name: string): any;
}
interface IMonthArcState {}
export default class MonthArc extends Component<IMonthArcProps, IMonthArcState> {
	//Eventlisteners
	render() {
		const { month, svgHeight, svgWidth, showShortHand, onClickedMonth } = this.props;
		return (
			<g className="month-arc">
				<path
					id={`${month.name[0]}-arc`}
					d={describeArc(
						svgWidth / 2,
						svgHeight / 2,
						svgWidth / 18 + svgHeight / 18,
						month.startAngle,
						month.endAngle
					)}
					fill={month.color}
					stroke="white"
					strokeWidth="2"
					onClick={() => onClickedMonth(month.name[0])}
				/>
				<defs>
					<path
						id={`p1-${month.name}`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgWidth / 20 + svgHeight / 20,
							month.startAngle,
							month.endAngle
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${month.name}`}
						startOffset="10.5%"
						textAnchor="middle"
						className="wheel-label"
						stroke="white"
						fontSize="10px"
					>
						{showShortHand ? month.name[1] : month.name[0]}
					</textPath>
				</text>
			</g>
		);
	}
}
