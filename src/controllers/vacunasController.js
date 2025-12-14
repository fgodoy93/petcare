const { Vacuna, Mascota } = require('../models/associations')
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
            const { tipo, fecha, veterinario, duracion_dias, id_mascota } = req.body

            if (!tipo || !fecha || !id_mascota) {
                return res.status(400).send('Faltan campos obligatorios: tipo de vacuna, fecha y mascota')
            }

            const mascota = await Mascota.findOne({
                where: { id_mascota, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada o no autorizada')
            }

            // ✅ Calcular próxima aplicación
            const proximaAplicacion = calcularProximaAplicacion(fecha, duracion_dias)

            await Vacuna.create({
                tipo,
                fecha,
                veterinario: veterinario || null,
                duracion_dias: duracion_dias || null,
                proxima_aplicacion: proximaAplicacion,
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
            const { tipo, fecha, veterinario, duracion_dias, id_mascota } = req.body

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

            // ✅ Calcular próxima aplicación
            const proximaAplicacion = calcularProximaAplicacion(fecha, duracion_dias)

            await vacuna.update({
                tipo,
                fecha,
                veterinario: veterinario || null,
                duracion_dias: duracion_dias || null,
                proxima_aplicacion: proximaAplicacion
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
