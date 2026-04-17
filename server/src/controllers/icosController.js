const IcosService = require('../services/icosService');

class IcosController {
    getAllIcos = async (req, res) => {
        try {
            const icos = await IcosService.getAll()
            res.json(icos)
        } catch (e) {
            res.status(500).json(e.message)
        }
    };
    postIcos = async (req, res) => {
        try {
            const icos = await IcosService.postIcos(req.body)
            res.json(icos)
        } catch (e) {
            res.status(500).json({message: 'Ты лох'})
        }
    };
    getOneIcos = async (req, res) => {
        try {
            const {id} = req.params
            const icos = await IcosService.getOneIcos(id)
            res.json(icos)
        } catch (e) {
            res.status(500).json(e.message)
        }
    };
    putIcos = async (req, res) => {
        try {
            const {id} = req.params
            const icos = await IcosService.updateIcos({id}, req.body)
            res.json(icos)
        } catch (e) {
            res.status(500).json(e.message)
        }
    };

    deleteIcos = async (req, res) => {
        try {
            const {id} = req.params
            const icos = await IcosService.deleteIcos(id)
            res.json(icos)
        } catch (e) {
            res.status(500).json(e.message)
        }
    };
}

const icosController = new IcosController();
module.exports = icosController;