const { Vacuna, Mascota } = require('../models/associations')
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

            res.render('vacunas/new', { id_mascota })
        } catch (error) {
            next(error)
        }
    }
]

exports.create = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { tipo, fecha, veterinario, id_mascota } = req.body

            if (!tipo || !fecha || !id_mascota) {
                return res.status(400).send('Faltan campos obligatorios: tipo de vacuna, fecha y mascota')
            }

            const mascota = await Mascota.findOne({
                where: { id_mascota, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada o no autorizada')
            }

            await Vacuna.create({
                tipo,
                fecha,
                veterinario: veterinario || null,
                id_mascota: parseInt(id_mascota)
            })

            const msg = encodeURIComponent('Vacuna registrada exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al crear vacuna:', error)
            next(error)
        }
    }
]

exports.edit = [
    requireAuth,
    async (req, res, next) => {
        try {
            const vacuna = await Vacuna.findOne({
                where: { id_vacuna: req.params.id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!vacuna) {
                return res.status(404).send('Vacuna no encontrada')
            }

            if (vacuna.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            const vacunaData = vacuna.get({ plain: true })
            res.render('vacunas/edit', { vacuna: vacunaData })
        } catch (error) {
            console.error('Error al editar vacuna:', error)
            next(error)
        }
    }
]

exports.update = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { tipo, fecha, veterinario, id_mascota } = req.body

            if (!tipo || !fecha) {
                return res.status(400).send('Faltan campos obligatorios')
            }

            const vacuna = await Vacuna.findOne({
                where: { id_vacuna: id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!vacuna) {
                return res.status(404).send('Vacuna no encontrada')
            }

            if (vacuna.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            await vacuna.update({
                tipo,
                fecha,
                veterinario: veterinario || null
            })

            const msg = encodeURIComponent('Vacuna actualizada exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            console.error('Error al actualizar vacuna:', error)
            next(error)
        }
    }
]

exports.delete = [
    requireAuth,
    async (req, res, next) => {
        try {
            const vacuna = await Vacuna.findOne({
                where: { id_vacuna: req.params.id },
                include: [{ 
                    model: Mascota,
                    as: 'mascota'
                }]
            })

            if (!vacuna) {
                return res.status(404).send('Vacuna no encontrada')
            }

            if (vacuna.mascota.id_tutor !== req.auth.id) {
                return res.status(403).send('No autorizado')
            }

            const id_mascota = vacuna.id_mascota
            await vacuna.destroy()

            const msg = encodeURIComponent('Vacuna eliminada exitosamente')
            res.redirect(`/mascotas/${id_mascota}?success=${msg}`)
        } catch (error) {
            next(error)
        }
    }
]