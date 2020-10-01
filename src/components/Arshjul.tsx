import React, { Component } from 'react'
import createMonths from './MonthArray';
import './Arshjul.css'

interface IArshjulProps {}
interface IArshjulState {
    mainCircle: any;
    svgHeight: number;
    svgWidth: number;
    months: any[];
    showShortHand: boolean;
}
export default class Arshjul extends Component<IArshjulProps, IArshjulState> {
    constructor(props: any){
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
        }
    }
    // Helperfunctions
    setSvgContainerHeightAndWidth = () =>{
        //Setting height
        let svgContainer: any = document.getElementById('svg-container');
        let svgHeight = svgContainer.height.baseVal.value;
        let svgWidth = svgContainer.width.baseVal.value;
        // console.log(this.state.svgHeight, this.state.svgWidth, svgWidth, svgHeight);
        this.setState({ svgHeight : svgHeight, svgWidth: svgWidth}, () =>{
            this.setState({months : createMonths(this.state.svgWidth, this.state.svgHeight)});
            
        })
    }


    //----Få på kartesisk form for å sette inn i svg
    polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
    //Lager kakestykker
    describeArc = (x: number, y: number , radius: number, startAngle: number, endAngle: number) =>{

    var start = this.polarToCartesian(x, y, radius, startAngle);
    var end = this.polarToCartesian(x, y, radius, endAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
        "L", x,y,
        "L", start.x, start.y
    ].join(" ");

    return d;       
    }
    //Lifecyclemethods
    componentDidMount(){
        this.setSvgContainerHeightAndWidth();
        window.addEventListener("resize",() =>{
            this.setState({
                svgHeight: window.innerHeight, svgWidth: window.innerWidth
            })
            if(window.innerHeight < 780 || window.innerWidth < 1280){
                this.setState({
                    showShortHand: true
                })
            }else{
                this.setState({
                    showShortHand: false
                })
            }
        })
    }
    
    // Eventlisteners
    onClickedMonth = (monthName: string) =>{
        console.log(monthName);
    }
    render() {
        return (
            <div>
            <svg id="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100vw" height="100vh">
                    {this.state.months.map((month:any) =>
                        {
                            return <g key={month.name[0]} > 
                                            {/* {month.events.length > 0 && month.events.map((event: any, i: number) =>{
                                                console.log(event);
                                                   return <path 
                                                   id={`${month.name[0]}-arc-event`} 
                                                   d={this.describeArc(this.state.svgWidth/2, this.state.svgHeight/2, this.state.svgWidth/10 + this.state.svgHeight/10, month.startAngle, month.endAngle)}
                                                   fill={month.color} 
                                                   stroke="black"
                                                   strokeWidth="2"
                                                   onClick={() => this.onClickedMonth(month.name)} />
                                            })} */}
                            <path 
                            id={`${month.name[0]}-arc`} 
                            d={this.describeArc(this.state.svgWidth/2, this.state.svgHeight/2, this.state.svgWidth/12 + this.state.svgHeight/12, month.startAngle, month.endAngle)}
                            fill={month.color} 
                            stroke="black"
                            strokeWidth="2"
                            onClick={() => this.onClickedMonth(month.name)}
                            />
                            <defs>
                                <path id={`p1-${month.name}`} d={this.describeArc(this.state.svgWidth/2, this.state.svgHeight/2, this.state.svgWidth/14 + this.state.svgHeight/14, month.startAngle, month.endAngle)} fill="#ddd" stroke="#ddd"></path>
                            </defs>
                            <text>
                                <textPath xlinkHref={`#p1-${month.name}`} startOffset="10.5%"
                                 textAnchor="middle" className="wheel-label"
                                 stroke="white">{this.state.showShortHand ? month.name[1] : month.name[0]}</textPath>
                            </text>
                            </g>
                        }
                    )}
                    <circle id="center-circle" fill="white" stroke="black"
                     cy={this.state.svgHeight/2} cx={this.state.svgWidth/2} 
                     strokeWidth="3" r={this.state.svgWidth/48 + this.state.svgHeight/48}
                     />
            </svg>           
        </div>)
        
    }
}
