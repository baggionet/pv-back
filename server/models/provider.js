

const provider = (sequelize, DataTypes) => {
    const Provider = sequelize.define('provider', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oneday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        twooday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        threeday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fourday: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fiveday: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Provider;
};

export default provider;