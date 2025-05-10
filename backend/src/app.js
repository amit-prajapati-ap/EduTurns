import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkWebhooks } from './controllers/webhooks.controller.js'
import { clerkMiddleware } from '@clerk/express'

const app = express()

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
))
app.use(clerkMiddleware());

app.get('/', (_, res) => res.send("API working"))

app.post('/clerk', express.json(), clerkWebhooks)

app.use(express.json({ limit: '25kb' }))
app.use(express.urlencoded({extended: true, limit: '25kb'}))
app.use(express.static('public'))

//Route declaration
import educatorRouter from './routes/educator.routes.js'

//Route definition
app.use('/api/v1/educator', educatorRouter)

export default app
