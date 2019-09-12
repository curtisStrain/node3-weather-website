const path = require('path')
const express = require('express')  //express is a function
const hbs = require('hbs')  // needed for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()   //express is a function
const port = process.env.PORT || 3000        //PORT only provided by Heroku.  defaults to 3000 outside of heroku

// Define paths for Express config
const pubDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')  //sets hbs/handlebars as templating engine
app.set('views', viewsPath)    // use this path for view engine files.  optional, hbs uses views if not set
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirectoryPath))                              //use customizes server. static sets dir for static resources

// app.get('', (req, res) => {    //when user tries to get something, routes, at a certain URL
//     res.send('<h1>Hello Express</h1>')   //send response back 
// })

// app.get('/help', (req, res) => {

//     res.send({             //auto turns an object, array into JSON
//         name: 'Curt',
//         age: 48
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Our Weather App</h1>')

// })

app.get('/weather', (req, res) => {
    if (!req.query.addr) {
        return res.send({
            error: 'No address submitted'
        })
    }

    geocode(req.query.addr, (error, { lat, long, location } = {}) => {     //destructuring lat, long, loc from object passed into arrow, default in case no obj returned (bad search)
        if (error) {
            return res.send({ error })  //same as error: error
        }

        forecast(lat, long, (error, dataForecast) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                addr: req.query.addr,
                location,                             // converted to JSON on response
                forecast: dataForecast
            })
        })
    })
})

app.get('', (req, res) => {
    res.render('index', {                   //1st arg needs to match hbs view
        title: 'Weather App',
        name: 'Curtis Strain'
    })
})

app.get('/products', (req, res) => {
    //console.log(req.query.key)                              //contains req.query string info
    if (!req.query.search) {
        return res.send({
            error: 'no search term provided'
        })
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {                   //1st arg needs to match hbs view
        title: 'About Me',
        name: 'Curtis Strain'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {                   //1st arg needs to match hbs view
        helpText: 'Helpful text',
        title: 'Help',
        name: 'Curtis Strain'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        name: 'Curtis Strain',
        title: 'Missing Help Article',
        errMsg: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {        //match any that hasn't matched so far, must come last
    res.render('404page', {
        name: 'Curtis Strain',
        title: 'Missing Page',
        errMsg: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})  //starts up server to listen on 3000