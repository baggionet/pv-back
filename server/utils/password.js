const bcrypt = require('bcryptjs');

const encriptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        return hash;

    } catch (error) {
        return new Error("Internal server error");
    }
};

export {encriptPassword}; 