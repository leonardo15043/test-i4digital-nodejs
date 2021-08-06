const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
    format: format.combine(format.simple(),format.timestamp()),
    transports:[
        new transports.File({
            maxsize : 5120000,
            maxFiles: 5,
            filename: __dirname+"/../logs/log-api.log",
            format: format.combine(
                format.json()
            )
        }),
        new transports.Console()
    ] 
})