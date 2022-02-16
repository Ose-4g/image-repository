import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { LoginResponseType } from '../../TypeDefs/responseTypes';
import ServiceLocator from '../../../di/serviceLocator';
import errorHandler from '../../../errors/errorHandlerGraphQl';

const loginQuery: GraphQLFieldConfig<any, any, any> = {
  type: LoginResponseType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { email, password } = args;
    try {
      const data = await ServiceLocator.authService.loginLogic(email, password);
      return data;
    } catch (error: any) {
      return errorHandler(error);
    }
  },
};

export default loginQuery;
