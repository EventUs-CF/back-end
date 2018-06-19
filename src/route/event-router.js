import { Router } from 'express';
import { json } from 'body-parser';
import EventModel from '../model/event';
import bearerAuth from '../lib/bearer-auth';
import logger from '../lib/logger';

const eventRouter = new Router();
const jsonParser = json();

eventRouter.get('/events', (request, response, next) => {
  return EventModel.find()
    .then((events) => {
      // Currently redundant but allows us to trim information as needed.
      const eventInfo = [];
      events.forEach(item => eventInfo.push(item)); // could destruct the object here.
      return response.json(eventInfo);
    })
    .catch(next);
});

eventRouter.get('/events/:id', (request, response, next) => {
  return EventModel.findById(request.params.id) 
    .then((item) => {
      return response.json(item);
    })
    .catch(next);
});

eventRouter.post('/events', bearerAuth, jsonParser, (request, response, next) => {
  return new EventModel({
    title: request.body.title,
    date: request.body.date,
    location: request.body.location,
    // image: request.body.image,
    // users: request.body.users,
    cost: request.body.cost,
    runNumber: request.body.runNumber,
    keywords: request.body.keywords,
    // permissions: request.body.permissions,
    // threads: request.body.threads,
  }).save()
    .then((item) => {
      logger.log(logger.INFO, 'Returning a 200 and a new Event');
      return response.json(item);
    })
    .catch(next);
});

eventRouter.put('/events/:id', bearerAuth, jsonParser, (request, response, next) => {
  const options = { new: true, runValidators: true };
  return EventModel.findById(request.params.id, request.body, options) // ?destructure req.body
    .then(response.json)
    .catch(next);
});

eventRouter.delete('/events/:id', bearerAuth, (request, response, next) => {
  return EventModel.findByIdAndRemove(request.params.id)
    .then(() => response.sendStatus(204))
    .catch(next);
});

export default eventRouter;
