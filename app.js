

const express = require('express')
const app = express()

const productsRouter = require('./routes/products')
const purchasingRouter = require('./routes/purchasing')

const address = '0.0.0.0'
const port = 2727
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send({
        message: 'admin toko express api 1.0',
    })
})

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/purchasing', purchasingRouter);



app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), address, function () {
    console.log(`Express server ${server.address().address} listening on port ${server.address().port}`);
});