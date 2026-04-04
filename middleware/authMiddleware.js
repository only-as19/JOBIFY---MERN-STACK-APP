import { BadRequestError, UnauthenticatedError, UnauthorizedError } from '../error/customError.js';
import { verifyJwt } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');
  try {
    const { userId, role } = verifyJwt(token);

    const testUser = userId === '69c7a3884a35a36456ec02f8';
    req.user = { userId, role, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route')
    }
    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Demo User. Read only!!!')
  }
  next()
}