const Router = require("express");
const {createLogger,transports} = require('winston');
const router = Router();

// Listar Registros de peticiones realizadas. 

router.get('/', async (req,res)=>{

    var logFilename = __dirname+"/../logs/log-api.log";
    var logger = createLogger({
        transports: [
            new (transports.File)({
                filename:  logFilename,
                timestamp: true
            })
        ]
    });
    
    var options = {
        from:   new Date - 24 * 60 * 60 * 1000,
        until:  new Date,
        limit:  10,
        start:  0,
        order:  'asc',
        fields: ['message','level','timestamp']
    };
    logger.query(options, function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });


});

module.exports = router;