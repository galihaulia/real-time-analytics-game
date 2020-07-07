const Genre = require("../models").Genre;

const create = (req, res, next) => {
    const dataCreate = {
        genre_name: req.body.genre_name
    }
    Genre
    .create(dataCreate)
    .then(data => {
        res.json({
            success: true,
            message: 'dataCreate Genre successfully',
            dataCreate: data
        });
    })
    .catch(err => {
        res.json({
            error: true,
            message: `error dataCreate Genre : ` + err
        });
    });
}

const showGenre = (req, res, next) => {
    Genre
    .findAll()
    .then(data => {
        console.log({
            success: true,
            message: 'findAll successfully',
            dataAllGenre: data
        });
        res.dataAllGenre = data;
        console.log({
            success: true,
            message: 'res successfull',
            dataAllGenre: res.dataAllGenre
        });
        next();
    })
}
module.exports = {
    create: create,
    showGenre: showGenre
}