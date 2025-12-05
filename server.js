const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const methodOverride = require("method-override")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const PORT = process.env.PORT || 8080

const mascotasRouter = require('./src/routes/mascotas')
const vacunasRouter = require('./src/routes/vacunas')
const antiparasitariosRouter = require('./src/routes/antiparasitarios')
const consultasRouter = require('./src/routes/consultas')
const authRouter = require('./src/routes/auth')
const sequelize = require("./src/config/db")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'El archivo es demasiado grande'
}))

const { currentUser } = require('./src/middlewares/auth')
app.use(currentUser)

app.use((req, res, next) => {
    res.locals.tutor = req.auth || null
    next()
})

const hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'src', 'views', 'partials'),
    helpers: {
        formatDate: (date) => {
            if (!date) return ''
            const d = new Date(date)
            return d.toLocaleDateString('es-CL')
        },
        calcularEdad: (fecha_nacimiento) => {
            if (!fecha_nacimiento) return ''
            const hoy = new Date()
            const nacimiento = new Date(fecha_nacimiento)
            let edad = hoy.getFullYear() - nacimiento.getFullYear()
            const mes = hoy.getMonth() - nacimiento.getMonth()
            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--
            }
            return edad
        },
        eq: (a, b) => {
            return a === b
        }
    }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use('/mascotas', mascotasRouter)
app.use('/vacunas', vacunasRouter)
app.use('/antiparasitarios', antiparasitariosRouter)
app.use('/consultas', consultasRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => res.redirect('/mascotas'))

app.use((err, req, res, next) => {
    console.error('===== ERROR COMPLETO =====')
    console.error('Mensaje:', err.message)
    console.error('Nombre:', err.name)
    
    if (err.parent) {
        console.error('Error DB:', err.parent.message)
        console.error('Código:', err.parent.code)
        console.error('Detalle:', err.parent.detail)
    }
    
    if (err.sql) {
        console.error('SQL:', err.sql)
    }
    
    console.error('Stack completo:', err.stack)
    console.error('===========================')
    
    res.status(500).send(`Error: ${err.message || 'Algo salió mal...'}`)
})

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a base de datos establecida')
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err)
    })