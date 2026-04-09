const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookie.config');

userRouter.post('/signup', async (req, res) => {
  const { email, name, hashpass } = req.body;
  if (!email || !name || !hashpass) {
    return res
      .status(400)
      .json({ error: 'Missing required fields / Отсутствуют обязательные поля' });
  }
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, hashpass: await bcrypt.hash(hashpass, 10) },
    });
    if (!created) {
      return res
        .status(400)
        .json({ error: 'User already exists / Пользователь уже существует' });
    }
    const plainUser = user.get();

    delete plainUser.hashpass;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res

      .cookie('refreshToken', refreshToken, cookieConfig.refresh)

      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Server error / Ошибка сервера' });
  }
});

userRouter.post('/signin', async (req, res) => {
  const { email, hashpass } = req.body;

  if (!email || !hashpass) {
    return res

      .status(400)

      .json({ error: 'Missing required fields / Отсутствуют обязательные поля' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Не верный логин или пароль' });
    }

    const isValidhashpass = await bcrypt.compare(hashpass, user.hashpass);

    if (!isValidhashpass) {
      return res.status(400).json({ error: 'Не верный логин или пароль' });
    }

    const plainUser = user.get();

    delete plainUser.hashpass;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res

      .cookie('refreshToken', refreshToken, cookieConfig.refresh)

      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Server error / Ошибка сервера' });
  }
});

userRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = userRouter;
