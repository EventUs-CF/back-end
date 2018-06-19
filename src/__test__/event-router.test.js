'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
import { pCreateUserMock, pRemoveUserMock } from './lib/user-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Should verify /events', () => {
  beforeAll(startServer);
  afterAll(stopServer);
});
