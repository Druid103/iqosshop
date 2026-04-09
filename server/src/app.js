const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const icosRouter = require('./src/routes/icosRouter');
const userRouter = require('./router/userRouter');
const tokenRouter = require('./routes/tokenRouter');
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/icos', icosRouter);
app.use('/api/user', userRouter);
app.use('/api/tokens', tokenRouter);

module.exports = app;
