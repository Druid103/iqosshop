const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const icosRouter = require('./routes/icosRouter');
const userRouter = require('./routes/authRouter');
const tokenRouter = require('./routes/tokenRouter');
const app = express();
const favoriteRouter = require('./routes/basketRouter')

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/icoss', icosRouter);
app.use('/api/user', userRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/baskets', favoriteRouter)
module.exports = app;
