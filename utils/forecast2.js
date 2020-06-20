const request = require('request')
const env = require('../config/env')

const nyForecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${env.ACCESS_KEY}&query=New York&units=f`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services.`, undefined)
        } else if (body.error) {
            callback(
                `Unable to find location coordinates. Try another search!`,
                undefined
            )
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions} and ${body.current['temperature']}∘. It feels like ${body.current.feelslike}∘. The humidity is ${body.current.humidity}%. The city location is latitude ${body.location.lat} and longitude ${body.location.lon}. The current city is ${body.location.name}.`
            )
        }
    })
}
module.exports = nyForecast
