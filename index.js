const express = require('express')
const consign = require('consign')
const db = require('./config/db')
const cors = require('cors')
const app = express()

app.use(cors())
app.db = db

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Header",
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET ')
        return res.status(200).send({})
    }
    app.use(cors())
    next()
})

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(process.env.PORT || 3001, () => {
    console.log('Backend executando...')
})