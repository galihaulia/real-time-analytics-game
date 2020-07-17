var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');
var developerController = require('../controllers/developerController');
var projectController = require('../controllers/projectController');
var genreController = require('../controllers/genreController');
var eventTypeController = require('../controllers/eventTypeController');
var activityController = require('../controllers/activityController');

router.post('/auth/login', authController.login);
router.post('/auth/signup', authController.signup);
router.get('/auth/edit/:id', authController.edit);
router.post('/auth/update', authController.update);
router.get('/auth/logout', authController.logout);

//#region signup
router.get('/signup', (req, res, next) => {
    res.render('cloud/signup', {
        title: 'Sign Up'
    });
})
//#endregion

//#region login
router.get('/login', (req, res, next) => {
    res.render('cloud/login', {
        title: 'Log In'
    });
});
//#endregion

//#region dashboard
router.get('/dashboard', authController.checkLogin, developerController.devInfo, projectController.showProjectName, (req, res, next) => {
    res.render('cloud/dashboard', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        projectNames: res.showProjectName
    });
});
//#endregion

//#region chart
router.get('/chart', authController.checkLogin, developerController.devInfo, projectController.showProjectName, (req, res, next) => {
    res.render('cloud/chart', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        projectNames: res.showProjectName
    });
});
//#endregion

//#region project
router.get('/project', authController.checkLogin, developerController.devInfo, projectController.showAllProject, genreController.showAllGenre, (req, res, next) => {
    res.render('cloud/project', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        projects: res.showAllProject,
        genres: res.showAllGenre
    });
});

router.post('/project', projectController.createProject);
//#endregion

//#region genre
router.post('/genre', genreController.createGenre);
//#endregion

//#region activity
router.get('/activity', authController.checkLogin, developerController.devInfo, (req, res, next) => {
    res.render('cloud/activity', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo
    });
});

router.get('/api/showActs', activityController.showActs);
router.get('/api/actsSelect/:idProject', activityController.actsSelect);
//#endregion

//#region eventType
router.get('/eventType', authController.checkLogin, developerController.devInfo, projectController.showAllProject, eventTypeController.showAllEvent, (req, res, next) => {
    res.render('cloud/eventType', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        projects: res.showAllProject,
        eventTypes: res.showAllEvent
    });
});

router.post('/eventType', eventTypeController.createEvent);
//#endregion

//#region logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_id) {  
        res.clearCookie('user_id');
        console.log(JSON.stringify(hbsContent)); 
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region profile
router.get('/profile', authController.checkLogin, developerController.devInfo, (req, res, next) => {
    res.render('cloud/profile', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo
    });
});
//#endregion

module.exports = router;