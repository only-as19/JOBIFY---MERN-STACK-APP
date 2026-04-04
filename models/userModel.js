import mongoose, { mongo } from 'mongoose';

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  fistName: {
    type: String,
    default: 'firstName',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  location: {
    type: String,
    default: 'my city',
  },
  avatar: String,
  avatarPubicId: String,
});

UserSchema.methods.toJson = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
