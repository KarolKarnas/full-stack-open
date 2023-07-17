interface ExerciseValues {
	dailyExerciseHours: number[];
	targetAmount: number;
}

export const parseArgumentsExe = (args: string[]): ExerciseValues => {
	if (args.length < 4) throw new Error('Not enough arguments');

	const argsCustomArr = args.splice(2);
	const argsNum = argsCustomArr.map((arg) => Number(arg));

	argsNum.forEach((arg) => {
		if (isNaN(arg)) {
			throw new Error('Provided args were not numbers!');
		}
	});
	return {
		targetAmount: argsNum[0],
		dailyExerciseHours: argsNum.slice(1),
	};
};

interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

export const calculateExercises = (
	dailyExerciseHours: number[],
	targetAmount: number
): Result => {
	const ratingDescriptionOptions: { [key: number]: string } = {
		1: `bad`,
		2: `not too bad but could be better`,
		3: `great, keep it up`,
	};
	const periodLength: number = dailyExerciseHours.length;
	const trainingDays: number = dailyExerciseHours.filter(
		(day) => day > 0
	).length;
	const average: number =
		dailyExerciseHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
	const success: boolean = average >= targetAmount ? true : false;

	const rating: number =
		average >= targetAmount ? 3 : targetAmount - average <= 1 ? 2 : 1;
	const ratingDescription: string = ratingDescriptionOptions[rating];

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target: targetAmount,
		average,
	};
};

try {
	const { targetAmount, dailyExerciseHours } = parseArgumentsExe(process.argv);
	const exercisesMsg = calculateExercises(dailyExerciseHours, targetAmount);
	console.log(exercisesMsg);
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
