const moment = require('moment');

function formatMessage(id, text) {
    return {
        id,
        text,
        time: moment().format('h:m a')
    }
}

module.exports = formatMessage;