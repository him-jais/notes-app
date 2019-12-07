const express = require('express')
const router = express.Router()
const categoriesController = require('../app/controllers/categoriesController')
const userController= require('../app/controllers/userController')
const authenticateUser=require('../app/middlewares/authentication')
const notesController=require('../app/controllers/notesController')

router.get('/categories', authenticateUser,categoriesController.list)
router.post('/categories',authenticateUser, categoriesController.create)
router.get('/categories/:id',authenticateUser, categoriesController.show)
router.put('/categories/:id',authenticateUser,categoriesController.update)
router.delete('/categories/:id',authenticateUser, categoriesController.destroy)
      
router.get('/notes', authenticateUser,notesController.list)
router.post('/notes',authenticateUser, notesController.create)
router.get('/notes/:id',authenticateUser, notesController.show)
router.put('/notes/:id',authenticateUser,notesController.update)
router.delete('/notes/:id',authenticateUser, notesController.destroy)

router.post('/users/register',userController.register)
router.post('/users/login',userController.login)
router.get('/users/account', authenticateUser,userController.account)
router.delete('/users/logout', authenticateUser,userController.logout)

module.exports = router