const manejadorErrores = (error, req, res, next)=>{
    const codigoEstado = error.statusCode || 500
    const mensaje = error.mensaje || "Error inesperado"
    console.error(`Hubo un error: ${new Date().toISOString()} ${codigoEstado} - ${mensaje}`)   
    //verificar mas informacion del error
    if(error.stack){
        console.error(error.stack)
    }
    //respuesta json
    res.json({
        Estado: "Error",
        codigoEstado,
        mensaje,
        //solo cuando esta en desarrollo
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })
}
module.exports = manejadorErrores