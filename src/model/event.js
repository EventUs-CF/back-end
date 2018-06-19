import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
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
  users: [
    {
      type: String,
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
});

const EventModal = module.exports = mongoose.model('event', eventSchema);
export default EventModal;
