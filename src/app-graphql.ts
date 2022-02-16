import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLError } from 'graphql';
import UserModel, { User } from './models/User';
import RootQuery from './graphQl/TypeDefs/RootQuery';
import Mutation from './graphQl/TypeDefs/Mutation';
import AppError from './errors/AppError';

const app = express();

const schema: GraphQLSchema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (error: GraphQLError) => {
      console.log(error);
      return error;
    },
  })
);
export default app;
