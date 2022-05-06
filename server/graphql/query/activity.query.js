const { GraphQLList, GraphQLID } = require("graphql");

const activityResolver = require('../resolver/activity.resolver');
const { ActivityTypeDef } = require("../typedef/activity.typedef");

module.exports = {
    activities: {
        type: new GraphQLList(ActivityTypeDef),
        resolve: activityResolver.list,
    },
    activity: {
        type: ActivityTypeDef,
        args: {
            id: { type: GraphQLID },
        },
        resolve: (_, args) => activityResolver.getById(args.id)
    }
}