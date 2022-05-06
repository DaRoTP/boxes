const { GraphQLList, GraphQLID } = require("graphql");

const locationResolver = require('../resolver/location.resolver');
const { LocationTypeDef } = require("../typedef/location.typedef");

module.exports = {
    locations: {
        type: new GraphQLList(LocationTypeDef),
        resolve: locationResolver.list,
    },
    location: {
        type: LocationTypeDef,
        args: {
            id: { type: GraphQLID },
        },
        resolve: (_, args) => locationResolver.getById(args.id)
    }
}