    'use strict';

    const express = require('express');
    const server = express();

    require('dotenv').config();
    const cors = require('cors');

    const dataOfWeather = require('./data/weather.json');

    const PORT = process.env.PORT;

    server.use(cors());
    
    server.get('/test',(req,res)=>{ 
            res.send('API Working')
    })

    class theWaether {
        constructor(date,description){
            this.date = date;
            this.description =description;
        }

    }

    server.get('/weather',(req,res)=>{

        try{
            
        let Find = req.query.namecity;

        let Infocity = dataOfWeather.find((val)=>{
            if(val.city_name === Find) {
                return val
            }
            
        });

        let arr = Infocity.data.map(value => {
                return new theWaether(value.datetime, value.weather.description);
                
        });
                res.status(200).send(arr);

            }
            
            catch (err) {
                res.status(404).send("Something wrong");
            }
        });


        server.get('*',(req,res)=>{
            res.status(404).send('Not found')
        })

        server.listen(PORT,()=>{
            console.log(`Listening : PORT ${PORT}`)
        })
