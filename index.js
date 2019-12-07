const express = require('express')
const connectDB= require('./config/database')
const router = require('./config/routes')
const cors= require('cors')
const app= express()
const port =3015
app.use(express.json())

connectDB() 
app.use(cors())
app.use(express.json())
app.use('/',router)
app.listen(port,()=>{
    console.log('listenig on port', port)
})