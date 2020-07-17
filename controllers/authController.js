const Developer = require('../models').Developer;

const checkLogin = (req, res, next) => {
    if (req.session && req.session.developerId   ) {
        res.session_info = req.session;
        console.log(res.session_info);
        return next();
    }
    else {
        res.redirect('/cloud/login');
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
    const dataDeveloper = {
        username: req.body.username,
        password: req.body.password
    }

    Developer
    .findOne({
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
    .catch(err => {
    if(username == "")
        {res.status(404).json({ status: 'error', count: 0, message: 'Username kosong' });}
    else if(password == "")
        {res.status(404).json({ status: 'error', count: 0, message: 'Password kosong' });}
    else
        {res.status(404).json({ status: 'error', count: 0, message: 'Akun Tidak Terdaftar' });}
    });
}

const signup = (req, res, next) => {
    
    const dataDeveloper = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }
    
    Developer
    .findOne({
        where: {
            email: req.body.email
        }
    })
    .then(data => {
        if(!data){
            Developer
            .create(dataDeveloper)
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
            error: "error findOne",
            message: 'Registration developer error : '+err
        });
    })
}

const edit = (req, res, next) => {

    const developerId = parseInt(req.params.id);

    Developer
    .findOne({
        where:{
            id: developerId
        }
    })
    .then(data => {
        console.log({
            success: true,
            message: 'findOne edit success',
            data: data
        });
        res.status(200).json({
            success: true,
            message: 'findOne edit success',
            data: data
        });
    })
    .catch(err => {
        console.log({
            error: true,
            message: 'Edit findOne error : '+ err,
        });
        res.status(200).json({
            error: true,
            message: 'Edit findOne error : '+ err,
            });
    });
}

const update = (req, res, next) => {

    const dataDeveloper = {
        developer_name: req.body.developer_name,
        email: req.body.email,
        username: req.body.username,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone
    }
    const where = {
        id: req.body.developerId
    }

    Developer
    .update(dataDeveloper, where)
    .then(data => {
        req.session.developerId = req.body.id;
        req.session.developer_name = req.body.developer_name;
        req.session.email = req.body.email
        console.log({
            success: true,
            message: 'Update data developer success',
            data: data,
            id: req.session.developerId,
            devName: req.session.developer_name,
            email: req.session.email
        });
        res.redirect('cloud/profile');
    })
    .catch(err => {
        res.status(400).json({
            error: true,
            message: 'Update data developer error : '+err
        });
    })
}

const logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/cloud/login');
            }
        });
    }else {
        res.redirect('/cloud/login');
    }
}

module.exports = {
    checkLogin: checkLogin,
    login: login,
    signup: signup,
    edit: edit,
    update: update,
    logout: logout
}