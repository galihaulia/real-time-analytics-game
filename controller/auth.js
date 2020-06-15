const Developer = require('../models').Developer;

const checkLogin = (req, res, next) => {
    if (req.session && req.session.developerId   ) {
        res.session_info = req.session;
        console.log(res.session_info);
        return next();
    }
    else {
        res.redirect('/login');
        // res.session_info = {
        // cookie:
        //     { path: '/',
        //     _expires: null,
        //     originalMaxAge: null,
        //     httpOnly: true },
        // developerId: 1,
        // developer_name: 'AAA',
        // email: 'galihalhakim15@gmail.com' };
        // return next();
    }
}

const login = (req, res, next) => {
    console.log('login')
    const dataDeveloper = {
        username: req.body.username,
        password: req.body.password
    }
    Developer.findOne({
                where: {
                    username: dataDeveloper.username
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
    const dataDeveloper = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }
    Developer.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(data => {
                if(!data){
                    Developer.create(dataDeveloper)
                            .then(data => {
                                res.status(200).json({
                                    status: 'success',
                                    message: `Registration developer successfully`,
                                    data: data
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
    const developerId = parseInt(req.params.id);
    Developer.findOne({
                where:{
                    id: developerId
                }
            })
            .then(data => {
                console.log({
                    status: 'ok',
                    message: 'Retrived Info',
                    data: data
                });
                res.status(200).json({
                    status: 'ok',
                    message: 'Retrived Info',
                    data: data
                    });
            })
            .catch(err => {
                console.log({
                    status: 'error',
                    message: 'error Retrived Info : '+ err,
                });
                res.status(200).json({
                    status: 'error',
                    message: 'error Retrived Info : '+ err,
                    });
            });
    }

const update = (req, res, next) => {
    console.log('update')
    const dataDeveloper = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone
    }
    Developer.findOne({
                where:{
                    id: req.body.developerId
                }
            })
            .then(data => {
                Developer.update(dataDeveloper)
                        .then(data => {
                            req.session.developerId = req.body.id;
                            req.session.developer_name = req.body.developer_name;
                            req.session.email = req.body.email
                            console.log({
                                status: 'success',
                                message: `Update data developer successfully`,
                                data: data,
                                id: req.session.developerId,
                                devName: req.session.developer_name,
                                email: req.session.email
                            });
                            res.redirect('/profile');
                        })
                        .catch(err => {
                            res.status(400).json({
                                status: 'error update',
                                message: 'Update data developer error : '+err
                            });
                        });
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