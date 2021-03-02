import express from 'express';
import { helloWorld } from './route';

const app = express();

app.get('/', helloWorld(response, request));

app.listen(3334);