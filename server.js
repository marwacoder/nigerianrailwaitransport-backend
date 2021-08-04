const express = require('express');
const path = require('path');
const cors = require('cors')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const models = require('./models/');


const adminRoute = require('./routes/administrator');
const authRoute = require('./routes/auth');
const trainRoute = require('./routes/train')
const passengerRoute = require('./routes/passenger');
const paymentRoute = require('./routes/payment');




const app = express();
app.use(cors())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoute);
app.use('/auth', authRoute);
app.use('/trains', trainRoute);
app.use('/passenger', passengerRoute);
app.use('/payments', paymentRoute);
//app.use('/tickets', ticketRoute);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, ')
        return res.status(200).json({});
    }
    next();
})


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); 
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

models.sequelize
  .authenticate()
  .then( ()=> {
    console.log('Connection successful');
  })
  .catch((error)=> {
    console.log("Error creating connection:", error);
  });

module.exports = app;
