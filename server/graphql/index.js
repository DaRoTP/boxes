const { GraphQLSchema } = require('graphql');

const RootQueryType = require("./query");
const RootMutationType = require("./mutation");

const rootSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});
  
module.exports = rootSchema;  