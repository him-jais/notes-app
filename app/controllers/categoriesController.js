const Category = require('../models/category')

const _ =require('lodash')


module.exports.list = (req, res) => {
    Category.find({user:req.user._id})
        .then((categorys) => {
            res.json(categorys)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const  body  = _.pick(req.body,['name'])
    const category = new Category(body)
    category.user=req.user._id
    category.save()
        .then((category) => {
            res.json(category)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id 
    Category.findOne({_id: id,user:req.user._id})
        .then((category) => {
            if(category) { 
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
   
module.exports.update = (req, res) => {
    const id = req.params.id 
    const  body  = _.pick(req.body,['name'])
    Category.findOneAndUpdate({_id:id,user:req.user._id}, body, { new: true, runValidators: true })
        .then((category) => {
            if(category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id 
    Category.findOneAndDelete({_id:id,user:req.user._id})
        .then((category) => {
            if(category) {
                res.json(category)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}