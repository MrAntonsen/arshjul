import React, { Component } from 'react';

interface ICategoryCircleProps {
	svgHeight: number;
	svgWidth: number;
	totRadius: number;
	eventsLength: number;
	order: number;
}
interface ICategoryCircleState {}
export default class CategoryCircle extends Component<ICategoryCircleProps, ICategoryCircleState> {
	render() {
		const { svgHeight, svgWidth, totRadius, eventsLength } = this.props;
		let koeff = this.props.order;
		return (
			<g>
				<circle
					id="center-circle"
					fill="red"
					stroke="blue"
					cy={svgHeight / 2}
					cx={svgWidth / 2}
					strokeWidth="3"
					r={svgWidth / 15.5 + svgHeight / 15.5 + (eventsLength - koeff) * 30}
				/>
			</g>
		);
	}
}
