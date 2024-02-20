import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
	mutation authenticate($username: String!, $password: String!) {
		authenticate(credentials: { username: $username, password: $password }) {
			accessToken
		}
	}
`;

export const ADD_REVIEW = gql`
	mutation CreateReview($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			rating
			text
			repositoryId
		}
	}
`;
