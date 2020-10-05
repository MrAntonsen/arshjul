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
		const { svgHeight, svgWidth, eventsLength, category } = this.props;
		let koeff = this.props.order - 1;
		return (
			<g>
				<circle
					fill="white"
					stroke="steelblue"
					cy={svgHeight / 2}
					cx={svgWidth / 2}
					strokeWidth="1"
					r={svgHeight / 8 + svgWidth / 8 + (eventsLength - 30) * koeff * eventsLength}
				/>
				<defs>
					<path
						id={`p1-${category.category}-1`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgHeight / 8 + svgWidth / 8 + (eventsLength - 30) * koeff * eventsLength,
							110,
							20
						)}
					></path>
					{console.log(eventsLength)}
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${category.category}-1`}
						startOffset="10.5%"
						textAnchor="middle"
						className="wheel-label"
						stroke="black"
						fontSize="10px"
					>
						{category.category}
					</textPath>
				</text>
				<defs>
					<path
						id={`p1-${category.category}-2`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgHeight / 8 + svgWidth / 8 + (eventsLength - 30) * koeff * eventsLength,
							200,
							110
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${category.category}-2`}
						startOffset="10.5%"
						textAnchor="middle"
						className="wheel-label"
						stroke="black"
						fontSize="10px"
					>
						{category.category}
					</textPath>
				</text>
				<defs>
					{console.log(svgHeight / 8 + svgWidth / 8 + (eventsLength - 30) * koeff * eventsLength)}
					<path
						id={`p1-${category.category}-3`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgHeight / 8 + svgWidth / 8 + (eventsLength - 30) * koeff * eventsLength,
							290,
							200
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${category.category}-3`}
						startOffset="10.5%"
						textAnchor="middle"
						className="wheel-label"
						stroke="black"
						fontSize="10px"
					>
						{category.category}
					</textPath>
				</text>
				<defs>
					<path
						id={`p1-${category.category}-4`}
						d={describeArc(
							svgWidth / 2,
							svgHeight / 2,
							svgHeight / 8 + svgWidth / 8 + (eventsLength - 30) * koeff * eventsLength,
							380,
							290
						)}
					></path>
				</defs>
				<text>
					<textPath
						xlinkHref={`#p1-${category.category}-4`}
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
