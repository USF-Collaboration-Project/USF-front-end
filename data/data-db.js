const mongoose = require('mongoose')
assert = require('assert')

const url = 'mongodb://localhost/data-db'
mongoose.Promise = global.Promise
mongoose.connect(
    "mongodb://localhost/data-db", {
        useNewUrlParser: true
    },
    function (err, db) {
        assert.equal(null, err)
        console.log('connected successfully to data-db')
    }
)

mongoose.connection.on('error', console.error.bind(console, "MongoDB connection Error:"))
mongoose.set('debug', true)

module.exports = mongoose.connection