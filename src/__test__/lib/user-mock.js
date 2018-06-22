import faker from 'faker';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';
import User from '../../model/user';

const pCreateUserMock = () => {
  const resultMock = {};
  return pCreateAccountMock()
    .then((data) => {
      resultMock.token = data.token;
      return new User({
        owner: data.account.id,
        email: data.account.email,
        username: data.account.username,
        bio: faker.lorem.words(10),
        avatar: faker.image.image(),
      }).save();
    })
    .then((newUser) => {
      resultMock.user = newUser;
      return resultMock;
    });
};

const pRemoveUserMock = () => Promise.all([
  User.remove({}),
  pRemoveAccountMock(),
]); 

export { pCreateUserMock, pRemoveUserMock };
