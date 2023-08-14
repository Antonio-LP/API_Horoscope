import express from 'express';
import router from './api/routes.js';
const app = express();

//Settings
app.set("port", process.env.port || 3000)

//Middlewars
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//Routes
app.use(router)

//Static

export default app

