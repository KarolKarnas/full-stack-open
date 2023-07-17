import express from 'express';
import { parseArguments, calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const heightQuery = req.query.height;
	const weightQuery = req.query.weight;
	const heightStr:string = String(heightQuery);
	const weightStr:string = String(weightQuery);

	try {
		const { height, weight } = parseArguments(['_', '_', heightStr, weightStr]);
		const bmiMessage = calculateBmi(height, weight);
		res.json({
			weight,
			height,
			bmi: bmiMessage,
		});
	} catch (error: unknown) {
		res.status(400).json({
			error: 'malformatted parameters',
		});
	}
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
