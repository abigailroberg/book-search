const { User, Book } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user.__id })
                    .select('-__v -password')
                    .populate('savedBooks')
                    return userData
            }
        }
    },

    Mutation: {
        login: async (parent, { email, password}) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const pw = await user.isCorrectPassword(password)

            if  (!pw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user)
            return { token, user }
        },

        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user }
        },

        saveBook: async (parent, args, context) => {
            if(context.user) {
                const book = await Book.create({ ...args, username: context.user.username })

                const user = await User.findOneAndUpdate(
                    { _id: context.iser._id },
                    { $push: { savedBooks: book.bookId }},
                    { new: true }
                )

                return user
            }

            throw new AuthenticationError('You need to be logged in to save a book!')
        }
    }
}

module.exports = resolvers