const Genre = require("../models").Genre;

const create = (req, res, next) => {
    const dataCreate = {
        genre_name: req.body.genre_name
    }
    Genre.create(dataCreate)
            .then(data => {
                res.json({
                    status: 'success',
                    message: `dataCreate Genre successfully`,
                    dataCreate: data
                });
            })
            .catch(function (err) {
                res.json({
                    status: 'error',
                    message: `error dataCreate Genre : ` + err
                });
            });
}

module.exports = {
    create: create
}