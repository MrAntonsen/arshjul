import React, { Component } from 'react';
import createMonths from './MonthArray';
import './Arshjul.css';
import Tabs from '../Tabs/Tabs';
import MonthArc from '../MonthArc/MonthArc';
interface IArshjulProps {}
interface IArshjulState {
	mainCircle: any;
	svgHeight: number;
	svgWidth: number;
	months: any[];
	showShortHand: boolean;
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
			showShortHand: false
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
			this.setState({ months: createMonths(this.state.svgWidth, this.state.svgHeight) });
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
		const { months, svgHeight, svgWidth, showShortHand } = this.state;
		return (
			<div>
				<svg id="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100vw" height="100vh">
					{months.map((month: any) => {
						return (
							<g key={month.name[0]}>
								{/* <MonthArc
									month={month}
									svgHeight={svgHeight}
									svgWidth={svgWidth}
									showShortHand={showShortHand}
									onClickedMonth={this.onClickedMonth}
								/> */}
								{month.events.length > 0 &&
									month.events.map((event: any, i: number) => {
										return (
											<Tabs
												month={month}
												svgHeight={svgHeight}
												svgWidth={svgWidth}
												event={event}
												key={i}
											/>
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
						cy={this.state.svgHeight / 2}
						cx={this.state.svgWidth / 2}
						strokeWidth="3"
						r={this.state.svgWidth / 48 + this.state.svgHeight / 48}
					/>
				</svg>
			</div>
		);
	}
}
