import { User } from './models/User';

//allows me to user req.user in the requests handlers.

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
