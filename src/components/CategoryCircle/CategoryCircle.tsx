import React, { Component } from 'react';
import { ICategory } from '../../shared/interfaces/interfaces';
import { describeArc } from '../../shared/methods/SharedMethods';
interface ICategoryCircleProps {
	svgHeight: number;
	svgWidth: number;
	totRadius: number;
	eventsLength: number;
	order: number;
	category: ICategory;
}
interface ICategoryCircleState {}
export default class CategoryCircle extends Component<ICategoryCircleProps, ICategoryCircleState> {
	render() {
		const { svgHeight, svgWidth, totRadius, eventsLength, category } = this.props;
		let koeff = this.props.order;
		return (
			<g>
				<circle
					fill="steelblue"
					stroke="gold"
					cy={svgHeight / 2}
					cx={svgWidth / 2}
					strokeWidth="3"
					r={totRadius + (eventsLength - koeff) * 30}
				/>
								<defs>
					<path
						id={`p1-${category.category}`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							totRadius + (eventsLength - koeff) * 30,
							0,
							90
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${category.category}`}
						startOffset="10.5%"
						textAnchor="middle"
						className="wheel-label"
						stroke="black"
						fontSize="10px"
					>
						{category.category}
					</textPath>
				</text>
			</g>
		);
	}
}
