import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { formatImage } from "../middleware/multerMiddleware.js";

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const userWithoutPassword = user.toJson()
  res.status(StatusCodes.OK).json({ user:userWithoutPassword });
};

const getAppStats = async (req, res) => {
  const users = await User.countDocuments()
  const jobs = await Job.countDocuments()

  res.status(StatusCodes.OK).json({ users,jobs });
};

const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password

  if (req.file) {
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }

  const updateUser = await User.findByIdAndUpdate(req.user.userId,newUser)
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: 'user update' });
};

export {
    getAppStats,
    getCurrentUser,
    updateUser
}