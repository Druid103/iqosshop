const favoriteRouter = require('express').Router();
const { Favorite, Icos } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyAccessToken');

favoriteRouter.get('/', verifyAccessToken, async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: res.locals.user.id },
      include: {
        model: Icos,
        as: 'icos',
      },
    });

    res.status(200).json(favorites.map((fav) => fav.icos));
  } catch (error) {
    res.status(500).json({
      message: error.message,
      text: 'Ошибка при получении избранных книг',
    });
  }
});

favoriteRouter.post('/:icosId/toggle', verifyAccessToken, async (req, res) => {
  try {
    const { icosId } = req.params;
    const userId = res.locals.user.id;

    const existing = await Favorite.findOne({ where: { userId, icosId } });
    if (existing) {
      await existing.destroy();
    } else {
      await Favorite.create({ userId, icosId });
    }

    const updatedFavorites = await Favorite.findAll({
      where: { userId },
      include: { model: Icos, as: 'icos' },
    });

    res.status(200).json({
      isFavorite: !existing,
      favorites: updatedFavorites.map((fav) => fav.icos),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

favoriteRouter.delete('/clear-all', verifyAccessToken, async (req, res) => {
  try {
    const userId = res.locals.user.id;

    const deletedCount = await Favorite.destroy({
      where: { userId },
    });

    res.status(200).json({
      message: `Удалено ${deletedCount} книг из избранного`,
      deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      text: 'Ошибка при очистке избранных книг',
    });
  }
});

module.exports = favoriteRouter;