const Activity = require('../models').Activity;
const EventType = require("../models").EventType;

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

const actsSelect = (req, res, next) => {
    Activity.findAll({
                attributes: ['ProjectId'],
                include: EventType
            })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                })
            })
}

module.exports = {
    showActs:showActs,
    actsSelect:actsSelect
}