import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			id
			born
			bookCount
		}
	}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			published
			author
		}
	}
`;

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author
		}
	}
`;
export const EDIT_BIRTH = gql`
	mutation editBirth($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`;

// export const FIND_PERSON = gql`
// query findPersonByName($nameToSearch: String!) {
//   findPerson(name: $nameToSearch) {
//     name
//     phone
//     id
//     address {
//       street
//       city
//     }
//   }
// }
// `
