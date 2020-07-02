const request = require('request')
require('dotenv').config()
const access_key = process.env.ACCESS_KEY

const nyForecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=New York&units=f`
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
