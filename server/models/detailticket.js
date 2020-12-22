

const detailticket = (sequelize, DataTypes) => {
    const Detailticket = sequelize.define('detailticker', {
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        descripction: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Detailticket;
};

export default detailticket;