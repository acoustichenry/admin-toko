

const express = require('express')
const app = express()
const address = '0.0.0.0'
const port = 2727

require('dotenv').config();

const cors = require('cors')

app.use(cors())

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({
        message: 'vue express api 1.0',
    }
    )
})


app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), address, function () {
    console.log(`Express server ${server.address().address} listening on port ${server.address().port}`);
});