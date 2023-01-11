import { Payload } from './payload.type';

export interface AuthenticatedUser extends Payload {
  iat: number;
  exp: number;
}
