const express = require('express');
const router = express.Router();
const User = require('../models').User;

const hbsContent = {loggedin: false}

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
  };

// router.get('/', (req, res, next) => {
//     res.render('landing', {layout: 'layout_LandingPage'});
// });

//#region signup
router.get('/signup', (req, res, next) => {
    //res.sendFile(__dirname + '/public/signup.html');
    res.render('signup', {layout: 'layout_Login'});
})

router.post('/signup', (req, res, next) => {
    User.create({
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
        req.session.user = user.dataValues;
        res.redirect('/dashboard');
    })
    .catch(error => {
        res.redirect('/signup');
    });
});
//#endregion

//#region login
router.get('/login',sessionChecker, (req, res, next) => {
    // res.render('login', hbsContent);
    res.render('login', {layout: 'layout_Login'});
});
// router.get('/login', (req, res, next) => {
//     // res.render('login', hbsContent);
//     res.render('login', {layout: 'layout_Login'});
// });
router.post('/login', (req, res, next) => {
    const username = req.body.username,
          password = req.body.password;

    User.findOne({ where: { username: username } }).then(function (user) {
        if (!user) {
            res.redirect('/login');
        } else if (!user.validPassword(password)) {
            res.redirect('/login');
        } else {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        }
    });
});
//#endregion

//#region dashboard
router.get('/dashboard', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true;
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('dashboard', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/login');
    }
    console.log(req.session.user);
    console.log(req.cookies.user_sid);
});
//#endregion

//#region chart
router.get('/chart', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('chart', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region project
router.get('/project', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('project', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region activity
router.get('/activity', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('activity', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region eventType
router.get('/eventType', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('eventType', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region genre
router.get('/genre', (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true; 
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('genre', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = false;  
        res.clearCookie('user_sid');
        console.log(JSON.stringify(hbsContent)); 
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

module.exports = router;