const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const publicDirectorypath = path.join(__dirname,'public')
const viewspath = path.join(__dirname, 'templates/views')
const partialspath = path.join(__dirname, 'templates/partials')
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(publicDirectorypath))
app.get('',(req,res) => {
   res.render('index',{
   title:'Weather',
   name:'venkat sai'
   })
})
app.get('/about', (req, res) =>  {
res.render('about',{
title:'About Me',
name:'venkat sai'

})
})
app.get('/help',(req,res) => {
   res.render('help',{
helpText:'This is some helpful text.',
title : 'Help',
name: 'venkat sai'
})
})
app.get('/Weather', (req,res) => {
   if(!req.query.address) {
return res.send({
   error: 'you must provide an address!'
})
   }
   geocode(req.query.address, (error,{ latitude,longitude,location }= {}) => {
    if (error) {
     return res.send({error})  
    }

    forecast(latitude,longitude,(error,forecastData) => {
if (error) {
   return res.send({error})
}
res.send({ 
   forecast:forecastData,
   location,
   address:req.query.address
})
    })
   })
   
})
app.get('/products',(req, res) => {
   if (!req.query.search) {
 return res.send({  
 error: 'you must provide a serach term'  
   })
}
   console.log(req.query.search)
   res.send({
products:[]
   })
})
app.get('/help/*',(req,res) => {
   res.render('404', {
    title:'404',
    name:'venkat sai',
    errorMessage:'Help article not found'  
   })

})
app.get('*',  (req,res) => {
res.render('404',{
title:'404',
name:'venkat sai',  
errorMessage:'page not found.' 
})
})

app.listen(3000, () => {
console.log('Server is up on port 3000.')
})