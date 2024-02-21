import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query Repositories(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
		$first: Int
		$after: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
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
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
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
	query Repository($repositoryId: ID!, $first: Int, $after: String) {
		repository(id: $repositoryId) {
			fullName
			id
			reviews(first: $first, after: $after) {
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
					cursor
				}
				pageInfo {
        endCursor
        startCursor
        hasNextPage
      }	
			}
		}
	}
`;

export const ME = gql`
	query Me($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						text
						rating
						createdAt
						repositoryId
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

// export const GET_REPOSITORIES = gql`
// 	query Repositories(
// 		$orderBy: AllRepositoriesOrderBy
// 		$orderDirection: OrderDirection
// 		$searchKeyword: String
// 	) {
// 		repositories(
// 			orderBy: $orderBy
// 			orderDirection: $orderDirection
// 			searchKeyword: $searchKeyword
// 		) {
// 			edges {
// 				node {
// 					id
// 					name
// 					forksCount
// 					fullName
// 					createdAt
// 					description
// 					language
// 					ownerAvatarUrl
// 					ownerName
// 					ratingAverage
// 					reviewCount
// 					stargazersCount
// 					url
// 				}
// 			}
// 		}
// 	}
// `;
