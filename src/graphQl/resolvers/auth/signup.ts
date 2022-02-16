import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { LoginResponseType } from '../../TypeDefs/responseTypes';
import ServiceLocator from '../../../di/serviceLocator';
import UserType from '../../TypeDefs/UserType';
import AppError from '../../../errors/AppError';
import logger from '../../../utils/logger';
import errorHandler from '../../../errors/errorHandlerGraphQl';

const signupQuery: GraphQLFieldConfig<any, any, any> = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    passwordConfirm: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { email, password, firstName, lastName, passwordConfirm } = args;
    try {
      const data = await ServiceLocator.authService.signupLogic(firstName, lastName, email, password, passwordConfirm);
      return data;
    } catch (error: any) {
      return errorHandler(error);
    }
  },
};

export default signupQuery;
