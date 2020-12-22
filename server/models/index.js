import sequelize from 'sequelize';
import db from '../config/database';


const models = {
    User: db.import('./user'),
    Roll: db.import('./roll'),
    Product: db.import('./product'),
    Provider: db.import('./provider'),
    Ticket: db.import('./ticket'),
    Detailticket: db.import('./detailticket')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export default models;