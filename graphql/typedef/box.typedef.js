const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const { ActivityTypeDef } = require('./activity.typedef');
const { LocationTypeDef } = require('./location.typedef');

const BoxTypeDef = new GraphQLObjectType({
    name: 'Box',
    description: 'This represents a cargo/order that is beeing transported',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      lastModified: { type: new GraphQLNonNull(GraphQLString) },
      activity: { type: new GraphQLNonNull(GraphQLString) },
      activity: {
        type: ActivityTypeDef,
        resolve: (box) => {}
      },
      origin: {
        type: LocationTypeDef,
        resolve: (box) => {}
      },
      destination: {
        type: LocationTypeDef,
        resolve: (box) => {}
      }
    })
});

module.exports = { BoxTypeDef };