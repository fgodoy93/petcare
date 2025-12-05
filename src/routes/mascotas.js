const express = require('express')
const router = express.Router()
const mascotasController = require('../controllers/mascotasController')

router.get('/', mascotasController.index)
router.get('/new', mascotasController.new)
router.post('/', mascotasController.create)
router.get('/:id', mascotasController.show)
router.get('/:id/edit', mascotasController.edit)
router.put('/:id', mascotasController.update)
router.delete('/:id', mascotasController.delete)

module.exports = router