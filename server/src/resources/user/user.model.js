import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    resume: {
      experience: { type: String, default: "" },
      education: { type: Array, default: [String] },
      skills: { type: Array, default: [String] },
      update: { type: Date, default: Date.now }
    },
    hasCompany: { type: Boolean, default: false },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
    bookmarkJob: [{ type: mongoose.Schema.Types.ObjectId, ref: 'job' }]
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }
    this.password = hash
    next()
  })
})

UserSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        console.log('rejecting from UserSchema.methods.checkPassword')
        return reject(err)
      }
      resolve(same)
    })
  })
}

const User = mongoose.model('user', UserSchema)

export default User;
