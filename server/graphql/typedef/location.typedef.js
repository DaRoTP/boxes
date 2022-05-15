const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const LocationTypeDef = new GraphQLObjectType({
  name: "Location",
  description: "This represents address of a warehouse",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    identifier: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    number: { type: GraphQLInt },
    postcode: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LocationInputTypeDef = new GraphQLInputObjectType({
  name: "LocationInput",
  description: "This represents address of a warehouse",
  fields: () => ({
    country: { type: new GraphQLNonNull(GraphQLString) },
    identifier: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    number: { type: GraphQLInt },
    postcode: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = { LocationTypeDef, LocationInputTypeDef };
