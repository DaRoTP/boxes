const {GraphQLObjectType } = require('graphql')

const LocationQuery = require("./location.query");
const ActionQuery = require("./activity.query");
const BoxQuery = require("./box.query");


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      ...LocationQuery,
      ...ActionQuery,
      ...BoxQuery,
    })
});


module.exports = RootQueryType;