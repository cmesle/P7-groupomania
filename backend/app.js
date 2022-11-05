const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const env = require('dotenv').config()
const path = require('path')

const app = express()
// security module for Express
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })) /* allows the images to be processed as wanted */

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

// connection to the database
mongoose.connect(`mongodb+srv://${process.env.DB_OWNER_ID}:${process.env.DB_OWNER_PW}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

// setting headers to allow access from the frontend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Cache-Control');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cache-Control', 'private,no-cache,must-revalidate')
    next();
});

app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))
module.exports = app
