const EventType = require("../models").EventType;
const Project = require("../models").Project;

const create = (req, res, next) => {
    const dataCreate = {
        event_type_name: req.body.event_type_name
    }
    EventType.create(dataCreate)
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

const showEvent = (req, res, next) => {
    EventType.findAll()
                .then(data => {
                    console.log({
                        status: 'success',
                        message: `ProjectShow findAll successfully`,
                        dataAllEventType: data
                    });
                    res.dataAllEventType = data;
                    console.log({
                        status: 'success',
                        message: `res.dataAllEventType successfully`,
                        dataAllEventType_res_dataAllEventType: res.dataAllEventType
                    });
                    next()
                })
}

module.exports = {
    create: create,
    showEvent:showEvent
}