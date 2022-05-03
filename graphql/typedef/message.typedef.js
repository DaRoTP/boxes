const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

const MessageTypeDef = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
      message: { type: new GraphQLNonNull(GraphQLString) },
    })
});

module.exports = { MessageTypeDef };