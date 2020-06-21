const Activity = require('../models').Activity;

const showActs = (req, res, next) => {
    Activity.findAll()
            .then(Acts => {
                res.json({
                    success: true,
                    Acts: Acts
                })
                console.log({
                    status: 'succes',
                    message: 'showActs find',
                    data: Acts
                  });
            })
}

module.exports = {
    showActs:showActs
}