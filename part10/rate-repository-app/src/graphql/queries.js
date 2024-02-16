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
				}
			}
		}
	}
`;
