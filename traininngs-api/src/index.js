require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express();
const login = require('./login/login');
const users = require('./users/users');
const signup = require('./signup/signup');
const webinars = require('./webinars/webinars');
const cart = require('./cart/cart');
const payment = require('./payment/payment');
const orders = require('./orders/orders');
const category = require('./category/category');
const webinarTypes = require('./webinar-types/webinar-types');
const getTokenDetails = require('./get-token-details/get-token-details.js');
const speakers = require('./speakers/speakers');
const email = require('./email/email');
const orderUpdate = require('./order-update/order-update');

app.use(express.json({limit: '50mb'}));
app.use(express.static(process.cwd()+'/src/dist/app'));

app.use(cors());
app.use('/api/login', login);
app.use('/api/users', users);
app.use('/api/signup', signup);
app.use('/api/webinars', webinars);
app.use('/api/cart', cart);
app.use('/api/payment', payment);
app.use('/api/orders', orders);
app.use('/api/gettokendetails', getTokenDetails);
app.use('/api/category', category);
app.use('/api/webinarTypes', webinarTypes);
app.use('/api/speakers', speakers);
app.use('/api/email', email);
app.use('/api/orderUpdate', orderUpdate);

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+'/src/dist/app/index.html')
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.listen(3000);

module.exports = app