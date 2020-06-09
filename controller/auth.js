const User = require('../models').User;

const checkLogin = (req, res, next) => {
    if (req.session && req.session.developerId) {
        res.session_info = req.session;
        console.log(res.session_info);
        return next();
    }
    else {
        //res.redirect('/cloud/login');
        res.session_info = {
        cookie:
            { path: '/',
            _expires: null,
            originalMaxAge: null,
            httpOnly: true },
        developerId: 1,
        developer_name: 'AAA',
        email: 'galihalhakim15@gmail.com' };
        return next();
    }
}

const login = (req, res, next) => {
    console.log('login')
    const dataUser = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({
            where: {
                username: dataUser.username
            } 
        })
        .then(data => {
        req.session.developerId = data.id;
        req.session.developer_name = data.developer_name;
        req.session.email = data.email;
        console.log({
            id: req.session.developerId,
            devName: req.session.developer_name,
            email: req.session.email
        });
        res.status(200)
            .json({
            status: 'success',
            count: data.length,
            message: 'Login successfully',
            data: data
            });
        })
        .catch(function (err) {
        if(username == "")
            {res.status(404).json({ status: 'error', count: 0, message: 'Username kosong' });}
        else if(password == "")
            {res.status(404).json({ status: 'error', count: 0, message: 'Password kosong' });}
        else
            {res.status(404).json({ status: 'error', count: 0, message: 'Akun Tidak Terdaftar' });}
        });
}

const signup = (req, res, next) => {
    console.log('signup')
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
                    .then(userRegis => {
                        res.status(200).json({
                            status: 'success',
                            message: `Registration developer successfully`,
                            data: userRegis
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            status: 'error create',
                            message: 'Registration developer error : '+err
                        });
                    });
            }else{
                res.status(400).json({
                    status: 'error sudah ada',
                    message: `Registration developer error`
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                status: "error findOne",
                message: 'Registration developer error : '+err
            });
        })
}

const edit = (req, res, next) => {
    console.log('edit')
    const developerID = parseInt(req.params.id);
    User.findOne({
            where:{
                id: developerID
            }
        })
        .then(data => {
        res.status(200)
            .json({
            status: 'ok',
            message: 'Retrived Info',
            data: data
            });
        })
        .catch(function (err) {
        next();
        });
}

const update = (req, res, next) => {
    console.log('update')
    const dataUser = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone
    }
    User.findOne({
            where:{
                id: parseInt(req.params.id)
            }
        })
        .then(user => {
            User.update(dataUser)
                .then(user => {
                    req.session.developerId = req.body.id;
                    req.session.developer_name = req.body.developer_name;
                    req.session.email = req.body.email
                    res.status(200).json({
                        status: 'success',
                        message: `Update data developer successfully`,
                        id: req.session.developerId,
                        devName: req.session.developer_name,
                        email: req.session.email
                    });
                    console.log('Update user dalam' + user);
                    res.redirect('/profile');
                })
                .catch(err => {
                    res.status(400).json({
                        status: 'error update',
                        message: 'Update data developer error : '+err
                    });
                });
                console.log('Update dataUser' + dataUser);
        })
        .catch(err => {
            res.status(400).json({
                status:"error findOne",
                message: 'Update developer error : '+err
            });
        })
}

module.exports = {
    checkLogin: checkLogin,
    login: login,
    signup: signup,
    edit: edit,
    update: update
}