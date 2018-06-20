import faker from 'faker';
import uuid from 'uuid/v4';
import { pCreateUserMock, pRemoveUserMock } from './user-mock';
import { pRemoveAccountMock } from './account-mock';
import EventModel from '../../model/event';

const pCreateEventMock = () => {
  const resultEventMock = {};
  return pCreateUserMock()
    .then((data) => {
      resultEventMock.user = data; 
      return new EventModel({
        title: faker.lorem.words(5),
        startDate: faker.date.future(),
        location: faker.address.streetAddress(),
        image: faker.image.imageUrl(),
        attendees: [data.user._id],
        cost: `$ ${faker.random.number(13)}`,
        runNumber: faker.random.number(7),
        keywords: [faker.lorem.words(5)],
        permissions: [faker.lorem.words(3)],
        threads: [faker.lorem.word()],
        createdOn: faker.date.future(),
        createdBy: data.user._id,
      }).save();
    })
    .then((newEventModel) => {
      resultEventMock.mockEvent = newEventModel;
      return resultEventMock; 
    });
};

const pRemoveEventMock = () => Promise.all([
  EventModel.remove({}),
  pRemoveUserMock(),
  pRemoveAccountMock(),
]); 

export { pCreateEventMock, pRemoveEventMock };
