// import { GraphQLObjectType, GraphQLList } from 'graphql';
// const RootQuery: GraphQLObjectType = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     getAllUsers: {
//       type: new GraphQLList(UserType),
//       async resolve(parent, args) {
//         const data = await UserModel.find().catch((err) => {
//           console.log(err);
//         });

//         return data;
//       },
//     },
//   },
// });

// export default RootQuery;
