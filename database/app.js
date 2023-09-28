const express = require ('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = 3333

app.use(bodyParser.json())
app.use(cors())

//connect db
mongoose.connect('mongodb+srv://dracnguyenbku:nguyen@cluster0.ojexehw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to database'))
 .catch(error => console.error('Connection error:', error));

 app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
 })

//setup route
const roomRoute = require('./routes/roomRoute')
//localhost:3333/api/routes
app.use('/api/',roomRoute)

const renterRoute = require('./routes/renterRoute')
app.use('/api/',renterRoute)

const serviceRoute = require('./routes/serviceRoute')
app.use('/api/',serviceRoute)