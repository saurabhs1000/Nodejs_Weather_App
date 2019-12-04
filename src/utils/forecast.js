const request = require('request')
const forecast =(latitude,longitude,callback) =>{
    const url ='https://api.darksky.net/forecast/7bc9c42f789c31c71e52a05a3ee8bd2c/'+latitude+','+ longitude +'?units=si'
    request({url:url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to Weather Services.',undefined)
        } else if(response.body.error){
            callback('Unable to find location. Try another Search', undefined)
        } else { callback(undefined, response.body.daily.data[0].summary+' It is currently '+ response.body.currently.temperature +' Degrees out .There is a '+response.body.currently.precipProbability +' % of a rain')
                            
                }
    
    })

}


module.exports = forecast