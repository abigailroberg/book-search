const { User, Book } = require('../models')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const foundUser = await User.findOne({
                    $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
                  })
            }
        }
    }
}