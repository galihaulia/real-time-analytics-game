const EventType = require("../models").EventType;
const Project = require("../models").Project;

const create = (req, res, next) => {

    const dataCreate = {
        event_type_name: req.body.event_type_name
    }

    EventType
    .create(dataCreate)
    .then(data => {
        res.json({
            success: true,
            message: 'dataCreate EventType successfully',
            dataCreate: data
        });
    })
    .catch(err => {
        res.json({
            error: true,
            message: 'dataCreate EventType error : ' +err
        });
    });
}

const showEvent = (req, res, next) => {
    EventType
    .findAll()
    .then(data => {
        console.log({
            success: true,
            message: 'ProjectShow findAll successfully',
            dataAllEventType: data
        });
        res.dataAllEventType = data;
        console.log({
            success: true,
            message: 'res.dataAllEventType successfully',
            dataAllEventType_res_dataAllEventType: res.dataAllEventType
        });
        next()
    })
}

module.exports = {
    create: create,
    showEvent:showEvent
}