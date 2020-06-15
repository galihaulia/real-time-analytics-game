const eventType = require("../models").EventType;

const create = (req, res, next) => {
    const dataCreate = {
        event_type_name: req.body.event_type_name
    }
    eventType.create(dataCreate)
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