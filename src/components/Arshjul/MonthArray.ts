const colorOdd = '#577399';
const colorEven = '#495867';
const monthRadius = 400;

function createMonths(svgWidth: number, svgHeight: number) {
	return [
		{
			name: ['January', 'Jan'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 90,
			endAngle: 60,
			radius: monthRadius,
			color: colorOdd,
			events: [
				{ title: 'Styremøte 201-1', Category: 'Møte' },
				{ title: 'Nyttårsdag', Category: 'Fridag' }
			]
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
			events: [{ title: 'Styremøte 202-2', Category: 'Møte' }]
		},
		{
			name: ['April', 'Apr'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 360,
			endAngle: 330,
			radius: monthRadius,
			color: colorEven,
			events: [{ title: 'Generalforsamling', Category: 'Møte' }]
		},
		{
			name: ['May', 'May'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 330,
			endAngle: 300,
			radius: monthRadius,
			color: colorOdd,
			events: [
				{ title: 'Styremøte 203-3', Category: 'Møte' },
				{ title: 'Lanserinig av Enable Personelloversikt', Category: 'Salg' },
				{ title: '1. Mai', Category: 'Fridag' },
				{ title: 'Kristi Himmelfart', Category: 'Fridag' }
			]
		},
		{
			name: ['June', 'Jun'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 300,
			endAngle: 270,
			radius: monthRadius,
			color: colorEven,
			events: [
				{ title: 'Annonsekampanje Enable Personelloversikt', Category: 'Salg' },
				{ title: 'Pinseferie', Category: 'Ferie' }
			]
		},
		{
			name: ['July', 'Jul'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 270,
			endAngle: 240,
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
			events: [
				{ title: 'Styremøte 2020-4', Category: 'Møte' },
				{ title: 'Lansering av Zokrates v2', Category: 'Salg' }
			]
		},
		{
			name: ['September', 'Sept'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 210,
			endAngle: 180,
			radius: monthRadius,
			color: colorOdd,
			events: [
				{ title: 'Strategisamling', Category: 'Møte' },
				{ title: 'Annonsekampanje Enable Årshjul', Category: 'Salg' }
			]
		},
		{
			name: ['October', 'Oct'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 180,
			endAngle: 150,
			radius: monthRadius,
			color: colorEven,
			events: [
				{ title: 'Styremøte 2020-5', Category: 'Møte' },
				{ title: 'Annonsekampanje Enable Årshjul', Category: 'Salg' },
				{ title: 'Annonsekampanje Enable Årshjul', Category: 'Salg' },
				{ title: 'Annonsekampanje Enable Årshjul', Category: 'Annet' }
			]
		},
		{
			name: ['November', 'Nov'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 150,
			endAngle: 120,
			radius: monthRadius,
			color: colorOdd,
			events: [{ title: 'Julebord', Category: 'Sosialt' }]
		},
		{
			name: ['December', 'Dec'],
			y: svgHeight / 2,
			x: svgWidth / 2,
			startAngle: 120,
			endAngle: 90,
			radius: monthRadius,
			color: colorEven,
			events: [
				{ title: 'Styremøte 2020-6', Category: 'Møte' },
				{ title: 'Juleferie', Category: 'Ferie' }
			]
		}
	];
}
export default createMonths;
