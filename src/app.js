import express from 'express'
import vehiclesRoutes from './routes/vehicle.routes.js'

import './config.js'

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api', vehiclesRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

export default app
