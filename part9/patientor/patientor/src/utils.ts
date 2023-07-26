import {
	HealthCheckRating,
  Diagnosis
} from './types';

const isNumber = (number: unknown): number is number => {
	return typeof number === 'number' || number instanceof Number;
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((v) => Number(v))
		.includes(param);
};

export const parseHealthCheckRating = (
	healthCheckRating: unknown
): HealthCheckRating => {
	if (
		!healthCheckRating ||
		!isNumber(healthCheckRating) ||
		!isHealthCheckRating(healthCheckRating)
	) {
		throw new Error('Incorrect or missing healthCheckRating');
	}
	return healthCheckRating;
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};