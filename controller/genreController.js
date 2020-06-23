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

const showGenre = (req, res, next) => {
    Genre.findAll()
            .then(data => {
                console.log({
                    status: 'success',
                    message: `findAll successfully`,
                    dataAllGenre: data
                });
                res.dataAllGenre = data;
                console.log({
                    status: 'success',
                    message: `res successfully`,
                    dataAllGenre: res.dataAllGenre
                });
                next();
            })
}
module.exports = {
    create: create,
    showGenre: showGenre
}