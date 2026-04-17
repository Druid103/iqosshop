const allModels = require ('../../db/models');

class IcosService {
    constructor(models) {
        this.models = models;
    }

    async getAll() {
        const icos = await this.models.icos.findAll({
            include: [{
                model: this.models.User,
                attributes: ['name']
            }]
        })
        return icos.map(({dataValues}) => dataValues)
    }

    getOneIcos(id) {
        return this.models.icos.findOne({
            where: {id},
            include: [{
                model: this.models.User,
                attributes: ['name']
            }]
        })
    }

    async postIcos(buy, description, name, price, image) {
        if (!description || !name || !price || !image) throw new Error('All fields must be filled');
        const icos = await this.models.icos.create({description, name, price, image, buy: buy !== undefined ? buy : false,})
        return icos
    }

    async deleteIcos(id) {
        const icos = await this.models.icos.destroy({where: {id}})
        return icos

    }

    async updateIcos({id}, {name, description, price, image}) {
        await this.models.icos.update({name, description, price, image}, {where: {id}})
    }

    async

}

const icosService = new IcosService(allModels)
module.exports = icosService;