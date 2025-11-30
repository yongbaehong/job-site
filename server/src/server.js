import 'colors'
import express from 'express'
import { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { connect } from './util/db'
import companyRouter from './resources/company/company.router'
import userRouter from './resources/user/user.router'
import jobsRouter from './resources/job/jobs.router'
import { protect, signin, signup } from './auth/auth'

const PORT = process.env.PORT || 8080

export const app = express()

app.disable('x-powered-by')

app
  .use(morgan('dev'))
  .use(cors())
  .use(json())
  .use(urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send(`Competency project SERVER running...`)
})

app.post('/signup', signup)
app.post('/signin', signin)
// Any route starting with '/api' requires tokens to access
app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/companylist', companyRouter)
app.use('/api/job', jobsRouter)

export const startApiServer = async () => {
  try {
    await connect()
    app.listen(PORT, () => console.log(`Yong-Hong-Competency Project Server running on 'http://localhost:${PORT}'`.green))
  } catch (e) {
    console.error(e)
  }
}