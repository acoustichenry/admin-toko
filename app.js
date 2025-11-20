const express = require('express')
const app = express()
const path = require('path')


const address = '0.0.0.0'
const port = 2727
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Static folder (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; connect-src 'self' http://localhost:2727 http://localhost:3000 ws://localhost:3000 https://cdn.jsdelivr.net; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data:;"
    );
    next();
  });
  


//routes view
const indexRoute = require('./routes/index');
const productViewRoute = require('./routes/productView');
const purchasingViewRoute = require('./routes/purchasingView')

app.use('/', indexRoute);
app.use('/products', productViewRoute);
app.use('/purchasing', purchasingViewRoute)


//route api
const productsRouter = require('./routes/products')
const purchasingRouter = require('./routes/purchasing')

app.get('/api/v1', (req, res) => {
    res.send({
        message: 'admin toko express api 0.1',
    })
})

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/purchasing', purchasingRouter);



app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), address, function () {
    console.log(`Express server ${server.address().address} listening on port ${server.address().port}`);
});