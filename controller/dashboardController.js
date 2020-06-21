const Developer = require('../models').Developer;

const raw_master = (req, res, next) => {
    console.log('dashboard')
    Developer.findOne({
                where: {
                    id: req.session.developerId
                    // developer_name: req.session.developer_name,
                    // email: req.session.email
                }
            })
            .then(data => {
                console.log({
                    status: 'success',
                    message: `raw_master findOne successfully`,
                    dataDeveloper: data
                });
                res.raw_master = data.dataValues;
                console.log({
                    status: 'success',
                    message: `res.raw_master successfully`,
                    dataDeveloper_res_raw_master: res.raw_master
                });
                next();
            })
            .catch(err => {
                console.log({
                    status: 'error',
                    message: 'error raw_master findOne : ' + err
                });
                next();
            });
}

module.exports = {
    raw_master: raw_master
}

