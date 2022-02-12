import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import UserModel, { User } from './models/User';

const app = express();

const schema: GraphQLSchema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
export default app;
