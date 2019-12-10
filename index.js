const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()

require('./data/data-db')

//middleware
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reddit-clone')
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/search', (req, res) => {
    res.render('search')
})

app.get('/team', (req, res) => {
    res.render('team')
})

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost.27017/usf"
mongoose.connect(mongoUri, { useNewUrlParser: true })

app.listen(port, () => { console.log('app listening on port 3000') })

module.exports = app