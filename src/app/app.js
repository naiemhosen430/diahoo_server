import express from 'express';
import router from './router.js';
import middleware from './middleware.js';


// create app
const app = express();


// app use
app.use(middleware)
app.use(router)



export default app;