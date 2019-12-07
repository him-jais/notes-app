const Note = require('../models/note')

module.exports.list = (req, res) => {
    Note.find({ user: req.user._id}).populate('categoryId')
    .then((notes) => {
        res.json(notes)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.create = (req, res) => {
    const body = req.body
    const note = new Note(body)
    note.user = req.user._id
    note.save()
    .then((note) => {
        res.json(note)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({ _id: id, user: req.user._id}).populate('categoryId')
    .then((note) => {
        if(note) {
            res.json(note)
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
    const body = req.body
    Note.findOneAndUpdate({ _id: id, user: req.user._id}, body, { new: true, runValidators: true })
    .then((note) => {
        if(note) {
            res.json(note)
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
    Note.findOneAndDelete({_id: id, user: req.user._id})
    .then((note) => {
        if(note) {
            res.json(note)
        } else {
            res.json({})
        }
    })
    .catch((err) => {
        res.json(err)
    })
}



// const Note = require('../models/note')
// const _ =require('lodash')

// module.exports.list = (req, res) => {
//     Note.find({categoryId:req.categoryId._id})
//         .then((notes) => {
//             res.json(notes)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

// module.exports.create = (req, res) => {
//     const  body  = _.pick(req.body,['title','description'])
//     const note = new Note(body)
//     note.categoryId=req.categoryId._id
//     note.save()
//         .then((note) => {
//             res.json(note)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

// module.exports.show = (req, res) => {
//     const id = req.params.id 
//     Note.findOne({_id: id,categoryId:req.categoryId._id})
//         .then((note) => {
//             if(note) { 
//                 res.json(note)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }
   
// module.exports.update = (req, res) => {
//     const id = req.params.id 
//     const  body  = _.pick(req.body,['title','description'])
//     Note.findOneAndUpdate({_id:id,categoryId:req.categoryId._id}, body, { new: true, runValidators: true })
//         .then((note) => {
//             if(note) {
//                 res.json(note)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

// module.exports.destroy = (req, res) => {
//     const id = req.params.id 
//     Note.findOneAndDelete({_id:id,categoryId:req.categoryId._id})
//         .then((note) => {
//             if(note) {
//                 res.json(note)
//             } else {
//                 res.json({})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }