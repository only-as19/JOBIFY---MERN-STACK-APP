import User from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../error/customError.js';
import { createToken } from '../utils/tokenUtils.js';
const register = async (req, res) => {
  const isFirst = (await User.countDocuments()) === 0;
  req.body.role = isFirst ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError('invalid credentials');
  const isPasswordCorrect = comparePassword(req.body.password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');

const oneDay = 1000*60*60*24
  const token = createToken({ userId: user._id, role: user.role })
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date (Date.now()+oneDay),
    secure:process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({msg: 'user logged in'});
};

const logout = async (req,res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({msg:'user logged out'})
}

export { login, register, logout };
