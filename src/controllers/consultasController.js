const { Consulta, Mascota } = require('../models/associations')
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

            res.render('consultas/new', { id_mascota })
        } catch (error) {
            next(error)
        }
    }
]

exports.create = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { fecha, motivo, veterinario, id_mascota } = req.body

            if (!fecha || !id_mascota) {
                return res.status(400).send('Faltan campos obligatorios: fecha y mascota')
            }

            const mascota = await Mascota.findOne({
                where: { id_mascota, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada o no autorizada')
            }

            await Consulta.create({
                fecha,
                motivo: motivo || null,
                veterinario: veterinario || null,
                id_mascota: parseInt(id_mascota)
            })

            const msg = encodeURIComponent('Consulta registrada exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al crear consulta:', error)
            next(error)
        }
    }
]

exports.edit = [
    requireAuth,
    async (req, res, next) => {
        try {
            const consulta = await Consulta.findOne({
                where: { id_consulta: req.params.id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!consulta) {
                return res.status(404).send('Consulta no encontrada')
            }

            if (consulta.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            const consultaData = consulta.get({ plain: true })
            res.render('consultas/edit', { consulta: consultaData })
        } catch (error) {
            console.error('Error al editar consulta:', error)
            next(error)
        }
    }
]

exports.update = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { fecha, motivo, veterinario, id_mascota } = req.body

            if (!fecha) {
                return res.status(400).send('La fecha es obligatoria')
            }

            const consulta = await Consulta.findOne({
                where: { id_consulta: id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!consulta) {
                return res.status(404).send('Consulta no encontrada')
            }

            if (consulta.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            await consulta.update({
                fecha,
                motivo: motivo || null,
                veterinario: veterinario || null
            })

            const msg = encodeURIComponent('Consulta actualizada exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al actualizar consulta:', error)
            next(error)
        }
    }
]

exports.delete = [
    requireAuth,
    async (req, res, next) => {
        try {
            const consulta = await Consulta.findOne({
                where: { id_consulta: req.params.id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!consulta) {
                return res.status(404).send('Consulta no encontrada')
            }

            if (consulta.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            const id_mascota = consulta.id_mascota
            await consulta.destroy()

            const msg = encodeURIComponent('Consulta eliminada exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al eliminar consulta:', error)
            next(error)
        }
    }
]