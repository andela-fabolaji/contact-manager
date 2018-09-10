import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: value => /[A-Za-z]/.test(value),
      message: props => `${props.value} is not a valid contact name`
    },
    required: [true, 'Contact name is required']
  },
  phone: {
    type: String,
    validate: {
      validator: value => /[0-9]/.test(value) && value.length === 11,
      message: props => `${props.value} is not a valid phone number`
    },
    unique: true,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    validate: {
      validator: value => /(.+)@(.+){2,}\.(.+){2,}/.test(value),
      message: props => `${props.value} is not a valid email.`
    },
    unique: true
  },
  address: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

contactSchema.post('save', (err, doc, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    next({ name: 'duplicatekeyerror', message: err.errmsg });
  } else {
    next();
  }
});

contactSchema.post('remove', (err, doc, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    next({ name: 'Invalid id', message: err.errmsg });
  } else {
    next();
  }
});

export const Contact = mongoose.model('Contact', contactSchema);