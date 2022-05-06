const { GraphQLID, GraphQLNonNull } = require("graphql");

const locationResolver = require('../resolver/location.resolver');
const { LocationTypeDef, LocationInputTypeDef } = require("../typedef/location.typedef");
const { MessageTypeDef } = require("../typedef/message.typedef");


module.exports = {
    createLocation: {
        type: LocationTypeDef,
        args: {
            location: { type: LocationInputTypeDef },
        },
        resolve: (_, { location }) => locationResolver.createLocation(location),
    },
    updateLocation: {
        type: LocationTypeDef,
        args: {
            id: { type:  new GraphQLNonNull(GraphQLID)},
            location: { type: LocationInputTypeDef },
        },
        resolve: (_, { id, location }) => locationResolver.updateLocation(id, location),
    },
    deleteLocation: {
        type: MessageTypeDef,
        args: {
            id: { type:  new GraphQLNonNull(GraphQLID)},
        },
        resolve: (_, { id }) => locationResolver.deleteLocation(id),
    }
}