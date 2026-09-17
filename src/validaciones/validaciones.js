// validations.js

function validateAprendizData(nombre, edad, correo) {
    if (!nombre || !edad || !correo) {
        return { valid: false, message: "Faltan datos: nombre, edad y correo son obligatorios" };
    }
    if (nombre.length < 3) {
        return { valid: false, message: "El nombre debe tener al menos 3 caracteres" };
    }
    if (!correo.includes("@")) {
        return { valid: false, message: "El correo no tiene un formato válido" };
    }
    return { valid: true };
}

module.exports = { validateAprendizData };