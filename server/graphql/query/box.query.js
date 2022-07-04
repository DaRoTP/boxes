const { GraphQLList, GraphQLInt, GraphQLID, GraphQLString } = require("graphql");

const boxResolver = require("../resolver/box.resolver");
const { BoxTypeDef, BoxHistoryEntryTypeDef } = require("../typedef/box.typedef");


module.exports = {
  boxes: {
    type: new GraphQLList(BoxTypeDef),
    args: {
      page: { type: GraphQLInt },
      perPage: { type: GraphQLInt },
    },
    resolve: boxResolver.list,
  },
  boxes2: {
    type: new GraphQLList(BoxTypeDef),
    args: {
      page: { type: GraphQLString },
      perPage: { type: GraphQLString },
    },
    resolve: boxResolver.list,
  },
  boxHistory: {
    type: new GraphQLList(BoxHistoryEntryTypeDef),
    resolve: boxResolver.getBoxHistoryById,
    args: {
      id: { type: GraphQLID },
    },
  },
  boxes_totalItems: {
    type: GraphQLInt,
    resolve: boxResolver.boxesCount,
  },
  box: {
    type: BoxTypeDef,
    args: {
      id: { type: GraphQLID },
    },
    resolve: (_, args) => boxResolver.getById(args.id),
  },
};
