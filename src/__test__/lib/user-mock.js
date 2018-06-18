import faker from 'faker';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';
import User from '../../model/user';

const pCreateUserMock = () => {
  return pCreateAccountMock()
    .then((data) => {
      return new User({
        owner: data.account.id,
        email: data.account.email,
        username: data.account.username,
        bio: faker.lorem.words(10),
        avatar: faker.image.image(),
      }).save()
        .then((user) => {
          data.account.user = user._id;
          return data.account.save()
            .then(() => user);
        })
        .then(user => ({ data, user }));
    });
};

const pRemoveUserMock = () => Promise.all([
  User.remove({}),
  pRemoveAccountMock(),
]);

export default { pCreateUserMock, pRemoveUserMock };
