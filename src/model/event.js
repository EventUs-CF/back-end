import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  cost: {
    type: String,
    required: true,
  },
  runNumber: {
    type: Number,
    required: true,
  },
  keywords: [
    {
      type: String,
      required: true,
    },
  ],
  permissions: [
    {
      type: String,
    },
  ],
  threads: [
    {
      type: String,
    },
  ],
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
}, {
  usePushEach: true,
});

const EventModel = module.exports = mongoose.model('event', eventSchema);
export default EventModel;
