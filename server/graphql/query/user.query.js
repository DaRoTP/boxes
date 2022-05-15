const { GraphQLString } = require("graphql");

const userResolver = require('../resolver/user.resolver');
const { LoginResponseTypeDef } = require("../typedef/user.typedef");

module.exports = {
    login: {
        type: LoginResponseTypeDef,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
        },
        resolve: userResolver.login,
    },
}