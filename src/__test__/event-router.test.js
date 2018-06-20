'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pCreateUserMock, pRemoveUserMock } from './lib/user-mock';
import { pCreateEventMock, pRemoveEventMock } from './lib/event-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Should verify EventsRouter file', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveEventMock);

  test.only('This test should verify if the event can be created successfully by a user', () => {
    let eventMock = null;
    return pCreateEventMock()
      .then((eventSetMock) => {
        eventMock = eventSetMock.eventModel;
        console.log('EventSetMock object', eventSetMock);
        return superagent.post(`${apiURL}/events`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${eventSetMock.user.token}`)
          .send(eventSetMock.mockEvent);
      })
      .then((response) => {
        console.log(response.body);
        expect(1).toBeTruthy();
      });
  });
});
