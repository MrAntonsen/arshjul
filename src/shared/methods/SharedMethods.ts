import { CartesianCoordinate } from '../interfaces/interfaces';

//----Få på kartesisk form for å sette inn i svg
export const polarToCartesian = (
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
): CartesianCoordinate => {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	};
};

//Lager kakestykker
export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
	var start = polarToCartesian(x, y, radius, startAngle);
	var end = polarToCartesian(x, y, radius, endAngle);

	var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

	var d = [
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
