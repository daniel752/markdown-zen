import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/CustomErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError('authentication failed');

  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === process.env.TEST_USER_ID;
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication failed');
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo user is read only');
  }
  next();
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError('not authorized to access this route');
    next();
  };
};
