const { GraphQLID, GraphQLNonNull } = require("graphql");

const activityResolver = require('../resolver/activity.resolver');
const { ActivityTypeDef, ActivityInputTypeDef } = require("../typedef/activity.typedef");
const { MessageTypeDef } = require("../typedef/message.typedef");

module.exports = {
    createActivity: {
        type: ActivityTypeDef,
        args: {
            activity: { type: ActivityInputTypeDef },
        },
        resolve: (_, { activity }) => activityResolver.createActivity(activity),
    },
    updateActivity: {
        type: ActivityTypeDef,
        args: {
            id: { type:  new GraphQLNonNull(GraphQLID)},
            activity: { type: ActivityInputTypeDef },
        },
        resolve: (_, { id, activity }) => activityResolver.updateActivity(id, activity),
    },
    deleteActivity: {
        type: MessageTypeDef,
        args: {
            id: { type:  new GraphQLNonNull(GraphQLID)},
        },
        resolve: (_, { id }) => activityResolver.deleteActivity(id),
    }
}