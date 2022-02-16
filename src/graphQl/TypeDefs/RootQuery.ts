import { GraphQLObjectType, GraphQLList } from 'graphql';
import loginQuery from '../resolvers/auth/login';
const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    login: loginQuery,
  },
});

export default RootQuery;
