const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiZ2lsZ2xzIiwiYSI6ImNsZDkybXRxaDAxZ3czcXMxMmhoeHRrcGoifQ.ctzkC-3_WKpULKl9R3iNxQ'

    request({url, json: true}, (error, {body: response}) => {
        if(error){
            callback('Unable to connect location services', undefined)
        }
        else if(response.features.length === 0){
            callback('Cannot find location. Try another search', undefined)
        }
        else{
            const center = response.features[0].center
            callback(undefined, {lat: center[1], lon: center[0], location: response.features[0].place_name})
        }
    })
}

module.exports = geoCode 