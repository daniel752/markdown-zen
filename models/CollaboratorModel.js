import mongoose from 'mongoose';

const CollaboratorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  hasEditPermission: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Collaborator', CollaboratorSchema);
