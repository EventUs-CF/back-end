'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateEventMock, pRemoveEventMock } from './lib/event-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('POST - Should verify EventsRouter file', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveEventMock);

  test('This test should verify if the event can be created successfully by a user', () => {
    let eventMock = null;
    return pCreateEventMock()
      .then((eventSetMock) => {
        eventMock = eventSetMock;
        return superagent.post(`${apiURL}/events`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${eventSetMock.user.token}`)
          .send(eventSetMock.mockEvent);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(eventMock.mockEvent.title);
        expect(response.body.createdBy).toEqual(eventMock.user.user._id.toString());
      });
  });
});
describe('GET - Should verify EventsRouter file', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveEventMock);

  test('/events/:id Should return a created event by id', () => {
    let eventMock = null;
    return pCreateEventMock()
      .then((eventSetMock) => {
        eventMock = eventSetMock;
        return superagent.get(`${apiURL}/events/${eventMock.mockEvent._id}`)
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.title).toEqual(eventMock.mockEvent.title);
          });
      });
  });
  test('/events Should return all the events in DB', () => {
    let event1 = null;
    let event2 = null;
    return pCreateEventMock()
      .then((eventSetMock1) => {
        event1 = eventSetMock1;
      })
      .then(() => {
        return pCreateEventMock()
          .then((eventSetMock2) => {
            event2 = eventSetMock2;
          });
      })
      .then(() => {
        return superagent.get(`${apiURL}/events`)
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(2); // eslint-disable-line
            expect(response.body[0].title).toEqual(event1.mockEvent.title);
            expect(response.body[1].title).toEqual(event2.mockEvent.title);
          });
      });
  });
});
describe('PUT - Should validate the PUT route', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveEventMock);

  test('/events/:id should update the event and return a 200 code and event', () => {
    let eventMock = null;
    return pCreateEventMock()
      .then((eventSetMock) => {
        eventMock = eventSetMock;
        return superagent.put(`${apiURL}/events/${eventSetMock.mockEvent._id}`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${eventSetMock.user.token}`)
          .send({ title: 'EVENTUS DEMO' });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('EVENTUS DEMO');
        expect(response.body.createdBy).toEqual(eventMock.user.user._id.toString());
      });
  });
});
describe('DELETE - Should validate the DELETE route', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveEventMock);

  test('/events/:id should delete event and return status 204', () => {
    return pCreateEventMock()
      .then((eventSetMock) => {
        return superagent.delete(`${apiURL}/events/${eventSetMock.mockEvent._id}`)
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${eventSetMock.user.token}`);
      })
      .then((response) => {
        expect(response.status).toEqual(204);
      });
  });
});
