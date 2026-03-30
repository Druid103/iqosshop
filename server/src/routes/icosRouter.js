const express = requre('express');
const icosRouter = express.Router();

const icosController = require('../controller/icosController')

icosRouter
.route('/')
.get(icosController.getAllIcos)

icosRouter
.route('/:id')
.get(icosController.getIcosById)
.post(icosController.createIcos)
.put(icosController.updateIcos)
.delete(icosController.deleteIcos)

module.exports = icosRouter;