

const user = (sequelize, DataTypes) => {
    const User = sequelize.define( 'user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        },
        rollId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
};


export default user;