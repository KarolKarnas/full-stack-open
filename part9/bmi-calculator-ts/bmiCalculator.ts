interface BmiValues {
	height: number;
	weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
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

const calculateBmi = (height: number, weight: number): string => {
	const heightMeter: number = height / 100;
	const bmi: number = weight / Math.pow(heightMeter, 2);
	if (bmi < 16) {
		return `Severe Thinness`;
	} else if (bmi >= 16 && bmi < 17) {
		return `Moderate Thinness`;
	} else if (bmi >= 17 && bmi < 18.5) {
		return `Mild Thinness`;
	} else if (bmi >= 18.5 && bmi < 25) {
		return `Normal (healthy weight)`;
	} else if (bmi >= 25 && bmi < 30) {
		return `Overweight`;
	} else if (bmi >= 30 && bmi < 35) {
		return `Obese Class I`;
	} else if (bmi >= 35 && bmi < 40) {
		return `Obese Class II`;
	} else if (bmi >= 40) {
		return `Obese Class III`;
	}
};

try {
	const { height, weight } = parseArguments(process.argv);
	const bmiMessage = calculateBmi(height, weight)
	console.log(bmiMessage);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
