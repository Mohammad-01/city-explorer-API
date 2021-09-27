'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const server = express();
const PORT = process.env.PORT;
server.use(cors());

//import
const getMovies = require('./modules/movies.js')
const getWeather = require('./modules/allweather.js')

// Routes
server.get('/getapiweather', getWeather);
server.get('/getapimovies', getMovies);
server.get('/test', testAPIRouteHandler);
server.get('*', routeFoundHandler);

// localhost:3005/ANYTHING
function routeFoundHandler(req, res) {
    res.status(404).send('NOT FOUND')
}

//for test
function testAPIRouteHandler(req,res){ 
    res.send( 'api is working')
}
server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

