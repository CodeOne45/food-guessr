import express from 'express';
import morgan from 'morgan';

import postRoutes from './server/routes/posts.js';

const app = express();

const PORT = process.env.PORT || 8080;


// get all http request
app.use(morgan('tiny'));
app.use('/', postRoutes);



app.listen(PORT, console.log('Server is starting at ${PORT}'));