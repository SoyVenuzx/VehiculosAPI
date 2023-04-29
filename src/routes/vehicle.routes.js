import { Router } from 'express'
import {
  getVehicle,
  getVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle
} from '../controllers/vehiculos.controller.js'

const router = new Router()

router.get('/vehicles', getVehicles)
router.get('/vehicles/:id', getVehicle)
router.post('/vehicles/registrar', createVehicle)
router.delete('/vehicles/eliminar/:id', deleteVehicle)
router.put('/vehicles/actualizar/:id', updateVehicle)

export default router
