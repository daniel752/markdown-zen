import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  avatar: String,
  avatarPublicId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
