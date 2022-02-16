import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

const ImageType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    userId: { type: GraphQLString },
    url: { type: GraphQLString },
    permission: { type: GraphQLString },
    tagged: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

export default ImageType;
