const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");

const boxResolver = require('../resolver/box.resolver');
const { BoxTypeDef, BoxInputTypeDef } = require("../typedef/box.typedef");
const { MessageTypeDef } = require("../typedef/message.typedef");


module.exports = {
    createBox: {
        type: BoxTypeDef,
        args: {
            box: { type: BoxInputTypeDef },
        },
        resolve: (_, { box }) => boxResolver.createBox(box)
    },
    createBoxes: {
        type: new GraphQLList(BoxTypeDef),
        args: {
            boxes: { type: new GraphQLList(BoxInputTypeDef) },
        },
        resolve: (_, { boxes }) => boxResolver.createBox(boxes)
    },
    updateBox: {
        type: BoxTypeDef,
        args: {
            id: { type:  new GraphQLNonNull(GraphQLID)},
            box: { type: BoxInputTypeDef },
            boxes: { type: new GraphQLList(BoxInputTypeDef) },
        },
        resolve: (_, { id, box, boxes }) => {
            const data = boxes || box 
            return boxResolver.updateBox(id, box);
        },
    },
    deleteBox: {
        type: MessageTypeDef,
        args: {
            id: { type:  new GraphQLNonNull(GraphQLID)},
        },
        resolve: (_, { id }) => boxResolver.deleteBox(id),
    }
}