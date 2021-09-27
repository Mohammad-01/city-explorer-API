const axios = require('axios');
let cacheMemory = {};

class Waether {
    constructor(element) {
        this.date = element.datetime;
        this.description = element.weather.description;
    }
}
//http://localhost:3005/getapiweather?city=Amman
function getWeather(req, res) {
    let weatherInfo = req.query.city;

    let reqweatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherInfo}&key=${process.env.WEATHER_API_KEY}`
    console.log('For test req' + reqweatherUrl);
    if (cacheMemory[weatherInfo] !== undefined) {
        res.send(cacheMemory[weatherInfo]);
    }
    else {
        try {
            axios.get(reqweatherUrl).then(weatherResults => {
                let newArray = weatherResults.data.data.map(element => {
                    return new Waether(element)
                });
                cacheMemory[weatherInfo] = newArray;
                res.send(newArray)

            });
        }
        catch (error) {
            res.send(error);
        }
    }
}

module.exports = getWeather;