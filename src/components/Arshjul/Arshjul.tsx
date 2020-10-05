import React, { Component } from 'react';
import createMonths from './MonthArray';
import './Arshjul.css';
import Tabs from '../Tabs/Tabs';
import MonthArc from '../MonthArc/MonthArc';
import CategoryCircle from '../CategoryCircle/CategoryCircle';
import { months } from 'moment';
import { ICategory, IEvent } from '../../shared/interfaces/interfaces';
import { highestOccurance } from '../../shared/methods/SharedMethods';

interface IArshjulProps {}
interface IArshjulState {
	mainCircle: any;
	svgHeight: number;
	svgWidth: number;
	months: any[];
	showShortHand: boolean;
	Categories: ICategory[];
	totRadius: number;
}
export default class Arshjul extends Component<IArshjulProps, IArshjulState> {
	constructor(props: any) {
		super(props);
		this.state = {
			mainCircle: {
				y: 0,
				x: 0,
				radius: 200,
				color: 'white',
				strokeWidth: 3
			},
			svgHeight: 0,
			svgWidth: 0,
			months: [],
			showShortHand: true,
			Categories: [
				{ category: 'Møte', maxCount: 0, events: [] },
				{ category: 'Salg', maxCount: 0, events: [] },
				{ category: 'Fridag', maxCount: 0, events: [] },
				{ category: 'Sosialt', maxCount: 0, events: [] },
				{ category: 'Annet', maxCount: 0, events: [] }
			],
			totRadius: 0
		};
	}
	// Helperfunctions
	setSvgContainerHeightAndWidth = () => {
		//Setting height
		let svgContainer: any = document.getElementById('svg-container');
		let svgHeight = svgContainer.height.baseVal.value;
		let svgWidth = svgContainer.width.baseVal.value;
		let totRadius = 0;
		for (let i = 0; i < this.state.Categories.length; i++) {
			totRadius += svgWidth / 15.5 + svgHeight / 15.5 + this.state.Categories[i].maxCount * 30;
		}

		totRadius = totRadius - svgWidth / 18 + svgHeight / 18;
		console.log(totRadius);
		// console.log(this.state.svgHeight, this.state.svgWidth, svgWidth, svgHeight);
		this.setState({ svgHeight: svgHeight, svgWidth: svgWidth, totRadius: totRadius }, () => {
			this.setState({ months: createMonths(this.state.svgWidth, this.state.svgHeight) }, () => {
				this.decideCategories();
				let catArr = this.state.Categories.sort((a, b) => {
					return a.maxCount > b.maxCount ? -1 : b.maxCount > a.maxCount ? 1 : 0;
				});
			});
		});
	};
	decideCategories = () => {
		let { months } = this.state;
		let finalInfo: ICategory[] = this.state.Categories;
		console.log(finalInfo);
		months.forEach((month) => {
			month.events.forEach((happening: any) => {
				finalInfo.forEach((category, i) => {
					if (happening.Category === category.category) {
						let tempEvent: IEvent = { eventName: happening.title, month: month.name[0] };
						category.events.push(tempEvent);
					}
				});
				// console.log(finalInfo);
				finalInfo.forEach((category) => {
					let highest = highestOccurance(category.events);
					category.maxCount = highest;
				});
			});
		});
	};

	//Lifecyclemethods
	componentDidMount() {
		this.setSvgContainerHeightAndWidth();
		window.addEventListener('resize', () => {
			this.setState({
				svgHeight: window.innerHeight,
				svgWidth: window.innerWidth
			});
			if (window.innerHeight < 780 || window.innerWidth < 1280) {
				this.setState({
					showShortHand: true
				});
			} else {
				this.setState({
					showShortHand: false
				});
			}
		});
	}

	// Eventlisteners
	onClickedMonth = (monthName: string) => {
		console.log(monthName);
	};
	render() {
		const { months, svgHeight, svgWidth, showShortHand, Categories, totRadius } = this.state;
		// svgWidth / 18 + svgHeight / 18 + (svgWidth / 15.5 + svgHeight / 15.5 + this.state.Categories.length * 30);

		return (
			<div>
				<svg id="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100vw" height="100vh">
					{Categories.map((category, i) => {
						if (
							totRadius > 0 &&
							svgHeight > 0 &&
							svgWidth > 0 &&
							totRadius > 0 &&
							Categories[1].events.length > 0
						) {
							return (
								<g key={`${i}`}>
									<CategoryCircle
										category={category}
										svgHeight={svgHeight}
										svgWidth={svgWidth}
										totRadius={totRadius / 2}
										order={i}
										eventsLength={category.maxCount}
									/>
									{category.events.length > 0 &&
										category.events.map((categoryEvent, y) => {
											return (
												<Tabs
													months={months}
													category={category}
													svgHeight={svgHeight}
													svgWidth={svgWidth}
													event={categoryEvent}
													key={y}
													eventsLength={category.maxCount}
													eventOrder={y}
													totRadius={totRadius}
													catOrder={i}
												/>
											);
										})}
								</g>
							);
						}
					})}
					{months.map((month: any) => {
						return (
							<g key={month.name[0]}>
								<MonthArc
									month={month}
									svgHeight={svgHeight}
									svgWidth={svgWidth}
									showShortHand={showShortHand}
									onClickedMonth={this.onClickedMonth}
								/>
							</g>
						);
					})}
					<circle
						id="center-circle"
						fill="white"
						stroke="black"
						cy={svgHeight / 2}
						cx={svgWidth / 2}
						strokeWidth="3"
						r={svgWidth / 48 + svgHeight / 48}
					/>
				</svg>
			</div>
		);
	}
}
