const Activity = require('../models').Activity;
const EventType = require('../models').EventType;

const showActs = (req, res, next) => {
    Activity
    .findAll()
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
    Activity
    .findAll({
        where: {
            ProjectId: req.params.idProject
        }
    })
    .then(data => {
        var objLabels = data.reduce((arr, item) => {
            const removed = arr.filter(i => i.object_name !== item.object_name)
            return [...removed, item]
        }, [])

        var labels = []
        for(const label of objLabels){
            labels.push(label.object_name)
        }
    
        var result = {};
        data.forEach(function(item){
            result[item.object_name] ? result[item.object_name]++ :  result[item.object_name] = 1;
        })

        let count = []
        for(temp of Object.values(result)){
            count.push(temp)
        }

        res.json({
            success: true,
            labels: labels,
            count: count
        })
    })
}

module.exports = {
    showActs:showActs,
    actsSelect:actsSelect
}