import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pRemoveUserMock } from './lib/user-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Verify routes /user', () => {
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
        console.log('response in test', response.status);
        console.log('new user', response.body);
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(accountMock.username);
        expect(response.body.email).toEqual(accountMock.email);
      });
  });
});
// describe('Does this work?', () => {
//   test('this should pass', () => {
//     expect(true).toBeTruthy();    
//   });
// });
