import express from "express";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';


/* Data Base */
import db from './config/database';
//import { run } from 'jest';

/*AUTHENTICATION db */
db.authenticate()
.then(() => console.log('Database connected....'))
.catch(err => console.log( 'Error DB => ', err));

//creamos la const server y la instanciamos del modulo express
const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(
    express.json({
        limit: '50mb',
    }) 
);

server.use(
    express.urlencoded({
        limit: '50mb'
    })
);

server.use('/api/pv', routes);
server.use('/api/pv', express.static(__dirname + '/public'));
server.use(express.static(__dirname + '/images/products'));


module.exports = server;