import { GraphQLObjectType, GraphQLString } from 'graphql';

const LoginResponseType = new GraphQLObjectType({
  name: 'LoginResponseType',
  fields: () => ({
    accessToken: { type: GraphQLString },
  }),
});

export { LoginResponseType };
