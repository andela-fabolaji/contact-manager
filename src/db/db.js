import mongoose from 'mongoose';
import es6Promise from 'es6-promise';
import dotenv from 'dotenv';

dotenv.config();
mongoose.promise = es6Promise;

const dbName = process.env.NODE_ENV === 'development'
  ? process.env.DB_NAME
  : process.env.DB_TEST_NAME;

const dbOptions = {
  useNewUrlParser: true,
  dbName,
  connectTimeoutMS: 1000,
  socketTimeoutMS: 45000,
  poolSize: 10
};

mongoose.connect(process.env.DB_URI, dbOptions)
  .then(
    () => console.log('Db connected'),
    err => console.log('Db connection error:', err)
  );

export const db = mongoose.connection;