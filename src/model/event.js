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
      type: Array,
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
      type: Array,
      required: true,
    },
  ],
  permissions: [
    {
      type: Array,
    },
  ],
  threads: [
    {
      type: Array,
    },
  ],
});

const EventModal = module.exports = mongoose.model('event', eventSchema);
export default EventModal;
