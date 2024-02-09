const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963,
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821,
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
	},
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design'],
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns'],
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design'],
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime'],
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution'],
	},
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}
type Book {
  title: String!
  published: Int!
  author: String!
  id: ID!
  genres: [String!]!
}

type Query {
  authorCount: Int!
  bookCount: Int!
  allAuthors: [Author!]!
  allBooks(author: String, genre: String): [Book!]!
  findAuthor(name: String!): Author
}

type Mutation {
	addBook(
		title: String!
		author: String!
		published: Int!
		genres: [String!]!
	): Book
	editAuthor(
		name: String!
		setBornTo: Int!
	): Author
}
`;

const resolvers = {
	Query: {
		authorCount: () => authors.length,
		bookCount: () => books.length,
		allAuthors: () => authors,
		allBooks: (root, args) => {
			if (!args.author && !args.genre) {
				return books;
			} else if (!args.genre && args.author) {
				return books.filter((book) => book.author === args.author);
			} else if (!args.author && args.genre) {
				return books.filter((book) => book.genres.includes(args.genre));
			} else {
				return books
					.filter((book) => book.author === args.author)
					.filter((book) => book.genres.includes(args.genre));
			}
			// return books.filter(book => (!args.author || book.author === args.author) && (!args.genre || book.genres.includes(args.genre)));
		},
	},
	Author: {
		bookCount: (root) => {
			return books.filter((book) => book.author === root.name).length;
		},
	},
	Mutation: {
		addBook: (root, args) => {
			if (!authors.find((author) => author.name === args.author)) {
				const newAuthor = {
					name: args.author,
					id: uuid(),
				};
				authors = authors.concat(newAuthor);
			}
			const newBook = {
				title: args.title,
				author: args.author,
				published: args.published,
				genres: args.genres,
				id: uuid(),
			};
			books = books.concat(newBook);
		},
		editAuthor: (root, args) => {
			const author = authors.find((author) => author.name === args.name);
			if (!author) {
				return null;
			}

			const updatedAuthor = { ...author, born: args.setBornTo };
			authors = authors.map((author) =>
				author.name === args.name ? updatedAuthor : author
			);
			return updatedAuthor;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	// cors: {
	// 	origin: ['http://localhost:3000/', 'http://localhost:4000/'],
	// },
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
