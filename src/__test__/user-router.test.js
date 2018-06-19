import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pCreateUserMock, pRemoveUserMock } from './lib/user-mock';
import Account from '../model/account';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify POST route /user', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveUserMock);

  test('POST - /user should get 200 status and new User', () => {
    let accountMock = null;
    return pCreateAccountMock()
      .then((accountSetMock) => {
        accountMock = accountSetMock.account;
        return superagent.post(`${apiURL}/user`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${accountSetMock.token}`) 
          .send({
            bio: 'I am Kona, the cutest Bully ever!',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.owner).toEqual(accountMock._id.toString());
        expect(response.body.username).toEqual(accountMock.username);
        expect(response.body.email).toEqual(accountMock.email);
        expect(response.body.bio).toEqual('I am Kona, the cutest Bully ever!');
      });
  });
});

describe('Verify GET route /user', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveUserMock);

  test('GET - /user should get 200 status and User info', () => {
    let userMock = null;
    return pCreateUserMock()
      .then((userSetMock) => {
        userMock = userSetMock;
        return superagent.get(`${apiURL}/user`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userSetMock.token}`) 
          .send(userSetMock.user);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.owner).toEqual(userMock.user.owner.toString());
        expect(response.body.username).toEqual(userMock.user.username.toString());
        expect(response.body.email).toEqual(userMock.user.email.toString());
      });
  });
});
describe('Verify PUT route /user', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveUserMock);

  test('PUT - /user should get 200 status and updated User info', () => {
    let userMock = null;
    return pCreateUserMock()
      .then((userSetMock) => {
        userMock = userSetMock;
        return superagent.put(`${apiURL}/user/${userMock.user._id}`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${userSetMock.token}`) 
          .send({ email: 'dummy@dummy.com', bio: 'I am Kona, the cutest Bully ever!' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(userMock.user.username);
        expect(response.body.email).toEqual('dummy@dummy.com');
        expect(response.body.bio).toEqual('I am Kona, the cutest Bully ever!');
      })
      .then(() => {
        return Account.findById(userMock.user.owner);
      })
      .then((account) => {
        expect(account.email).toEqual('dummy@dummy.com');
        expect(account.username).toEqual(userMock.user.username);
      });
  });
});
