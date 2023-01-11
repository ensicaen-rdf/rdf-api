declare namespace Express {
  export interface Request {
    user?: import('../../src/auth/types/authenticated-user.type').AuthenticatedUser;
  }
}
