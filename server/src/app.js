const express = require('express');
const cors = require('cors'); // ← НУЖНО ДОБАВИТЬ
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const icosRouter = require('./routes/icosRouter');
const authRouter = require('./routes/authRouter');
const tokenRouter = require('./routes/tokenRouter');
const favoriteRouter = require('./routes/basketRouter');

const app = express();

// ✅ ДОБАВЬТЕ НАСТРОЙКУ CORS (ДО всех маршрутов)
app.use(
  cors({
    origin: 'http://127.0.0.1:5173', // URL вашего фронтенда
    credentials: true, // Важно для cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }),
);

// Остальные middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Маршруты
app.use('/api/icoss', icosRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/baskets', favoriteRouter);

module.exports = app;
