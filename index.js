const express = require('express');
const adminroutes = require('./routes/adminRoutes');
const clientroutes = require('./routes/clientRoutes');
const path = require('path');
const ejs = require('ejs');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');




const bodyParser = require('body-parser');
app.use(cookieParser());
const mongoose = require('mongoose');



// connection to database
mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(()=> console.log("Mongodb is connected"))
  .catch((err) =>console.log("Mongo error", err));


// Configure session middleware
app.use(
  session({
    secret: 'rajeshgupta@hcl.com',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Change to true if using HTTPS
  })
);



// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// routes for the admin side use 
// app.use('/', adminroutes);



// routes for client side use
app.use('/', clientroutes);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


