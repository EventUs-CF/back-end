import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    unique: true, 
  },
  email: { 
    type: String, 
    required: true, 
  },
  username: { 
    type: String, 
    required: true, 
  },
  avatar: { 
    type: String, 
  },
  bio: { 
    type: String,
  },
});

export default mongoose.model('user', userSchema);
