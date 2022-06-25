const { GraphQLList, GraphQLID } = require("graphql");

const sizeResolver = require('../resolver/size.resolver');
const { SizeTypeDef } = require("../typedef/size.typedef");

module.exports = {
    sizes: {
        type: new GraphQLList(SizeTypeDef),
        resolve: sizeResolver.list,
    },
    size: {
        type: SizeTypeDef,
        args: {
            id: { type: GraphQLID },
        },
        resolve: (_, args) => sizeResolver.getById(args.id)
    }
}