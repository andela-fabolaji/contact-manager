import mongoose from 'mongoose';
import validator from 'mongoose-unique-validator';

const categorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    unique: true,
    dropDups: true,
    validate: {
      validator: value => /[A-Za-z]/.test(value),
      message: props => `${props.value} is not a valid category name`
    },
    required: [true, 'Category name is required']
  }
});

categorySchema.plugin(validator);

export const Category = mongoose.model('Category', categorySchema);