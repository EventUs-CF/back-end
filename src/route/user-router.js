import { Router } from 'express';
import HttpError from 'http-errors';
import { json } from 'body-parser';
import logger from '../lib/logger';
import User from '../model/user';
import Account from '../model/account';
import bearerAuthMiddleware from '../lib/bearer-auth';

const userRouter = new Router();
const jsonParser = json();

userRouter.get('/user', bearerAuthMiddleware, (request, response, next) => {
  User.findOne({ owner: request.account._id })
    .then((user) => {
      if (!user) throw new HttpError(404, '__ERROR__: user not found');
      return response.json(user);
    })
    .catch(next);
});

userRouter.put('/user/:id', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  const options = { new: true, runValidators: true };
  return User.findById(request.params.id)
    .then((user) => {
      return Account.findByIdAndUpdate(user.owner, { $set: request.body }, options);
    })
    .then(() => {
      return User.findByIdAndUpdate(request.params.id, { $set: request.body }, options)
        .then((updatedUser) => {
          return response.json(updatedUser);
        })
        .catch(next);
    });
});

userRouter.post('/user', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  return new User({
    owner: request.account._id,
    username: request.account.username,
    email: request.account.email,
    bio: request.body.bio,
  }).save()
    .then((user) => {
      logger.log(logger.INFO, 'Returning a 200 and a new User');
      return response.json(user);
    })
    .catch(next);
});

export default userRouter;
