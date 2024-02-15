const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
	Query: {
		authorCount: async () => Author.collection.countDocuments(),
		bookCount: async () => Book.collection.countDocuments(),
		allAuthors: async () => {
			console.log('author find');
			return Author.find({});
		},
		allBooks: async (root, args) => {
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
				return await Book.find({ genres: { $in: [args.genre] } }).populate(
					'author'
				);
			}
			// if (args.genre) {
			// 	return await Book.find({})
			// 		.where(args.genre)
			// 		.in(root.genres)
			// 		.populate('author');
			// }
			return Book.find({}).populate('author');
		},
		me: (root, args, context) => {
			return context.currentUser;
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
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			const author = await Author.findOne({ name: args.author });
			let newAuthorId;
			// console.log(author);
			if (author === null) {
				// console.log('creating author');
				const newAuthor = new Author({ name: args.author });
				newAuthorId = newAuthor._id;
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
				author: author === null ? newAuthorId : author.id,
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

			pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

			return newBook;
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
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
						invalidArgs: args.setBornTo,
						error,
					},
				});
			}
			return author;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre,
			});

			return user.save().catch((error) => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: { code: 'BAD_USER_INPUT' },
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
};

module.exports = resolvers;
