export const filters = {
	latest: {
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC',
	},
	highestRated: {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'DESC',
	},
	lowestRated: {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'ASC',
	},
};
