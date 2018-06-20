import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
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
});

const EventModal = module.exports = mongoose.model('event', eventSchema);
export default EventModal;
