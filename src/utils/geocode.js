const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2F1cmFiaHMxMDAwIiwiYSI6ImNrM28wMWxtdjAzc3YzaG11YmN0ZzQ1b3YifQ.0rLykHpOe11iXAOReb4UfA'

    request({url:url,json:true},(error,response) =>{
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location. Try another Search', undefined)
        } else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }

    })
}
module.exports = geocode