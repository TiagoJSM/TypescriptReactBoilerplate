"use strict";

import * as express from 'express';
import * as path from 'path';

import { Test } from './test';

const t = new Test();

const app = express();

app.use('/react', express.static('node_modules//react//dist//'));
app.use('/react', express.static('node_modules//react-dom//dist'));
app.use('/dist', express.static('client//dist'));
app.use('/public', express.static('server//public'));

app.get('/', (req, res) => {
  //res.send('hello world' + t.doSomething())
  res.redirect('public//index.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});