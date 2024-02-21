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

export const ADD_USER = gql`
	mutation CreateUser($user: CreateUserInput) {
		createUser(user: $user) {
			id
			createdAt
		}
	}
`;
export const DELETE_REVIEW = gql`
	mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`;
