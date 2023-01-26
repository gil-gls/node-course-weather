const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0b1846b19f320085e903c9a5c3d5ae81&units=m&query='+ lat +','+lon

    request({url, json: true}, (error, {body: response}) => {
        
        if(error){
            callback('Unable to connect weather services', undefined)
        }
        else if(response.error){
            callback('cannot find weather location. Please try another', undefined)
        }
        else{
            const desc = response.current.weather_descriptions[0]
            const temp = response.current.temperature
            const feelsLike = response.current.feelslike
            const humidity = response.current.humidity

            callback(undefined, {desc, temp, feelsLike, humidity})
        }
    })
}

module.exports = forecast 