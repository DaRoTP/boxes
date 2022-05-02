const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

const ActivityTypeDef = new GraphQLObjectType({
    name: 'Activity',
    description: 'This represents activity of an order',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      code: { type: new GraphQLNonNull(GraphQLString) },
    })
});

module.exports = { ActivityTypeDef };