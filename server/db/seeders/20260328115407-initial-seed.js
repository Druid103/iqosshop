'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Admin',
          email: 'admin@example.com',
          password: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Icos',
      [
        {
          name: 'IQOS ILUMA Prime',
          description:
            'Премиальная модель с индукционным нагревом, время работы до 20 сеансов, быстрая зарядка',
          image: '/images/iqos-iluma-prime.jpg',
          price: 8990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS ILUMA One',
          description:
            'Компактная модель с индукционным нагревом, легкий вес, время работы до 20 сеансов',
          image: '/images/iqos-iluma-one.jpg',
          price: 6490,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS ILUMA Standard',
          description:
            'Базовая модель с индукционным нагревом, элегантный дизайн, до 20 сеансов на одной зарядке',
          image: '/images/iqos-iluma-standard.jpg',
          price: 7990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS 3 DUO',
          description: 'Два использования подряд, быстрая зарядка, компактный размер',
          image: '/images/iqos-3-duo.jpg',
          price: 5990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS 3 Multi',
          description: 'До 10 сеансов без подзарядки, идеально для длительных поездок',
          image: '/images/iqos-3-multi.jpg',
          price: 6990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS Originals One',
          description: 'Легкий и компактный, до 20 сеансов, простой интерфейс',
          image: '/images/iqos-originals-one.jpg',
          price: 5490,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS Originals DUO',
          description: 'Классическая модель с возможностью двух последовательных сеансов',
          image: '/images/iqos-originals-duo.jpg',
          price: 5990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS VEEV One',
          description:
            'Электронная система для вейпинга, компактный дизайн, до 300 затяжек',
          image: '/images/iqos-veev-one.jpg',
          price: 2490,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS VEEV',
          description:
            'Продвинутая система для вейпинга, регулировка температуры, дисплей',
          image: '/images/iqos-veev.jpg',
          price: 3990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IQOS ILUMA Limited Edition',
          description:
            'Лимитированная серия с уникальным дизайном, индукционный нагрев, полный комплект аксессуаров',
          image: '/images/iqos-iluma-limited.jpg',
          price: 12990,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Icos', null, {});
  },
};
