const express = require('express')
const app = express()
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

// const { getAllUsers } = require('./userController');
// app.get('/users', getAllUsers);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config()     
const port = process.env.PORT || 3000;

// Kết nối đến cơ sở dữ liệu
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to database'))
 .catch(error => console.error('Connection error:', error));

// app.set('views', './views')
// app.set('view engine', 'ejs')

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})