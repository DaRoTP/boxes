const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql')

const ActivityTypeDef = new GraphQLObjectType({
    name: 'Activity',
    description: 'This represents activity of an order',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      code: { type: GraphQLString },
    })
});

const ActivityInputTypeDef = new GraphQLInputObjectType({
  name: 'ActivityInput',
  description: 'This represents input activity of an order',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
  })
});

module.exports = { ActivityTypeDef, ActivityInputTypeDef };