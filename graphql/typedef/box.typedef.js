const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const { ActivityTypeDef } = require('./activity.typedef');
const { LocationTypeDef } = require('./location.typedef');

const locationResolver = require('../resolver/location.resolver');
const activityResolver = require('../resolver/activity.resolver');

const BoxTypeDef = new GraphQLObjectType({
    name: 'Box',
    description: 'This represents a box/order that is beeing transported',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLID) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      activity: {
        type: ActivityTypeDef,
        resolve: (box) => activityResolver.getById(box.activity)
      },
      origin: {
        type: LocationTypeDef,
        resolve: (box) => locationResolver.getById(box.origin)
      },
      destination: {
        type: LocationTypeDef,
        resolve: (box) => locationResolver.getById(box.destination)
      }
    })
});

const BoxInputTypeDef = new GraphQLInputObjectType({
  name: 'BoxInput',
  description: 'This represents an input payload for box/order that is beeing transported',
  fields: () => ({
    description: { type: new GraphQLNonNull(GraphQLString) },
    activityId: { type: new GraphQLNonNull(GraphQLID) },
    originId: { type: GraphQLID },
    destinationId: { type: GraphQLID },
  })
});

module.exports = { BoxTypeDef, BoxInputTypeDef };