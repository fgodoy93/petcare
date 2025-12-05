const express = require('express')
const router = express.Router()
const consultasController = require('../controllers/consultasController')

router.get('/new', consultasController.new)
router.post('/', consultasController.create)
router.get('/:id/edit', consultasController.edit)
router.put('/:id', consultasController.update)
router.delete('/:id', consultasController.delete)

module.exports = router