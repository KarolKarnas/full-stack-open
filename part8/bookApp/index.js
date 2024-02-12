const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const Author = require('./models/author');
const Book = require('./models/book');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});

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
  author: Author!
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
		authorCount: async () => Author.collection.countDocuments(),
		bookCount: async () => Book.collection.countDocuments(),
		allAuthors: async () => Author.find({}),
		allBooks: async (root, args) => {
			//database approach
			if (args.author) {
				const author = await Author.findOne({ name: args.author });
				if (author) {
					if (args.genre) {
						return await Book.find({
							author: author.id,
							genres: { $in: [args.genre] },
						}).populate('author');
					}
					return await Book.find({ author: author.id }).populate('author');
				}
			}
			if (args.genre) {
				return await Book.find({})
					.where(args.genre)
					.in(root.genres)
					.populate('author');
			}
			// if (args.genre) {
			// 	return await Book.find({ genres: { $in: [args.genre] } }).populate(
			// 		'author'
			// 	);
			// }
			return Book.find({}).populate('author');
		},
	},
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name });
			const books = await Book.find({ author: author.id });
			return books.length;
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			const author = await Author.findOne({ name: args.author });
			// console.log(author);
			if (author === null) {
				// console.log('creating author');
				const newAuthor = new Author({ name: args.author });
				try {
					await newAuthor.save();
				} catch (error) {
					throw new GraphQLError('Saving new author failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							// invalidArgs: args.author,
							error,
						},
					});
				}
				// return newAuthor;
			}
			const newBook = new Book({
				title: args.title,
				published: args.published,
				genres: args.genres,
				author: author.id,
			});
			// console.log(newBook);

			try {
				await newBook.save();
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						// invalidArgs: args.title,
						error,
					},
				});
			}

			return newBook;
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name });
			author.born = args.setBornTo;
			if (!author) {
				return null;
			}
			try {
				await author.save();
			} catch (error) {
				throw new GraphQLError('Editing author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						// invalidArgs: args.name,
						error,
					},
				});
			}
			return author;
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
