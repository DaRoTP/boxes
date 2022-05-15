const { GraphQLObjectType } = require("graphql");

const LocationMutation = require("./location.mutation");
const ActivityMutation = require("./activity.mutation");
const BoxMutation = require("./box.mutation");
const UserMutation = require("./user.mutation");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    ...LocationMutation,
    ...ActivityMutation,
    ...BoxMutation,
    ...UserMutation,
  }),
});

module.exports = RootMutationType;
