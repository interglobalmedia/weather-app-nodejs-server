const request = require('request')
const access_token = process.env.ACCESS_TOKEN

const coords = (latitude, longitude, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latitude},${longitude}.json?types=poi&access_token=${access_token}&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services.`, undefined)
        } else if (!body.features.length) {
            callback(
                `Unable to find location coordinates. Try another search!`,
                undefined
            )
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name,
            }
            const { latitude, longitude, place } = data
            callback(undefined, { latitude, longitude, place })
        }
    })
}

module.exports = coords
