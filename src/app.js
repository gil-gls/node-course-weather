const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gil Eyni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'Gil Eyni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gil Eyni',
        helpText: 'This is helpfule text...'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address

    geoCode(address, (error, {lat, lon, location} = {}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(lat, lon, (error, {desc, temp, feelsLike, humidity} = {}) => {
            if(error){
                return res.send({error})
            }

            res.send({
                address,
                forecast: desc + '. Temp is: ' + temp + ' and feels like ' + feelsLike + '. Humidity: ' + humidity,
                location
            })
        })
            
    })
})

app.get('/products', (req, res) => {
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

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gil Eyni',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Gil Eyni',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})