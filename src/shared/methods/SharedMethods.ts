import { CartesianCoordinate } from '../interfaces/interfaces';
import moment from 'moment';
//----Få på kartesisk form for å sette inn i svg
export const polarToCartesian = (
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
): CartesianCoordinate => {
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	};
};

//Lager kakestykker
export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
	let start = polarToCartesian(x, y, radius, startAngle);
	let end = polarToCartesian(x, y, radius, endAngle);

	let arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

	let d = [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		arcSweep,
		0,
		end.x,
		end.y,
		'L',
		x,
		y,
		'L',
		start.x,
		start.y
	].join(' ');

	return d;
};

//--------------GENERER RANDOM EVENTS ----------------------//
function idealTextColor(bgColor: any) {
	var nThreshold = 105;
	var components = getRGBComponents(bgColor);
	var bgDelta = components.R * 0.299 + components.G * 0.587 + components.B * 0.114;
	return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff';
}
function getRGBComponents(color: any) {
	var r = color.substring(1, 3);
	var g = color.substring(3, 5);
	var b = color.substring(5, 7);
	return {
		R: parseInt(r, 16),
		G: parseInt(g, 16),
		B: parseInt(b, 16)
	};
}
function randomInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const generateRandomEvents = () => {
	const alf = 'abcdefghijklmnopqrstuvwxyzæøå';
	const colorLetters = '0123456789abcdef';

	let res: any[] = [];
	for (let i = 0; i < 20; i++) {
		let title = '';
		for (let i = 0; i < randomInteger(4, 20); i++) {
			let char = alf[randomInteger(0, alf.length - 1)];
			title += i === 0 ? char.toUpperCase() : char;
		}
		let start = moment().month(randomInteger(0, 11)).toISOString();
		let color = '#';
		for (let k = 0; k < 8; k++) {
			color += colorLetters[randomInteger(0, colorLetters.length - 1)];
		}
		res.push({ Id: i, title: title, start: start, color: color, textColor: idealTextColor(color) });
	}
	return res;
};
