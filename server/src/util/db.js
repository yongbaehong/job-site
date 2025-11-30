import 'colors'
import mongoose from 'mongoose'
import { seedData } from './seedDb'

mongoose.Promise = global.Promise

const dbUrl = 'mongodb://localhost/hong-competency'
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

export const connect = () => {
  return db.once('open', () => {
    console.log(`Connection to mongoDB 'hong-competency' has been made...`.green)
    seedData()
  }).on('error', (err) => {
    console.log(`db.js ERROR: ${err}`)
  })
}
