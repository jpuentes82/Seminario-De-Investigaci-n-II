const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./src/configExpress.js');

//settings
app.set('port',PORT);
app.set('json spaces',2);


//soportando informacion
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

//rutas
app.use('/api/login',require('./src/router/loginrouters.js'));
app.use('/api/inventario',require('./src/router/inventariorouters.js'));

//starting the server
app.listen(app.get('port'),()=> console.log(`server in the por ${app.get('port')}`));