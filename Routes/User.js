import express from 'express'
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  emailVerify,
} from '../controllers/User.js'
import { verifyAdmin, verifyUser } from '../Utils/VerifyToken.js'

const router = express.Router()

//Verify Email
router.get('/:id/verify/:token', emailVerify)

//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete('/:id', verifyAdmin, deleteUser)

//GET
router.get('/:id', verifyUser, getUser)

//GET ALL
router.get('/', verifyUser, getUsers)

export default router
