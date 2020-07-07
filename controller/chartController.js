const Project = require('../models').Project;

const metaProject = (req, res, next) => {
    Project
    .findAll({
        where: {
            DeveloperId: req.session.developerId
        },
        attributes: [
            'id',
            'project_name'
        ]
    })
    .then(data => {
        res.metaProject = data;
        // res.json({
        //     success: true,
        //     data: res.metaProject
        // })
        console.log({
            success: true,
            message: 'success res.metaProject',
            data: res.metaProject
        })
        next()
    })
    .catch(err => {
        res.json({
            error: true,
            message: 'error findAll : '+err
        })
        console.log({
            error: true,
            message: 'error findAll : '+err
        })
    })
}

module.exports = {
    metaProject: metaProject
}