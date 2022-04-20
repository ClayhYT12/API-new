const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./config/routes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded({extended:true}))
app.use(routes);

app.use(express.json());

app.listen(1010, () => {
    console.log("Servidor iniciado");
});


