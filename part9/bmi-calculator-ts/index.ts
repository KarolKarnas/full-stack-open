import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
import { parseArgumentsExe, calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	// const heightQuery = req.query.height;
	// const weightQuery = req.query.weight;
	// const heightStr:string = String(heightQuery);
	// const weightStr:string = String(weightQuery);

	// const heightQuery:string = String(req.query.height as string)
	// const weightQuery:string = String(req.query.weight as string)

	const heightQuery: string = req.query.height as string;
	const weightQuery: string = req.query.weight as string;
	try {
		const { height, weight } = parseArguments([
			'_',
			'_',
			heightQuery,
			weightQuery,
		]);
		const bmiMessage = calculateBmi(height, weight);
		res.send({
			weight,
			height,
			bmi: bmiMessage,
		});
	} catch (error: unknown) {
		res.status(400).send({
			error: 'malformatted parameters',
		});
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const daily_exercises = req.body['daily_exercises'] as number[];
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const target = req.body.target as number;

	if (daily_exercises === undefined || target === undefined) {
		return res.status(400).send({
			error: 'parameters missing',
		});
	}

	const daily_exercisesStr: string[] = daily_exercises.map((num) =>
		String(num)
	);

	daily_exercisesStr.unshift('_', '_', String(target));

	try {
		const { targetAmount, dailyExerciseHours } =
			parseArgumentsExe(daily_exercisesStr);
		const result = calculateExercises(dailyExerciseHours, targetAmount);
		res.send(result);
	} catch (error: unknown) {
		res.status(400).send({
			error: 'malformatted parameters',
		});
	}
	return;
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
