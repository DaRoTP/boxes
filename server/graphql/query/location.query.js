const { GraphQLList, GraphQLID, GraphQLInt, GraphQLString } = require("graphql");

const locationResolver = require('../resolver/location.resolver');
const { LocationTypeDef } = require("../typedef/location.typedef");

module.exports = {
    locations: {
        type: new GraphQLList(LocationTypeDef),
        args: {
            page: { type: GraphQLInt },
            perPage: {type: GraphQLInt },
            query: {type: GraphQLString },
        },
        resolve: locationResolver.list,
    },
    totalItems: {
        type: GraphQLInt,
        resolve: locationResolver.locationCount,
    },
    location: {
        type: LocationTypeDef,
        args: {
            id: { type: GraphQLID },
        },
        resolve: (_, args) => locationResolver.getById(args.id)
    }
}