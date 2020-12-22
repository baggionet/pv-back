

const ticket = (sequelize, DataTypes) => {
    const Ticket = sequelize.define( 'ticket', {
        thedate: {
            type: DataTypes.DATE 
        },
        thetime: {
            type: DataTypes.DATE 
        },
        userId: {
            type: DataTypes.INTEGER
        },
        cliente: {
            type: DataTypes.STRING
        }
    });
    return Ticket;
};

export default ticket;