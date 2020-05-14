const express = require('express');
const router = express.Router();
const User = require('../models').User;

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
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
    res.render('signup', {layout: 'layout_Login'});
})

router.post('/signup', (req, res, next) => {
    const dataUser = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(!user){
                User.create(dataUser)
                    .then(user => {
                        req.session.user = user.dataValues;
                        // res.redirect('/dashboard');
                        res.json(user);
                    })
                    .catch(err => {
                        // res.redirect('/signup');
                        res.send('error create: ' + err)
                    });
            }else{
                res.json({error: 'udah ada'})
            }
        })
        .catch(err => {
            res.send('error findOne: ' + err)
        })

    //#region post signup Default
    // User.create({
    //     developer_name: req.body.developer_name,
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password
    // })
    // .then(user => {
    //     req.session.user = user.dataValues;
    //     res.redirect('/dashboard');
    // })
    // .catch(error => {
    //     res.redirect('/signup');
    // });
    //#endregion
});
//#endregion

//#region login
router.get('/login', sessionChecker, (req, res, next) => {
    res.render('login', {layout: 'layout_Login'});
});
router.post('/login', (req, res, next) => {
    const dataUser = {
        username: req.body.username,
        password: req.body.password
    }

    User.findOne({
            where: {
                username: dataUser.username
            } 
        })
        .then(user => {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(dataUser.password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        })
        .catch(err => {
            res.json('error findOne: ' + err)
        })
    // #region post login Default 
    // const username = req.body.username,
    //         password = req.body.password;

    // User.findOne({ where: { username: username } })
    // .then((user) => {
    //     if (!user) {
    //         res.redirect('/login');
    //     } else if (!user.validPassword(password)) {
    //         res.redirect('/login');
    //     } else {
    //         req.session.user = user.dataValues;
    //         res.redirect('/dashboard');
    //     }
    // });
    // #endregion

});
//#endregion

//#region dashboard
router.get('/dashboard', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('dashboard', {layout: 'layout_AdminPanel', user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
    console.log(req.session.user);
    console.log(req.cookies.user_id);
});
//#endregion

//#region chart
router.get('/chart', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('chart', {layout: 'layout_AdminPanel', user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region project
router.get('/project', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('project', {layout: 'layout_AdminPanel', user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region activity
router.get('/activity', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('activity', {layout: 'layout_AdminPanel', user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region eventType
router.get('/eventType', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('eventType', {layout: 'layout_AdminPanel', user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region genre
router.get('/genre', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
        res.render('genre', {layout: 'layout_AdminPanel', user: req.session.user});
    }
    else {
        res.redirect('/login');
    }
});
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
router.get('/profile', (req, res, next) => {
    if (req.session.user && req.cookies.user_id) { 
        User.findOne({
            // where: {
            //     id: req.session.user.id
            // }            
        })
        .then(user => {
            if(user){
                res.json(user.id)
            }else{
                res.send('gagal')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
        // res.render('chart', {layout: 'layout_AdminPanel'});
    }
    else {
        res.redirect('/dashboard');
    }
});
//#endregion

module.exports = router;