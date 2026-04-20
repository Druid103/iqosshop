const allModels = require('../../db/models');

class IcosService {
  constructor(models) {
    this.models = models;
  }

  async getAllIcoss() {
    return this.models.Icos.findAll();
  }

  getOneIcos(id) {
    return this.models.Icos.findOne({
      where: { id },
      include: [
        {
          model: this.models.User,
          attributes: ['name'],
        },
      ],
    });
  }

  // В icosService.js
  async postIcos(data) {
    const { buy, description, name, price, image } = data;
    if (!description || !name || !price || !image) {
      throw new Error('All fields must be filled');
    }
    const icos = await this.models.Icos.create({
      description,
      name,
      price,
      image,
      buy: buy !== undefined ? buy : false,
    });
    return icos;
  }

  async deleteIcos(id) {
    const icos = await this.models.Icos.destroy({ where: { id } });
    return icos;
  }

  async updateIcos({ id }, { name, description, price, image }) {
    await this.models.Icos.update({ name, description, price, image }, { where: { id } });
  }
}

const icosService = new IcosService(allModels);
module.exports = icosService;
