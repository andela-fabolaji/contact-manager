import http from 'http';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './router';
import globalErrorHandler from './globalErrorHandler';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router(express.Router()));
app.use(globalErrorHandler);

server.listen(port, err => (
  !err ? console.log('App live') : console.log('err: ', err)
));

export default app;