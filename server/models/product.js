
const product = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        potho: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        providerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }        
    });
    return Product;
};

export default product;