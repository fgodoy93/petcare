const { Mascota, Vacuna, Antiparasitario, Consulta } = require('../models/associations')
const { requireAuth } = require('../middlewares/auth')
const path = require('path')
const fs = require('fs')

exports.index = [
    requireAuth,
    async (req, res, next) => {
        try {
            const mascotas = await Mascota.findAll({
                where: { id_tutor: req.auth.id },
                order: [['id_mascota', 'DESC']],
                raw: true
            })
            const { success } = req.query
            res.render('mascotas/index', { mascotas, success })
        } catch (error) {
            next(error)
        }
    }
]

exports.show = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const mascota = await Mascota.findOne({
                where: { id_mascota: id, id_tutor: req.auth.id },
                include: [
                    { model: Vacuna, as: 'vacunas' },
                    { model: Antiparasitario, as: 'antiparasitarios' },
                    { model: Consulta, as: 'consultas' }
                ],
                order: [
                    [{ model: Vacuna, as: 'vacunas' }, 'fecha', 'DESC'],
                    [{ model: Antiparasitario, as: 'antiparasitarios' }, 'fecha', 'DESC'],
                    [{ model: Consulta, as: 'consultas' }, 'fecha', 'DESC']
                ]
            })

            if(!mascota) {
                return res.status(404).send('Mascota no encontrada')
            }

            const mascotaData = {
                ...mascota.get({ plain: true }),
                vacunas: mascota.vacunas ? mascota.vacunas.map(v => v.get({ plain: true })) : [],
                antiparasitarios: mascota.antiparasitarios ? mascota.antiparasitarios.map(a => a.get({ plain: true })) : [],
                consultas: mascota.consultas ? mascota.consultas.map(c => c.get({ plain: true })) : []
            }

            const { success } = req.query
            res.render('mascotas/show', { mascota: mascotaData, success })
        } catch (error) {
            next(error)
        }
    }
]

exports.new = [
    requireAuth, 
    (req, res) => {
        res.render('mascotas/new')
    }
]

exports.create = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { nombre, especie, raza, fecha_nacimiento, sexo, peso, color } = req.body

            if (!nombre || !especie || !fecha_nacimiento || !sexo) {
                return res.status(400).send("Los campos nombre, especie, fecha de nacimiento y sexo son obligatorios")
            }

            let fotoUrl = null

            if (req.files && req.files.foto) {
                const foto = req.files.foto
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

                if (!allowedTypes.includes(foto.mimetype)) {
                    return res.status(400).send('Solo se permiten imágenes (jpeg, jpg, png)')
                }

                if (foto.size > 5 * 1024 * 1024) {
                    return res.status(400).send('La imagen no puede superar 5MB')
                }

                const uploadDir = path.join(__dirname, '../../public/uploads/')
                
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true })
                }

                const fileName = `mascota-${Date.now()}${path.extname(foto.name)}`
                const uploadPath = path.join(uploadDir, fileName)

                await foto.mv(uploadPath)
                fotoUrl = `/uploads/${fileName}`
            }

            await Mascota.create({
                nombre,
                especie,
                raza: raza || null,
                fechaNacimiento: fecha_nacimiento,
                sexo,
                peso: peso || null,
                color: color || null,
                foto: fotoUrl,
                id_tutor: req.auth.id
            })

            const msg = encodeURIComponent('Mascota registrada exitosamente')
            res.redirect(`/mascotas?success=${msg}`)
        } catch (error) {
            console.error('Error al crear mascota:', error)
            next(error)
        }
    }
]

exports.edit = [
    requireAuth,
    async (req, res, next) => {
        try {
            const mascota = await Mascota.findOne({
                where: { id_mascota: req.params.id, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada')
            }

            const mascotaData = mascota.get({ plain: true })
            res.render('mascotas/edit', { mascota: mascotaData })
        } catch (error) {
            next(error)
        }
    }
]

exports.update = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { nombre, especie, raza, fecha_nacimiento, sexo, peso, color } = req.body

            if (!nombre || !especie || !fecha_nacimiento || !sexo) {
                return res.status(400).send("Los campos nombre, especie, fecha de nacimiento y sexo son obligatorios")
            }

            const mascota = await Mascota.findOne({
                where: { id_mascota: id, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada')
            }

            const updateData = {
                nombre,
                especie,
                raza: raza || null,
                fechaNacimiento: fecha_nacimiento,
                sexo,
                peso: peso || null,
                color: color || null
            }

            if (req.files && req.files.foto) {
                const foto = req.files.foto
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

                if (!allowedTypes.includes(foto.mimetype)) {
                    return res.status(400).send('Solo se permiten imágenes (jpeg, jpg, png)')
                }

                if (foto.size > 5 * 1024 * 1024) {
                    return res.status(400).send('La imagen no puede superar 5MB')
                }

                const uploadDir = path.join(__dirname, '../../public/uploads/')
                
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true })
                }

                const fileName = `mascota-${Date.now()}${path.extname(foto.name)}`
                const uploadPath = path.join(uploadDir, fileName)

                await foto.mv(uploadPath)
                updateData.foto = `/uploads/${fileName}`

                if (mascota.foto) {
                    const oldPhotoPath = path.join(__dirname, '../../public', mascota.foto)
                    if (fs.existsSync(oldPhotoPath)) {
                        try {
                            fs.unlinkSync(oldPhotoPath)
                        } catch (err) {
                            console.error('Error al eliminar foto anterior:', err)
                        }
                    }
                }
            }

            await mascota.update(updateData)

            const msg = encodeURIComponent('Mascota actualizada exitosamente')
            res.redirect(`/mascotas/${id}?success=${msg}`)
        } catch (error) {
            console.error('Error al actualizar mascota:', error)
            next(error)
        }
    }
]

exports.delete = [
    requireAuth,
    async (req, res, next) => {
        try {
            const { id } = req.params
            const mascota = await Mascota.findOne({
                where: { id_mascota: id, id_tutor: req.auth.id }
            })

            if (!mascota) {
                return res.status(404).send('Mascota no encontrada')
            }

            if (mascota.foto) {
                const photoPath = path.join(__dirname, '../../public', mascota.foto)
                if (fs.existsSync(photoPath)) {
                    fs.unlinkSync(photoPath)
                }
            }

            await mascota.destroy()

            const msg = encodeURIComponent('Mascota eliminada exitosamente')
            res.redirect(`/mascotas?success=${msg}`)
        } catch (error) {
            next(error)
        }
    }
]