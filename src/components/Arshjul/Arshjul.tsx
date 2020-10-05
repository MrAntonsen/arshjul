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
				{  category: 'Møte', maxCount: 0, events: [] },
				{  category: 'Salg', maxCount: 0, events: [] },
				{  category: 'Fridag', maxCount: 0, events: [] },
				{  category: 'Sosialt', maxCount: 0, events: [] },
				{  category: 'Annet', maxCount: 0, events: [] }
			],
		};
	}
	// Helperfunctions
	setSvgContainerHeightAndWidth = () => {
		//Setting height
		let svgContainer: any = document.getElementById('svg-container');
		let svgHeight = svgContainer.height.baseVal.value;
		let svgWidth = svgContainer.width.baseVal.value;
		// console.log(this.state.svgHeight, this.state.svgWidth, svgWidth, svgHeight);
		this.setState({ svgHeight: svgHeight, svgWidth: svgWidth }, () => {
			this.setState({ months: createMonths(this.state.svgWidth, this.state.svgHeight) }, () => {
				this.decideCategories();
			});
		});
	};
	decideCategories = () => {
		let { Categories, months } = this.state;
		// Categories= {
		// 	category: "Salg",
		// 	count: 2,
		// 	events: [
		// 		{
		// 			eventName: "Lansering",
		// 			month: "Januar"
		// 		}, {
		// 			eventName: "Lansering 2",
		// 			month: "October"
		// 		}
		// 	]
		// }
		let maxLengthArray: any[] = [];
		// let categoriesLength ;
		let finalInfo: ICategory[] = this.state.Categories;
		console.log(finalInfo)
		months.forEach((month) =>{
			month.events.forEach((happening :any) =>{
				finalInfo.forEach((category, i) =>{
					if(happening.Category === category.category){
						let tempEvent: IEvent= { eventName: happening.title, month: month.name[0]}
						category.events.push(tempEvent);
					}
				})
				// console.log(finalInfo);
				finalInfo.forEach((category) =>{
					let highest = highestOccurance(category.events);
					category.maxCount = highest;
				})
			})
		})
		// this.state.months.forEach((month, i) => {
		// 	let categoriesLength: ICategory[] = [
		// 		{ count: 0, events: [] },
		// 		{ count: 0, events: [] },
		// 		{ count: 0, events: [] },
		// 		{ count: 0, events: [] },
		// 		{ count: 0, events: [] }
		// 	];
		// 	Categories.forEach((loopcategory, y) => {
		// 		month.events.forEach((monthEvent: any) => {
		// 			// finalInfo[y].events.push({ event: monthEvent, month: month.name[0] });
		// 			// console.log(monthEvent.Category, loopcategory.title);

					// if (monthEvent.Category !== loopcategory.title) {
					// 	categoriesLength[y].count++;
					// }
		// 			console.log(Categories[y].title, ' = ', loopcategory.title);
		// 			if (Categories[y].title === loopcategory.title) {
		// 				categoriesLength[y].events.push({ event: monthEvent, month: month.name[0] });
		// 			}
		// 		});
		// 		if (categoriesLength[y].count > finalInfo[y].count) {
		// 			finalInfo[y] = categoriesLength[y];
		// 		}
		// 		// if (monthEvent) {
		// 		// 	// hvis kategori pushe hær
		// 		// }
		// 	});
		// });
		// Categories.forEach((length, i) => {
		// 	maxLengthArray.push({ Category: Categories[i].title, info: finalInfo[i] });
		// });
		// maxLengthArray.sort((a, b) => {
		// 	return a.info.count > b.info.count ? 1 : b.info.count > a.info.count ? -1 : 0;
		// });
		// this.setState({
		// 	Categories: maxLengthArray
		// });
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
		const { months, svgHeight, svgWidth, showShortHand, Categories } = this.state;
		let totRadius = 0 ;
			// svgWidth / 18 + svgHeight / 18 + (svgWidth / 15.5 + svgHeight / 15.5 + this.state.Categories.length * 30);

		let tabsLength = 0;
		for (let i = 0; i < this.state.Categories.length; i++) {
			totRadius += svgWidth / 15.5 + svgHeight / 15.5 + this.state.Categories[i].maxCount  * 30;
			console.log(tabsLength);
		}
		console.log(tabsLength);
		// totRadius += tabsLength;
		console.log(totRadius);

		return (
			<div>
				<svg id="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100vw" height="100vh">
					{/* {!isNaN(totRadius) && (
						
						// <circle
						// 	id="center-circle"
						// 	fill="red"
						// 	stroke="blue"
						// 	cy={svgHeight / 2}
						// 	cx={svgWidth / 2}
						// 	strokeWidth="3"
						// 	r={borgeEEtGeni * 0.5}
						// />
					)} */}
					{
						Categories.map((category, i) =>{
							
							return (<g key={category.category}>
									<CategoryCircle category={category} 
										svgHeight={svgHeight}
										svgWidth={svgWidth}
										totRadius={totRadius}
										order={i}
										eventsLength={category.maxCount}
										/>
							</g>)
						})
					}
					{months.map((month: any) => {
						return (
							<g key={month.name[0]}>
								{month.events.length > 0 &&
									!isNaN(totRadius) &&
									month.events.map((event: any, i: number) => {
										return (
											<g key={i}>
												{/* <CategoryCircle
													svgHeight={svgHeight}
													svgWidth={svgWidth}
													totRadius={totRadius}
													eventsLength={month.events.length}
													order={i}
												/> */}
												<Tabs
													month={month}
													svgHeight={svgHeight}
													svgWidth={svgWidth}
													event={event}
													key={i}
													eventsLength={month.events.length}
													order={i}
												/>
											</g>
										);
									})}
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
