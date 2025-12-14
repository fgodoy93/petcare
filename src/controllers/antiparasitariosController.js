const { Antiparasitario, Mascota } = require('../models/associations')
const { requireAuth } = require('../middlewares/auth')

// ✅ FUNCIÓN AUXILIAR CORREGIDA: Calcular próxima aplicación
function calcularProximaAplicacion(fecha, duracionDias) {
    if (!duracionDias || duracionDias <= 0) return null

    // Asegurarse de que la fecha esté en formato correcto
    const fechaBase = new Date(fecha + 'T00:00:00')

    // Verificar que la fecha sea válida
    if (isNaN(fechaBase.getTime())) {
        console.error('Fecha inválida:', fecha)
        return null
    }

    // Sumar los días de duración
    fechaBase.setDate(fechaBase.getDate() + parseInt(duracionDias))

    // Retornar en formato YYYY-MM-DD
    const year = fechaBase.getFullYear()
    const month = String(fechaBase.getMonth() + 1).padStart(2, '0')
    const day = String(fechaBase.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

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
            const { producto, fecha, dosis, duracion_dias, id_mascota } = req.body

            if (!producto || !fecha || !id_mascota) {
                return res.status(400).send('Faltan campos obligatorios: producto, fecha y mascota')
            }

            const mascota = await Mascota.findOne({
                where: { id_mascota, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada o no autorizada')
            }

            // ✅ Calcular próxima aplicación
            const proximaAplicacion = calcularProximaAplicacion(fecha, duracion_dias)

            await Antiparasitario.create({
                producto,
                fecha,
                dosis: dosis || null,
                duracion_dias: duracion_dias || null,
                proxima_aplicacion: proximaAplicacion,
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
            const { producto, fecha, dosis, duracion_dias, id_mascota } = req.body

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

            // ✅ Calcular próxima aplicación
            const proximaAplicacion = calcularProximaAplicacion(fecha, duracion_dias)

            await antiparasitario.update({
                producto,
                fecha,
                dosis: dosis || null,
                duracion_dias: duracion_dias || null,
                proxima_aplicacion: proximaAplicacion
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
