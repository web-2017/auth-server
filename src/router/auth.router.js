import express from 'express'
const router = express.Router()

import isAuth from '../middleware/auth.user.middleware.js'

import { signUp, protectedVerification, signIn, resetPassword, setNewPassword } from '../controllers/auth.controller.js'

router
    .get('/protected', isAuth, protectedVerification)
    .post('/auth/signup', signUp)
    .post('/auth/login', signIn)
    .post('/auth/reset-password', resetPassword)
    .post('/auth/new-password', setNewPassword)

export default router
