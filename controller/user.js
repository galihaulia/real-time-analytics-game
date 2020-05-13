const User = require('../models').User

const dashboard = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        User.findOne({where: { id: parseInt(req.params.id) }})
            .then(User => {
                res.render('dashboard', {layout: 'layout_AdminPanel', User: User})
            })
            .catch(err => console.error(err))
    }
    else {
        res.redirect('/login');
    }
  }

module.exports = {
    dashboard: dashboard
  }