const { GraphQLObjectType } = require('graphql');

const LocationMutation = require("./location.mutation");
const ActionMutation = require("./action.mutation");
const BoxMutation = require("./box.mutation");


const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        ...LocationMutation,
        ...ActionMutation,
        ...BoxMutation,
    })
  });

module.exports = RootMutationType;