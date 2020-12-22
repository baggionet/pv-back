import { truncate } from 'fs';
import server from './server';
import db from './server/config/database';


const PORT = process.env.PORT || 5000;
/*
*ERASE DATABASE WHEN THE SERVER START AND THE CONST IS TRUE
*
*/
const eraseDatabase = false;

db.sync({ force: eraseDatabase })
.then( async () => {
    server.listen( PORT, 
        () => console.log(`Server is running at ${ PORT }`));
});