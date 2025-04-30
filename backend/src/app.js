import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkWebhooks } from './controllers/webhooks.controller.js'

const app = express()

app.use(cors())

app.get('/', (req,res) => res.send("API working"))
app.post('/clerk', express.json(), clerkWebhooks)

export default app
