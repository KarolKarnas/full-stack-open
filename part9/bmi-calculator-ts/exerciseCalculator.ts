interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (
	dailyExerciseHours: number[],
	targetAmount: number
): Result => {
	const ratingDescriptionOptions: { [key: number]: string } = {
		1: `waste off time`,
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
	// const test = Number(rating)
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
