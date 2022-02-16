import { GraphQLObjectType, GraphQLString } from 'graphql';
import signupQuery from '../resolvers/auth/signup';
import UserType from './UserType';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: signupQuery,
  },
});

export default Mutation;
