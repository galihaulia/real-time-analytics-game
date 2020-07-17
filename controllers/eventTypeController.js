const EventType = require("../models").EventType;
const Project = require("../models").Project;

const createEvent = (req, res, next) => {

    const dataCreateEvent = {
        event_type_name: req.body.event_type_name
    }

    EventType
    .create(dataCreateEvent)
    .then(data => {
        res.json({
            success: true,
            message: 'createEvent EventType successfully',
            createEvent: data
        });
    })
    .catch(err => {
        res.json({
            error: true,
            message: 'createEvent EventType error : ' +err
        });
    });
}

const showAllEvent = (req, res, next) => {
    EventType
    .findAll()
    .then(data => {
        console.log({
            success: true,
            message: 'showAllEvent findAll successfully',
            showAllEvent: data
        });
        res.showAllEvent = data;
        console.log({
            success: true,
            message: 'res.showAllEvent successfully',
            showAllEvent_res_showAllEvent: res.showAllEvent
        });
        next()
    })
}

module.exports = {
    createEvent: createEvent,
    showAllEvent:showAllEvent
}