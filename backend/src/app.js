import express from 'express'
import cors from 'cors'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.controller.js'
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
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

app.use(express.json({ limit: '25kb' }))
app.use(express.urlencoded({extended: true, limit: '25kb'}))
app.use(express.static('public'))

//Route declaration
import educatorRouter from './routes/educator.routes.js'
import courseRouter from './routes/course.routes.js'
import userRouter from './routes/user.routes.js'

//Route definition
app.use('/api/v1/educator', educatorRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/user', userRouter)

export default app
