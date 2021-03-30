const express  =  require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

// get all http request
app.use(morgan('tiny'));

app.listen(PORT, console.log('Server is starting at ${PORT}'));