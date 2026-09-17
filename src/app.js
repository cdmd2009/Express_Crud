require("dotenv").config()
const express = require("express")
//importar enrutador
const enrutador = require("./routes")
const app = express()


//middleware formatear datos del body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ruta por defecto para toda la app
app.use("/api", enrutador)

app.get("/", (req, res) =>{
    res.send("API restful - CRUD Aprendices")
})
module.exports = app