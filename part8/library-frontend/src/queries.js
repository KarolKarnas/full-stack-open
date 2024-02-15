import { gql } from '@apollo/client';

// const BOOK_DETAILS = gql`
// fragment BookDetails on Book {

// }
// `

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
	query AllBooks($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			genres
			published
			title
			author {
				name
			}
		}
	}
`;

export const ALL_GENRES = gql`
	query {
		allBooks {
			genres
		}
	}
`;

// export const ALL_BOOKS = gql`
// 	query {
// 		allBooks {
// 			title
// 			published
// 			genres
// 			author {
// 				name
// 			}
// 		}
// 	}
// `;

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

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const ME = gql`
	query Me {
		me {
			username
			favoriteGenre
			id
		}
	}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
     title
    }
  }
`
