import mongoose from 'mongoose';
import es6Promise from 'es6-promise';
import dotenv from 'dotenv';

dotenv.config();

mongoose.promise = es6Promise;

const dbOptions = {
  useNewUrlParser: true,
  dbName: process.env.DB_NAME,
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