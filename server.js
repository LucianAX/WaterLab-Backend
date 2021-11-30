const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('errorhandler');

const apiRouter = require('./api/api.js');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler());


const PORT = process.env.PORT || 4000; //optionally set port to process.env.PORT value if it exists, for testing purposes

app.use('/api', apiRouter);

// app.use(express.static('public')); //serves index.html on PORT if accessed in browser 

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app; //for use in a potential test file