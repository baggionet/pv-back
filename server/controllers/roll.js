import models from '../models';


/*
*Solo se crearan dos registros Admin y user
*/

const rollAdd = async (req, res) => {
    try {
        const { body } = req;

        const rollCreate = await models.Roll.create({
            name: body.name,
            descripction: body.descripction    
        });
        return res.status(201).send(rollCreate);

    } catch (error) {
        res.status(500).send(error.errors[0].message);
    }
};

/*
*Solo se crearan dos registros Admin y user
*/
const list = async (req, res) => {
    try {
        const rollList = await models.Roll.findAll();

        return res.status(201).send(rollList);
    } catch (error) {
        res.status(500).send(error.errors[0].message);
    }
};

export { rollAdd, list };