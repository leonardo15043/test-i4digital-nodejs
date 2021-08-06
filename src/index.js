const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./utils/logger");
const config = require('./config.js');

app.set('port', config.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use("/api/users/",require('./routes/users'));
app.use("/api/posts/",require('./routes/posts'));
app.use("/api/logs/",require('./routes/logs'));

app.listen(app.get('port'),()=>{
    logger.info("Server Running");
});

