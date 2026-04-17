const express = require('express');
const icosRouter = express.Router();

const icosController = require('../controllers/icosController')

icosRouter
.route('/')
.get(icosController.getAllIcos)

icosRouter
.route('/:id')
.get(icosController.getOneIcos)
.post(icosController.postIcos)
.put(icosController.putIcos)
.delete(icosController.deleteIcos)

module.exports = icosRouter;