import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

import dbConnection from './src/config/dbConnect.js'
import { logger } from './src/middleware/logger.js'
import { PORT } from './src/config/keys.js'
import authRouter from './src/router/auth.router.js'
import userRouter from './src/router/user.router.js'

const port = PORT || 4000

// connection to database
dbConnection()

// setting
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(logger)

// routes
app.use('/', authRouter)
app.use('/', userRouter)

// Listen Port
app.listen(port || 4000, () => console.log(`PORT listen http://localhost:${port}`))
