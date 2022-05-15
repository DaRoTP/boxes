const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql')

const UserTypeDef = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      _id: { type: new GraphQLNonNull(GraphQLID) },
      username: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const LoginResponseTypeDef = new GraphQLObjectType({
  name: 'LoginResponse',
  fields: () => ({
    user: { type: new GraphQLNonNull(UserTypeDef) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  })
});

const RegisterUserTypeDef = new GraphQLInputObjectType({
  name: 'RegisterUser',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  })
});




module.exports = { UserTypeDef, LoginResponseTypeDef, RegisterUserTypeDef };