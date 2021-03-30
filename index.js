const express  =  require('express');
const morgan = require('morgan');

import postRoutes from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 8080;

// get all http request
app.use(morgan('tiny'));
app.use('/posts', postRoutes);

app.listen(PORT, console.log('Server is starting at ${PORT}'));