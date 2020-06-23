const Project = require("../models").Project;
const Genre = require("../models").Genre;

const showProject = (req, res, next) => {
    console.log('project')
    Project.findAll({
                where: {
                    DeveloperId: req.session.developerId
                },
                include:[Genre]
            })
            .then(data => {
                console.log({
                    status: 'success',
                    message: `ProjectShow findAll successfully`,
                    dataAllProject: data
                });
                res.dataAllProject = data;
                console.log({
                    status: 'success',
                    message: `res.dataAllProject successfully`,
                    dataAllProject_res_dataAllProject: res.dataAllProject
                });
                next();
            })
            .catch(err => {
                console.log({
                    status: 'error',
                    message: 'ProjectShow findAll findOne : ' + err
                });
                next();
            })
}

const createProject = (req, res, next) => {
    const dataProjectCreate = {
        project_name: req.body.project_name,
        project_desc: req.body.project_desc,
        link_market: req.body.link_market,
        DeveloperId: req.body.developerId,
        GenreId: req.body.GenreId
    }
    Project.create(dataProjectCreate)
            .then(data => {
                console.log({
                    status: 'success',
                    message: `dataProjectCreate successfully`,
                    dataProjectCreate: data
                });
                res.redirect('/cloud/project')
            })
            .catch(function (err) {
                res.json({
                    status: 'error',
                    message: `error dataProjectCreate : ` + err
                });
            });
}

module.exports = {
    showProject: showProject,
    createProject: createProject
}