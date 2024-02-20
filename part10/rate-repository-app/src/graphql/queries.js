import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					id
					name
					forksCount
					fullName
					createdAt
					description
					language
					ownerAvatarUrl
					ownerName
					ratingAverage
					reviewCount
					stargazersCount
					url
				}
			}
		}
	}
`;

export const GET_REPOSITORY = gql`
	query Repository($repositoryId: ID!) {
		repository(id: $repositoryId) {
			description
			forksCount
			fullName
			id
			language
			ownerAvatarUrl
			reviewCount
			ratingAverage
			stargazersCount
			url
		}
	}
`;
export const GET_REVIEWS = gql`
	query Repository($repositoryId: ID!) {
		repository(id: $repositoryId) {
			fullName
			id
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}
`;

export const ME = gql`
	query Me {
		me {
			id
			username
		}
	}
`;
