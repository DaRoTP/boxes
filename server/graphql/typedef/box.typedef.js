const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  Graphql
} = require("graphql");

const { ActivityTypeDef } = require("./activity.typedef");
const { LocationTypeDef } = require("./location.typedef");
const { SizeTypeDef } = require("./size.typedef");

const boxResolver = require("../resolver/box.resolver");
const sizeResolver = require("../resolver/size.resolver");

const BoxTypeDef = new GraphQLObjectType({
  name: "Box",
  description: "This represents a box/order that is beeing transported",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    activity: { type: ActivityTypeDef },
    origin: { type: LocationTypeDef },
    currentLocation: { type: LocationTypeDef },
    destination: { type: LocationTypeDef },
    size: {
      type: SizeTypeDef,
      resolve: async (parent) => {
        return await sizeResolver.getById(parent.size);
      },
    },
    history: {
      type: new GraphQLList(BoxHistoryEntryTypeDef),
      resolve: (parent) => boxResolver.getBoxHistoryById(null, { id: parent._id }),
    },
  }),
});

const BoxHistoryEntryTypeDef = new GraphQLObjectType({
  name: "BoxHistoryEntry",
  description: "This represents a box/order history entry",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    activity: { type: ActivityTypeDef },
    currentLocation: { type: LocationTypeDef },
    timeStamp: { type: GraphQLString },
  }),
});

const BoxInputTypeDef = new GraphQLInputObjectType({
  name: "BoxInput",
  description: "This represents an input payload for box/order that is beeing transported",
  fields: () => ({
    description: { type: new GraphQLNonNull(GraphQLString) },
    activityId: { type: new GraphQLNonNull(GraphQLID) },
    originId: { type: GraphQLID },
    destinationId: { type: GraphQLID },
    sizeCode: { type: GraphQLString },
  }),
});

module.exports = { BoxTypeDef, BoxInputTypeDef, BoxHistoryEntryTypeDef };
