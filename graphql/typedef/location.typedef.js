const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql')

const LocationTypeDef = new GraphQLObjectType({
    name: 'Location',
    description: 'This represents address of a warehouse',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLString) },
      country: { type: new GraphQLNonNull(GraphQLString) },
      city: { type: new GraphQLNonNull(GraphQLString) },
      street: { type: new GraphQLNonNull(GraphQLString) },
      number: { type: new GraphQLNonNull(GraphQLInt) },
      postcode: { type: new GraphQLNonNull(GraphQLString) },
    })
});

module.exports = { LocationTypeDef };