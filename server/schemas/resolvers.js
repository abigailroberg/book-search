const { User, Book } = require('../models')

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
    }
}

module.exports = resolvers