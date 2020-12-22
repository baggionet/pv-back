import Sequelize from "sequelize";
import keys from "./keys";

export default new Sequelize('bordadosdb', 'bordados', 'bordados123',{
    host: keys.pgHost,
    dialect: 'postgres'
});