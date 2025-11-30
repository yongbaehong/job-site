import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ApplicantsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    applicantEmail: String,
    appliedDate: {
      type: Date,
      default: Date.now
    },
  },
)

const JobSchema = new Schema(
  {
    title: { type: String, required: true, text: true },
    jobType: { type: String, required: true, enum: ["Full", "Part", "Intern"] },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    requiredSkills: [],
    companyId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'company'
    },
    applicants: [ApplicantsSchema]
  },
  { timestamps: true }
)

// JobSchema.createIndex({ 'title': 1 })
// JobSchema.path('title').index({ text: true })
JobSchema.index({ title: 1});
const Job = mongoose.model('job', JobSchema)

export default Job