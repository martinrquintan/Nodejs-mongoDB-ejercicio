const express = require('express');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


require('dotenv').config()

const port = process.env.PORT || 3000;

// Conexión a Base de datos
const mongoose = require('mongoose');


const uri = `mongodb+srv://martin97:${process.env.PASSWORD}@cluster0.btp0xhl.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + "/public"));

// Rutas Web
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Título del sitio web"
    })
})


app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
});