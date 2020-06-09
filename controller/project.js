const Project = require("../models").Project;
const Genre = require("../models").Genre;

const showProject = (req, res, next) => {
    console.log('project')
    Project.findAll({
                where: {
                    UserId: req.session.developerId
                },
                include:[Genre]
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
                    dataProject_res_dataProjectShow: res.dataProjectShow
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
        GenreId: req.body.GenreId,
        UserId: req.body.UserId
    }
    Project.create(dataProjectCreate)
            .then(data => {
                console.log({
                    status: 'success',
                    message: `dataProjectCreate successfully`,
                    dataProjectCreate: data
                });
                res.redirect('/project')
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