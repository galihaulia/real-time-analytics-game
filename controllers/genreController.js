const Genre = require("../models").Genre;

const createGenre = (req, res, next) => {
    const dataCreateGenre = {
        genre_name: req.body.genre_name
    }
    Genre
    .create(dataCreateGenre)
    .then(data => {
        res.json({
            success: true,
            message: 'dataCreateGenre Genre successfully',
            dataCreateGenre: data
        });
    })
    .catch(err => {
        res.json({
            error: true,
            message: `error dataCreateGenre Genre : ` + err
        });
    });
}

const showAllGenre = (req, res, next) => {
    Genre
    .findAll()
    .then(data => {
        console.log({
            success: true,
            message: 'findAll successfully',
            showAllGenre: data
        });
        res.showAllGenre = data;
        console.log({
            success: true,
            message: 'res successfull',
            showAllGenre: res.showAllGenre
        });
        next();
    })
}

module.exports = {
    createGenre: createGenre,
    showAllGenre: showAllGenre
}