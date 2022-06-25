const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

const MesurmentsTypeDef = new GraphQLObjectType({
  name: "Mesurments",
  description: "This represents width height deph mesurments of an order",
  fields: () => ({
    x: { type: GraphQLInt },
    y: { type: GraphQLInt },
    z: { type: GraphQLInt },
  }),
});

const SizeTypeDef = new GraphQLObjectType({
  name: "Size",
  description: "This represents size of an order",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
    weight: { type: GraphQLInt },
    mesurments: {
      type: MesurmentsTypeDef,
    },
  }),
});

const MesurmentsInputTypeDef = new GraphQLInputObjectType({
  name: "MesurmentsInput",
  description: "This represents width height deph mesurments of an order",
  fields: () => ({
    x: { type: GraphQLInt },
    y: { type: GraphQLInt },
    z: { type: GraphQLInt },
  }),
});

const SizeInputTypeDef = new GraphQLInputObjectType({
  name: "SizeInput",
  description: "This represents input of a size",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
    weight: { type: GraphQLInt },
    mesurments: { type: MesurmentsInputTypeDef },
  }),
});

module.exports = { SizeTypeDef, SizeInputTypeDef };
