const express = require('express')
const router = express.Router()
const vacunasController = require('../controllers/vacunasController')

router.get('/new', vacunasController.new)
router.post('/', vacunasController.create)
router.get('/:id/edit', vacunasController.edit)
router.put('/:id', vacunasController.update)
router.delete('/:id', vacunasController.delete)

module.exports = router