import Token from '../Models/Token.js'
import User from '../Models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../Utils/Error.js'

/*==================
    Verify Email
==================== */
export const emailVerify = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    !user && next(createError(404, 'User Not Found!'))

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })
    !token && next(createError(404, 'Token Not Found!'))

    await User.updateOne({ _id: user.id }, { $set: { verified: true } })
    await token.remove()

    res.status(200).json({ message: 'Email verified successfully!' })
  } catch (error) {
    next(createError(500, error))
  }
}

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT))
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json({ data: updatedUser })
  } catch (err) {
    next(createError(500, 'Internet Connection Fail!'))
  }
}
export const deleteUser = async (req, res, next) => {
  const id = req.params.id
  try {
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: 'User has been deleted!' })
  } catch (err) {
    next(createError(500, 'Internet Connection Fail!'))
  }
}
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id)
    res.status(200).json({ data: user })
  } catch (err) {
    next(createError(500, 'Internet Connection Fail!'))
  }
}
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ data: users })
  } catch (err) {
    next(createError(500, 'Internet Connection Fail!'))
  }
}
