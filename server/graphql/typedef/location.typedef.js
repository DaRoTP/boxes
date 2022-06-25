const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");
const { contactInfo } = require("../resolver/location.resolver");

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
    email: {
      type: GraphQLString,
      resolve: async ({ identifier }) => {
        const res = await contactInfo(identifier);
        return res?.email;
      },
    },
    phone1: {
      type: GraphQLString,
      resolve: async ({ identifier }) => {
        const res = await contactInfo(identifier);
        return res?.phone1;
      },
    },
    phone2: {
      type: GraphQLString,
      resolve: async ({ identifier }) => {
        const res = await contactInfo(identifier);
        return res?.property;
      },
    },
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
    email: { type: GraphQLString },
    phone1: { type: GraphQLString },
    phone2: { type: GraphQLString },
  }),
});

module.exports = { LocationTypeDef, LocationInputTypeDef };
