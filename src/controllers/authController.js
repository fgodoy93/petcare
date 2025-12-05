const { Tutor } = require('../models/associations')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerForm = (req, res) => {
    res.render('auth/register')
}

exports.registerUser = async (req, res, next) => {
    try {
        const { nombre, email, password, telefono } = req.body

        if (!nombre || !email || !password) {
            return res.status(400).send('Todos los campos son obligatorios')
        }

        const existingUser = await Tutor.findOne({ where: { email } })

        if (existingUser) {
            return res.status(400).send('El email ya está registrado')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await Tutor.create({
            nombre,
            email,
            password: hashedPassword,
            telefono: telefono || null
        })

        res.redirect('/auth/login?success=' + encodeURIComponent('Usuario registrado exitosamente'))
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        next(error)
    }
}

exports.loginForm = (req, res) => {
    const { success } = req.query
    res.render('auth/login', { success })
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send('Email y contraseña son obligatorios')
        }

        const user = await Tutor.findOne({ where: { email } })

        if (!user) {
            return res.status(401).send('Credenciales inválidas')
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401).send('Credenciales inválidas')
        }

        // ✅ Token con id, email y nombre
        const token = jwt.sign(
            { 
                id: user.id_tutor, 
                email: user.email,
                nombre: user.nombre
            },
            process.env.JWT_SECRET || 'tu_secreto_super_seguro',
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.redirect('/mascotas')
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        next(error)
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/auth/login')
}