const bodyParser = require('body-parser')
const cors = require('cors')

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors(corsOptions))
}