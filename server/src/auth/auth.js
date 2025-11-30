import 'colors'
import jwt from 'jsonwebtoken'

import User from '../resources/user/user.model'

const config = {
  secrets: {
    jwt: 'hong-competency',
    jwtExp: '3h'
  }
}

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Need both Email and Password" })
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Need both Email and Password" })
  }

  const invalid = { message: "Invalid email and password combination" }

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .exec()

    if (!user) {
      return res.status(401).json(invalid).end()
    }

    const match = await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).json(invalid).end()
    }
    console.log(user)
    const token = newToken(user)
    return res.status(201).cookie('token', `Bearer ${token}`).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.jwt
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({message: "Bad Request"}).end()
  }
  const token = bearer.split('Bearer ')[1].trim()
  console.log('token'.rainbow, token)
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }
  console.log('payload'.rainbow, payload)
  const user = await User.findById(payload.id)
    .populate({
      path: 'companyId',
      model: 'company',
      populate: {
        path: 'jobs',
        model: 'job',
        populate: {
          path: 'applicants.userId',
          model: 'user',
          select: '-password -email -hasCompany -companyId -bookmarkJob -createdAt -updatedAt'
        }
      }
    })
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).send({ message: "There is no user" }).end()
  }

  req.user = user
  next()
}
