

const roll = (sequelize, DataTypes) => {
    const Roll = sequelize.define('roll', {
        name: {
            type: DataTypes.STRING
        },
        descripction: {
            type: DataTypes.STRING
        }
    });
    return Roll;
};

export default roll;