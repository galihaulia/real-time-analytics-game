const Developer = require('../models').Developer;

const devInfo = (req, res, next) => {
    console.log('dashboard')
    Developer
    .findOne({
        where: {
            id: req.session.developerId
            // developer_name: req.session.developer_name,
            // email: req.session.email
        }
    })
    .then(data => {
        console.log({
            success: true,
            message: `devInfo findOne successfully`,
            dataDeveloper: data
        });
        res.devInfo = data.dataValues;
        console.log({
            success: true,
            message: `res.devInfo successfully`,
            dataDeveloper_res_devInfo: res.devInfo
        });
        next();
    })
    .catch(err => {
        console.log({
            error: true,
            message: 'devInfo findOne erro : ' + err
        });
        next();
    });
}

module.exports = {
    devInfo: devInfo
}

