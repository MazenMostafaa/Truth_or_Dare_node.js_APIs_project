import express from 'express'
import path from 'path'
import { config } from 'dotenv'

config({ path: path.resolve('./config/.env') })

const app = express()
const port = process.env.PORT

import { connectDB } from './DB/connection.js'
import * as allRouters from './src/Modules/index.routers.js'


connectDB()
app.use(express.json())
app.use('/saraha/user', allRouters.userRouters)
app.use('/saraha/message', allRouters.messageRouters)

app.get('/', (req, res) => res.send('Hello There! , welcone in Saraha App'))
app.listen(port, () => { console.log(`...Server is running on Port ${port}`); })