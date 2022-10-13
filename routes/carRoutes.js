const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.renderHome)

router.get('/add', Controller.renderAddCar)
router.post('/add', Controller.addCar)

router.get('/:id', Controller.renderDetailCar)

router.get('/:id/edit', Controller.renderEditCar)
router.post('/:id/edit', Controller.editCar)

router.get('/:id/delete', Controller.renderDeleteCar)

module.exports = router