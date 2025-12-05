const { Antiparasitario, Mascota } = require('../models/associations')
const { requireAuth } = require('../middlewares/auth')

exports.new = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id_mascota } = req.query
            
            const mascota = await Mascota.findOne({
                where: { id_mascota, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada')
            }

            res.render('antiparasitarios/new', { id_mascota })
        } catch (error) {
            next(error)
        }
    }
]

exports.create = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { producto, fecha, dosis, id_mascota } = req.body

            if (!producto || !fecha || !id_mascota) {
                return res.status(400).send('Faltan campos obligatorios: producto, fecha y mascota')
            }

            const mascota = await Mascota.findOne({
                where: { id_mascota, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada o no autorizada')
            }

            await Antiparasitario.create({
                producto,
                fecha,
                dosis: dosis || null,
                id_mascota: parseInt(id_mascota)
            })

            const msg = encodeURIComponent('Antiparasitario registrado exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al crear antiparasitario:', error)
            next(error)
        }
    }
]

exports.edit = [
    requireAuth,
    async (req, res, next) => {
        try {
            const antiparasitario = await Antiparasitario.findOne({
                where: { id_antiparasitario: req.params.id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!antiparasitario) {
                return res.status(404).send('Antiparasitario no encontrado')
            }

            if (antiparasitario.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            const antiparasitarioData = antiparasitario.get({ plain: true })
            res.render('antiparasitarios/edit', { antiparasitario: antiparasitarioData })
        } catch (error) {
            console.error('Error al editar antiparasitario:', error)
            next(error)
        }
    }
]

exports.update = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { producto, fecha, dosis, id_mascota } = req.body

            if (!producto || !fecha) {
                return res.status(400).send('Faltan campos obligatorios')
            }

            const antiparasitario = await Antiparasitario.findOne({
                where: { id_antiparasitario: id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!antiparasitario) {
                return res.status(404).send('Antiparasitario no encontrado')
            }

            if (antiparasitario.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            await antiparasitario.update({
                producto,
                fecha,
                dosis: dosis || null
            })

            const msg = encodeURIComponent('Antiparasitario actualizado exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al actualizar antiparasitario:', error)
            next(error)
        }
    }
]

exports.delete = [
    requireAuth,
    async (req, res, next) => {
        try {
            const antiparasitario = await Antiparasitario.findOne({
                where: { id_antiparasitario: req.params.id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!antiparasitario) {
                return res.status(404).send('Antiparasitario no encontrado')
            }

            if (antiparasitario.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            const id_mascota = antiparasitario.id_mascota
            await antiparasitario.destroy()

            const msg = encodeURIComponent('Antiparasitario eliminado exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al eliminar antiparasitario:', error)
            next(error)
        }
    }
]