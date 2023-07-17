export interface BmiValues {
	height: number;
	weight: number;
}

export const parseArguments = (args: string[]): BmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error('Provided height or weight were not numbers!');
	}
};

export const calculateBmi = (height: number, weight: number): string => {
	const heightMeter: number = height / 100;
	const bmi: number = weight / Math.pow(heightMeter, 2);
	let bmiMsg: string = '';
	if (bmi < 16) {
		bmiMsg = `Severe Thinness`;
	} else if (bmi >= 16 && bmi < 17) {
		bmiMsg = `Moderate Thinness`;
	} else if (bmi >= 17 && bmi < 18.5) {
		bmiMsg = `Mild Thinness`;
	} else if (bmi >= 18.5 && bmi < 25) {
		bmiMsg = `Normal (healthy weight)`;
	} else if (bmi >= 25 && bmi < 30) {
		bmiMsg = `Overweight`;
	} else if (bmi >= 30 && bmi < 35) {
		bmiMsg = `Obese Class I`;
	} else if (bmi >= 35 && bmi < 40) {
		bmiMsg = `Obese Class II`;
	} else if (bmi >= 40) {
		bmiMsg = `Obese Class III`;
	}
	return bmiMsg;
};

try {
	const { height, weight } = parseArguments(process.argv);
	const bmiMessage = calculateBmi(height, weight);
	console.log(bmiMessage);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
