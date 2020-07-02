const request = require('request')
const env = require('../config/env')
const access_key = process.env.ACCESS_KEY || env.ACCESS_KEY

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${lat},${lon}&type=LatLon&units=f`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services.`, undefined)
        } else if (body.error) {
            callback(`Unable to find location data. Try again!`)
        } else {
            callback(
                undefined,
                `The current weather condition is ${body.current.weather_descriptions}, and ${body.current['temperature']}∘. It feels like ${body.current.feelslike}∘. The humidity is ${body.current.humidity}%.`
            )
        }
    })
}

module.exports = forecast
