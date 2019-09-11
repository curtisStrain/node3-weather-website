const request = require('request')

const forecast = (lat, long, callback) => {
    const queryParms = '?units=us'
    const url = `https://api.darksky.net/forecast/a3c3dccee80e99e43718fa2f9af93d9c/${lat}, ${long}${queryParms}`

    request({ url, json: true }, (error, { body }) => {  //destructuring body from the reponse
        if (error) {
            callback('Unable to connect to forecast services!', undefined)   //if undefined not stated here, it's implicit, like below
        } else if (body.error) {
            callback(body.error + ' - Unable to find location')
        } else {
            callback(undefined, `${body.daily.data[0].summary}, It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast