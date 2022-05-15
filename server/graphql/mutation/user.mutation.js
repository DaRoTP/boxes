const { GraphQLString, GraphQLNonNull } = require("graphql");

const userResolver = require('../resolver/user.resolver');
const { UserTypeDef  } = require("../typedef/user.typedef");

module.exports = {
    register: {
        type: UserTypeDef,
        args: {
            username: { type:  new GraphQLNonNull(GraphQLString) },
            password: { type:  new GraphQLNonNull(GraphQLString) },
        },
        resolve:  userResolver.register,
    },
}