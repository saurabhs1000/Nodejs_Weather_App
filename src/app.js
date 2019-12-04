const express = require('express')
const path = require('path')
const hbs =require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const publicDirectoryPath =path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))
const partialpath =path.join(__dirname,'../templates/partials')

const viewpath = path.join(__dirname,'../templates/views')
app.set('views',viewpath)
app.set('view engine','hbs')
hbs.registerPartials(partialpath)

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        body: 'weather app page',
        name: 'Saurabh Singh'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Saurabh Singh'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        text:'this is some helpful text',
        title:'Help',
        name:'Saurabh Singh'
        
    })
})

 app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide a address term'
        })
    }
    geocode(req.query.address,(error,{ latitude,longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
    
    

 })  
app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) =>{
    res.send('Help article not found')
})
app.get('*',(req,res) =>{
    res.render('404',{
        text:'404',
        errormessage:' this page does not exists',
        name:'Saurabh Singh'
    })
})
app.listen(3000,() =>{
    console.log('server is up on the port 3000.')
})
