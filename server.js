const path = require('path')
const express = require('express')
const hbs = require('hbs')
const env = require('./config/env')
const app = express()
const port = env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// set up static directory to serve
const publicDirectoryPath = path.join(__dirname, 'public')
// set up view engine directory
const viewsPath = path.join(__dirname, 'templates')
const partialsPath = path.join(__dirname, 'templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// define path for Express config
app.use(express.static(publicDirectoryPath))
//home page route
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Weather',
        name: 'Maria D. Campbell',
        message: 'Get your weather updates here!',
    })
})
// about route
app.get('/about', (req, res) => [
    res.render('pages/about', {
        title: 'About me',
        name: 'Maria D Campbell',
    }),
])
// help route
app.get('/help', (req, res) => {
    res.render('pages/help', {
        title: 'Help',
        name: 'Maria D. Campbell',
        message:
            'For help with accessing the weather, please email Maria at interglobalmedia@gmail.com.',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!',
        })
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                })
            })
        }
    )
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.',
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('pages/404', {
        title: '404',
        name: 'Maria D. Campbell',
        errorMessage: 'Help article not found. Try again.',
    })
})

app.get('*', (req, res) => {
    res.render('pages/404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Maria D. Campbell',
    })
})

app.listen(port, () => {
    console.log(`Server is up on Port 3000...`)
})
