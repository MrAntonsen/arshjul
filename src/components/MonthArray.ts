const colorOdd = "#577399";
const colorEven = "#495867"
const monthRadius = 400;

function createMonths(svgWidth : number, svgHeight: number){
 return [
        {
            name: ['January', 'Jan'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 90,
            endAngle: 60,
            radius: monthRadius,
            color: colorOdd,
            events: []
        },
        {
            name: ['February', 'Feb'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 60,
            endAngle: 30,
            radius: monthRadius,
            color: colorEven,
            events: []
        },
        {
            name: ['March', 'Mar'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 30,
            endAngle: 0,
            radius: monthRadius, 
            color: colorOdd,
            events: []
        },
        {
            name: ['April', 'Apr'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 360,	
            endAngle: 330,
            radius: monthRadius,
            color: colorEven,
            events: []
        },
        {
            name: ['May', 'May'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 330,	
            endAngle: 300,
            radius: monthRadius,
            color: colorOdd,
            events: []
        },
        {
            name: ['June', 'Jun'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle:  300,	
            endAngle: 270,
            radius: monthRadius,
            color: colorEven,
            events: []
        },
        {
            name: ['July', 'Jul'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle:  270 ,	
            endAngle: 240 ,
            radius: monthRadius,
            color: colorOdd,
            events: []
        },
        {
            name: ['August', 'Aug'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 240,	
            endAngle: 210,
            radius: monthRadius,
            color: colorEven,
            events: []
        },
        {
            name: ['September', 'Sept'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 210,	
            endAngle: 180,
            radius: monthRadius,
            color: colorOdd,
            events: []
        },
        {
            name: ['October', 'Oct'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 180,	
            endAngle: 150,
            radius: monthRadius,
            color: colorEven,
            events: []
        },
        {
            name: ['November', 'Nov'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 150,	
            endAngle: 120,
            radius: monthRadius,
            color: colorOdd,
            events: ["tet"]
        },
        {
            name: ['December', 'Dec'],
            y: svgHeight / 2,
            x: svgWidth / 2,
            startAngle: 120,	
            endAngle: 90,
            radius: monthRadius,
            color: colorEven,
            events: []
        }
    ];
} 
export default createMonths;