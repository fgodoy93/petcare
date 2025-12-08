# 🐾 PetCare - Sistema de Gestión Veterinaria

[![Deployed on Railway](https://img.shields.io/badge/Deployed%20on-Railway-blueviolet)](https://railway.app)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sistema web completo para llevar el control responsable de tus mascotas. Permite registrar y gestionar información de salud, vacunas, antiparasitarios y consultas veterinarias de forma organizada y accesible.

## 🌐 Demo en Vivo

**URL de la aplicación:** [https://tu-app.railway.app](https://tu-app.railway.app)](https://petcare-production-3ed2.up.railway.app/)

> 💡 Reemplaza con tu URL real de Railway

---

## 📸 Capturas de Pantalla

### Dashboard de Mascotas
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+de+Mascotas)

### Perfil de Mascota
![Perfil](https://via.placeholder.com/800x400?text=Perfil+de+Mascota)

> 💡 Agrega capturas reales de tu aplicación

---

## ✨ Características

### 🔐 Autenticación y Seguridad
- ✅ Registro e inicio de sesión de usuarios
- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Sesiones persistentes con cookies

### 🐕 Gestión de Mascotas
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ Subida de fotos de mascotas
- ✅ Cálculo automático de edad
- ✅ Registro de información detallada (especie, raza, peso, color)

### 💉 Historial Médico
- ✅ **Vacunas:** Registro de vacunación con fechas y veterinario
- ✅ **Antiparasitarios:** Control de desparasitaciones y dosis
- ✅ **Consultas:** Historial completo de visitas veterinarias

### 🎨 Interfaz de Usuario
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna con Bootstrap 5
- ✅ Navegación intuitiva por pestañas
- ✅ Mensajes de confirmación y alertas

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize ORM** - Mapeo objeto-relacional
- **PostgreSQL** - Base de datos relacional

### Autenticación
- **JWT (jsonwebtoken)** - Tokens de autenticación
- **bcrypt** - Encriptación de contraseñas
- **express-jwt** - Middleware de verificación JWT
- **cookie-parser** - Manejo de cookies

### Vistas y Frontend
- **Handlebars** - Motor de plantillas
- **Bootstrap 5** - Framework CSS
- **express-fileupload** - Subida de archivos

### Herramientas de Desarrollo
- **Nodemon** - Recarga automática en desarrollo
- **dotenv** - Manejo de variables de entorno
- **method-override** - Soporte para PUT y DELETE en formularios

---

## 📋 Requisitos Previos

- **Node.js** v18.x o superior
- **PostgreSQL** v13 o superior
- **npm** o **yarn**
- Cuenta en **Railway** (para despliegue)

---

## 🚀 Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/petcare.git
cd petcare
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos Local
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=petcare
DB_DIALECT=postgres

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_12345

# Entorno
NODE_ENV=development
```

### 4. Crear la base de datos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE petcare;
```

### 5. Ejecutar el script SQL

```bash
psql -U postgres -d petcare -f schema.sql
```

O manualmente:

```sql
-- Ver schema.sql en el repositorio
```

### 6. Iniciar el servidor

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```

La aplicación estará disponible en **http://localhost:8080**

---

## 📦 Estructura del Proyecto

```
petcare/
├── src/
│   ├── config/
│   │   └── db.js                 # Configuración de Sequelize
│   ├── controllers/
│   │   ├── authController.js     # Lógica de autenticación
│   │   ├── mascotasController.js # CRUD de mascotas
│   │   ├── vacunasController.js  # Gestión de vacunas
│   │   ├── antiparasitariosController.js
│   │   └── consultasController.js
│   ├── middlewares/
│   │   └── auth.js               # Middleware JWT
│   ├── models/
│   │   ├── Tutor.js              # Modelo de usuario
│   │   ├── Mascota.js            # Modelo de mascota
│   │   ├── Vacuna.js
│   │   ├── Antiparasitario.js
│   │   ├── Consulta.js
│   │   └── associations.js       # Relaciones entre modelos
│   ├── routes/
│   │   ├── auth.js               # Rutas de autenticación
│   │   ├── mascotas.js
│   │   ├── vacunas.js
│   │   ├── antiparasitarios.js
│   │   └── consultas.js
│   └── views/
│       ├── layouts/
│       │   └── main.handlebars   # Layout principal
│       ├── partials/
│       │   ├── navbar.handlebars # Barra de navegación
│       │   └── flash.handlebars  # Mensajes flash
│       ├── auth/                 # Vistas de autenticación
│       ├── mascotas/             # Vistas de mascotas
│       ├── vacunas/              # Vistas de vacunas
│       ├── antiparasitarios/
│       └── consultas/
├── public/
│   ├── css/
│   │   └── styles.css            # Estilos personalizados
│   └── uploads/                  # Fotos de mascotas
├── .env                          # Variables de entorno (no versionado)
├── .env.example                  # Ejemplo de variables
├── .gitignore
├── package.json
├── schema.sql                    # Script de creación de tablas
├── server.js                     # Punto de entrada
└── README.md
```

---

## 🗄️ Modelo de Base de Datos

```
tutores (usuarios)
├── id_tutor (PK)
├── nombre
├── email (UNIQUE)
├── password (hashed)
└── telefono

mascotas
├── id_mascota (PK)
├── nombre
├── especie
├── raza
├── fechaNacimiento
├── sexo
├── peso
├── color
├── foto
├── id_tutor (FK → tutores)
└── timestamps

vacunas
├── id_vacuna (PK)
├── tipo
├── fecha
├── veterinario
└── id_mascota (FK → mascotas)

antiparasitarios
├── id_antiparasitario (PK)
├── producto
├── fecha
├── dosis
└── id_mascota (FK → mascotas)

consultas
├── id_consulta (PK)
├── fecha
├── motivo
├── veterinario
└── id_mascota (FK → mascotas)
```

---

## 🚂 Despliegue en Railway

### Despliegue Automático

1. **Fork este repositorio** en tu cuenta de GitHub

2. **Crear cuenta en Railway:**
   - Ve a https://railway.app
   - Regístrate con GitHub

3. **Nuevo Proyecto:**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Elige tu fork de `petcare`

4. **Agregar PostgreSQL:**
   - Click en "+ New"
   - Selecciona "Database" → "PostgreSQL"
   - Railway configura automáticamente `DATABASE_URL`

5. **Variables de Entorno:**
   - Ve a tu servicio → Variables
   - Agrega:
     ```
     NODE_ENV=production
     JWT_SECRET=tu_clave_secreta_super_segura_12345
     ```

6. **Ejecutar SQL:**
   - Ve a tu base de datos PostgreSQL
   - Pestaña "Query"
   - Ejecuta el contenido de `schema.sql`

7. **Generar Dominio:**
   - Ve a Settings
   - Click en "Generate Domain"
   - ¡Tu app está lista! 🎉

### Variables de Entorno Requeridas en Railway

```env
NODE_ENV=production
JWT_SECRET=tu_clave_secreta_aqui
DATABASE_URL=postgresql://... (automático)
```

---

## 📝 Uso de la Aplicación

### 1. Registro de Usuario

1. Ve a `/auth/register`
2. Completa el formulario con:
   - Nombre completo
   - Email
   - Contraseña
   - Teléfono (opcional)

### 2. Iniciar Sesión

1. Ve a `/auth/login`
2. Ingresa email y contraseña

### 3. Agregar Mascota

1. Click en "Agregar Mascota"
2. Completa la información:
   - Nombre *
   - Especie *
   - Raza
   - Fecha de nacimiento *
   - Sexo *
   - Peso, Color
   - Foto (opcional)

### 4. Gestionar Historial Médico

1. Click en una mascota
2. Usa las pestañas:
   - **Vacunas:** Registra vacunaciones
   - **Antiparasitarios:** Controla desparasitaciones
   - **Consultas:** Anota visitas veterinarias

---

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Tokens JWT con expiración de 7 días
- ✅ Cookies httpOnly para prevenir XSS
- ✅ Validación de entrada en todos los formularios
- ✅ Autorización: usuarios solo ven sus propias mascotas
- ✅ Sanitización de archivos subidos

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m 'feat: agregar nueva funcionalidad'
   ```
4. **Push** a la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un **Pull Request**

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, sin cambios de código
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Cambios en build, dependencias, etc.

---

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor:

1. Verifica que no esté reportado en [Issues](https://github.com/TU_USUARIO/petcare/issues)
2. Abre un nuevo Issue con:
   - Título descriptivo
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Capturas de pantalla (si aplica)
   - Información del navegador/sistema

---

## 📚 Documentación Adicional

- [Guía de Instalación Detallada](docs/INSTALLATION.md)
- [API Documentation](docs/API.md)
- [Guía de Contribución](docs/CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

---

## 🗺️ Roadmap

### Versión 2.0 (Próximamente)
- [ ] Recordatorios de vacunas por email/notificación
- [ ] Validación de registro por correo electrónico 
- [ ] Modo oscuro
- [ ] Multiidioma (Español/Inglés)


---

## ❓ FAQ

**Q: ¿Puedo usar esta app para un consultorio veterinario?**  
A: Sí, pero considera que está diseñada para uso personal. Para uso comercial se recomienda agregar features como multi-tenancy y roles de usuario.

**Q: ¿Las fotos se guardan en el servidor?**  
A: Sí, localmente en desarrollo. Para producción se recomienda usar servicios como Cloudinary o AWS S3.

**Q: ¿Puedo cambiar el tema/colores?**  
A: Sí, modifica `public/css/styles.css` o personaliza las clases de Bootstrap.

**Q: ¿Es compatible con MySQL?**  
A: Sí, cambia `DB_DIALECT=mysql` en `.env` y ajusta el modelo de datos si es necesario.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 [Tu Nombre]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Agradecimientos

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Railway](https://railway.app/)
- Iconos por [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## ⭐ Dale una Estrella

Si este proyecto te resultó útil, ¡dale una ⭐ en GitHub! Ayuda a que más personas lo descubran.

---

**¿Tienes preguntas?** Abre un [Issue](https://github.com/TU_USUARIO/petcare/issues) o contáctame directamente.

**¡Gracias por usar PetCare!** 🐾
