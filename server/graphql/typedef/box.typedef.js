const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const { ActivityTypeDef } = require('./activity.typedef');
const { LocationTypeDef } = require('./location.typedef');

const boxResolver = require("../resolver/box.resolver");

const BoxTypeDef = new GraphQLObjectType({
    name: 'Box',
    description: 'This represents a box/order that is beeing transported',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLID) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      activity: { type: ActivityTypeDef },
      origin: { type: LocationTypeDef },
      destination: { type: LocationTypeDef },
      history: {
        type: new GraphQLList(BoxHistoryEntryTypeDef),
        resolve: (parent) => boxResolver.getBoxHistoryById(null,{ id: parent._id }),
      }
    })
});

const BoxHistoryEntryTypeDef = new GraphQLObjectType({
    name: 'BoxHistoryEntry',
    description: 'This represents a box/order history entry',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLID) },
      activity: { type: ActivityTypeDef },
      currentLocation: { type: LocationTypeDef },
      timeStamp: { type: GraphQLString },
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

module.exports = { BoxTypeDef, BoxInputTypeDef, BoxHistoryEntryTypeDef };