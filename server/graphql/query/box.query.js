const { GraphQLList, GraphQLID } = require("graphql");

const boxResolver = require('../resolver/box.resolver');
const { BoxTypeDef } = require("../typedef/box.typedef");

module.exports = {
    boxes: {
        type: new GraphQLList(BoxTypeDef),
        resolve: boxResolver.list,
    },
    box: {
        type: BoxTypeDef,
        args: {
            id: { type: GraphQLID },
        },
        resolve: (_, args) => boxResolver.getById(args.id)
    }
}