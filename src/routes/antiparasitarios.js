const express = require('express')
const router = express.Router()
const antiparasitariosController = require('../controllers/antiparasitariosController')

router.get('/new', antiparasitariosController.new)
router.post('/', antiparasitariosController.create)
router.get('/:id/edit', antiparasitariosController.edit)
router.put('/:id', antiparasitariosController.update)
router.delete('/:id', antiparasitariosController.delete)

module.exports = router