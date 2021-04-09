const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=be4a36d083f898ef1c59818dc56f01ed&query='+ latitude + ', ' + longitude + '&units=f'    

request({url, json:true} ,(error ,{ body }) => {
if (error) {
callback('unable to connect to weather service!',undefined)    

} else if (body.error) {
callback('unable to find location',undefined)
} else {
callback(undefined,body.current.weather_descriptions[0] +' . it is currently '+ body.current.temperature+'degrees out.it feels like'+ body.current.feelslike + ' degreesout.')
}

})
}
module.exports = forecast