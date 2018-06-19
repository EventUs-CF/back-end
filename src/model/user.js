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

const User = mongoose.model('user', userSchema);

// this method is for finding other users
function fetchOne(request) {
  return this.findById(request.params.id)
    .then((user) => {
      if (!user) throw new Error('__ERROR__: user not found');
      return user;
    });
}
function create(request) {
  return new User({
    owner: request.account._id,
    username: request.account.username, 
    email: request.account.email,
    bio: request.body.bio,
  }).save()
    .then((user) => {
      request.account.user = user._id;
      return request.account.save()
        .then(() => user);
    })
    .catch(error => new Error(error));
}
function update(request) {
  // for AWS and Avatar Picture
  // if (request.files && request.files[0]) return this.updateuserWithPhoto(request);
  const options = { new: true, runValidators: true };
  return this.findByIdAndUpdate(request.params.id, { bio: request.body.bio }, options);
}

userSchema.methods.fetchOne = fetchOne;
userSchema.methods.create = create;
userSchema.methods.update = update;

export default mongoose.model('user', userSchema);
