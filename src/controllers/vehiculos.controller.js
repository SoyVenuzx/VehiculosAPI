import { pool } from '../db.js'

export const getVehicles = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM vehiculo')
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getVehicle = async (req, res) => {
  try {
    const { id } = req.params

    const [result] = await pool.query(
      'SELECT * FROM vehiculo WHERE matricula = ?',
      [id]
    )

    if (result.length <= 0)
      res.status(400).json({ message: 'Vehicle not found' })
    res.json(result[0])
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const createVehicle = async (req, res) => {
  try {
    const { matricula, marca, idTipo, modelo, color, anio } = req.body

    console.log({ body: req.body })

    const [rows] = await pool.query(
      'SELECT * FROM vehiculo WHERE matricula = ?',
      [matricula]
    )

    if (rows.length > 0)
      return res.status(400).json({ message: 'Vehicle already exists' })

    const currentYear = new Date().getFullYear()
    if (anio < 1900 || anio > currentYear + 1)
      return res.status(400).json({ message: 'Invalid year' })

    console.log('Pasó las validaciones...')

    const [result] = await pool.query(
      'INSERT INTO vehiculo (matricula, idTipo, marca, modelo, color, anio) VALUES (?, ?, ?, ?, ?, ?)',
      [matricula, idTipo, marca, modelo, color, anio]
    )

    res.status(201).json({
      id: result.insertId,
      ...req.body
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params
    const { matricula, color } = req.body

    const [result] = await pool.query(
      'UPDATE vehiculo SET matricula = IFNULL(?, matricula), color = IFNULL(?, color) WHERE matricula = ?',
      [matricula, color, id]
    )

    if (result.affectedRows <= 0)
      res.status(400).json({ message: 'Vehicle not found' })

    const [rows] = await pool.query(
      'SELECT * FROM vehiculo WHERE matricula = ?',
      [matricula]
    )

    res.status(200).json({
      message: 'Vehicle updated successfully',
      updated: rows[0]
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params

    const [prev] = await pool.query(
      'SELECT * FROM vehiculo WHERE matricula = ?',
      [id]
    )

    const [result] = await pool.query(
      'DELETE FROM vehiculo WHERE matricula = ?',
      [id]
    )

    if (result.affectedRows <= 0)
      return res.status(400).json({ message: 'Vehicle not found' })

    res.json({
      message: 'Vehicle deleted successfully',
      deleted: prev[0]
    })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
