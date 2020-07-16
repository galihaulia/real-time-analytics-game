const Project = require("../models").Project;
const Genre = require("../models").Genre;
const Activity = require("../models").Activity;

const createProject = (req, res, next) => {
    const dataCreateProject = {
        project_name: req.body.project_name,
        project_desc: req.body.project_desc,
        link_market: req.body.link_market,
        DeveloperId: req.body.developerId,
        GenreId: req.body.GenreId
    }
    Project
    .create(dataCreateProject)
    .then(data => {
        console.log({
            success: true,
            message: 'dataCreateProject successfully',
            dataCreateProject: data
        });
        res.redirect('/cloud/project')
    })
    .catch(function (err) {
        res.json({
            error: true,
            message: 'error dataCreateProject : ' + err
        });
    });
}

const showAllProject = (req, res, next) => {
    Project
    .findAll({
        where: {
            DeveloperId: req.session.developerId
        },
        include:[Genre]
    })
    .then(data => {
        console.log({
            success: true,
            message: 'ProjectShow findAll successfully',
            showAllProject: data
        });
        res.showAllProject = data;
        console.log({
            success: true,
            message: 'res.showAllProject successfully',
            showAllProject_res_showAllProject: res.showAllProject
        });
        next();
    })
    .catch(err => {
        console.log({
            error: true,
            message: 'error ProjectShow findAll : ' + err
        });
        next();
    })
}

const showProjectName = (req, res, next) => {
    Project
    .findAll({
        where: {
            DeveloperId: req.session.developerId
        },
        attributes: [
            'id',
            'project_name'
        ],
        include:[Activity]
    })
    .then(data => {
        
        res.showProjectName = data;
        // res.json({
        //     success: true,
        //     data: res.showProjectName
        // })
        console.log({
            success: true,
            message: 'success res.showProjectName',
            data: res.showProjectName
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
    createProject: createProject,
    showAllProject: showAllProject,
    showProjectName: showProjectName,
}