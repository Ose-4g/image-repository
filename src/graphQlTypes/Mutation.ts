// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     createUser: {
//       type: UserType,
//       args: {
//         firstName: { type: GraphQLString },
//         lastName: { type: GraphQLString },
//         email: { type: GraphQLString },
//         password: { type: GraphQLString },
//       },
//       async resolve(parent, args) {
//         const { firstName, lastName, email, password } = args;
//         const user: User | void = await UserModel.create({
//           firstName,
//           lastName,
//           email,
//           password,
//           passwordConfirm: password,
//         }).catch((err) => console.log(err));
//         return user;
//       },
//     },
//   },
// });

// export default Mutation;
