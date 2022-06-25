const { GraphQLID, GraphQLNonNull } = require("graphql");

const sizeResolver = require("../resolver/size.resolver");
const { SizeTypeDef, SizeInputTypeDef } = require("../typedef/size.typedef");
const { MessageTypeDef } = require("../typedef/message.typedef");

module.exports = {
  createSize: {
    type: SizeTypeDef,
    args: {
      size: { type: SizeInputTypeDef },
    },
    resolve: (_, { size }) => sizeResolver.createSize(size),
  },
  updateSize: {
    type: SizeTypeDef,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      size: { type: SizeInputTypeDef },
    },
    resolve: (_, { id, size }) => sizeResolver.updateSize(id, size),
  },
  deleteSize: {
    type: MessageTypeDef,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_, { id }) => sizeResolver.deleteSize(id),
  },
};
