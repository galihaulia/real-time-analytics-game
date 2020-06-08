const Project = require("../models").Project;
const Genre = require("../models").Genre;

const showProject = (req, res, next) => {
    console.log('project')
    Project.findAll({
                where: {
                    id_developer: req.session.id_developer
                }
            })
            .then(data => {
                console.log({
                    status: 'success',
                    message: `ProjectShow findAll successfully`,
                    dataProject: data
                });
                res.dataProjectShow = data;
                console.log({
                    status: 'success',
                    message: `res.dataProjectShow successfully`,
                    dataProject: res.dataProjectShow
                });
                next();
            })
            .catch(err => {
                console.log({
                    status: 'error',
                    message: `ProjectShow findAll findOne : ` + err
                });
                next();
            })
}

const createProject = (req, res, next) => {
    const dataProjectCreate = {
        id_developer: req.session.id_developer,
        project_name: req.body.project_name,
        project_desc: req.body.project_desc,
        link_market: req.body.link_market,
        id_genre: req.params.id_genre
    }
    Project.create(dataProjectCreate)
            .then(data => {
                console.log({
                    status: 'success',
                    message: `dataProjectCreate successfully`,
                    dataProjectCreate: data
                });
            })
            .catch(function (err) {
                console.log({
                    status: 'error',
                    message: `error dataProjectCreate : ` + err
                });
            });
}

module.exports = {
    showProject: showProject,
    createProject: createProject
}