const express= require('express')
const mongoose=require('mongoose')
const app=express()
const port=3013


app.use(express.json())

mongoose.connect('mongodb://localhost:27017/july-notes-app',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log(err) 
})


const Schema = mongoose.Schema
const categorySchema =new Schema({
    name:{
        type: String
    }
})


const Category = mongoose.model('Category',categorySchema)

app.get('/',(req,res)=>{
    res.send('welcome to the notes app')
})
app.get('/create', (req,res)=>{
    Category.find()
    .then((creates)=>{
        res.json(creates)
    })
    .catch((err)=>{
        res.json(err)
    })
})

app.post('/create',(req,res)=>{
    const body = req.body
    const note = new Category({name:body.name}) 
    note.save()
     .then((note)=>{
         res.json(note)
     })
     .catch((err)=>{
         res.json(err)
     })
})

app.listen(port,()=>{
    console.log('listening on port',port)
})