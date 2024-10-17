const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Función para leer la base de datos
const readDatabase = () => {
    const data = fs.readFileSync('./database.json');
    return JSON.parse(data);
};

// Función para guardar en la base de datos
const saveDatabase = (data) => {
    fs.writeFileSync('./database.json', JSON.stringify(data, null, 2));
};

// POST /acorta - Acortar una URL
router.post('/acorta', (req, res) => {
    const {usuario,sitio,tulink} = req.body;

    if (!usuario || !sitio) {
        console.log("Faltan Datos")
        return res.status(400).json({ message: "Faltan Datos"});
    }
    const leerData = readDatabase()
    const codigoTransaccion = uuidv4()
    const codigo = codigoTransaccion.slice(0,-28);
    if (tulink) {
        const linkExistente = leerData.find((entry)=> entry.codigo
    === tulink);
        if (linkExistente){
            return res.status(409).json({
                codigo: 409,
                mensaje: "El link personalizado ya está en uso.",
            })
        }
    }

    let guardarDatos = {
            codigoTransaccion,
            fechaGestion: new Date(),
            usuario,
            sitio,
            codigo: tulink || codigo,
            utiliza: `https://pico.li/${tulink || codigo}`,
            visits:0,
        };
    leerData.push(guardarDatos);
    saveDatabase(leerData);

    console.log(codigoTransaccion);
    res.status(201).json({guardarDatos})
    // TODO: Lógica para acortar la URL (a completar por el alumno)
    // 1. Leer datos desde req.body
    // 2. Generar código único (o personalizado)
    // 3. Guardar en la "base de datos" (archivo JSON)
    // 4. Retornar respuesta con datos del nuevo registro
});

// GET /validar/:tulink - Validar si un link personalizado está disponible
router.get('/validar/:tulink', (req, res) => {
    // TODO: Validar si el link personalizado está disponible
    // 1. Verificar que el código tenga entre 6 y 10 caracteres
    // 2. Buscar si el código ya existe en la base de datos
    // 3. Retornar respuesta indicando si está disponible o no
});

// GET /:codigo - Redireccionar a la URL original
router.get('/:codigo', (req, res) => {
    // TODO: Redireccionar a la URL original
    // 1. Buscar el código en la base de datos
    // 2. Si existe, incrementar el contador de visitas
    // 3. Redirigir al sitio original
});

module.exports = router;
