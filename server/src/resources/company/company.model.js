import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CompanySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    companyName: {
      type: String,
      required: true,
    },
    employeeNumber: {
      type: String,
      default: 'N/A'
    },
    address: {
      streetAddress: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        // text: true
      },
      stateAbbr: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      }
    },
    description: {
      type: String,
      default: "There was no description provided"
    },
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'job' }],
    benefits: {
      insurance: { type: Boolean, default: false },
      daycare: { type: Boolean, default: false },
      medical: { type: Boolean, default: false },
      sick_leave: { type: Boolean, default: false },
      stock_option: { type: Boolean, default: false },
      vacation: { type: Boolean, default: false },
    }

  },
  { timestamps: true }
)
// Schema.path('name').index({text : true});
// CompanySchema.path('address.city').index({ text: true });
CompanySchema.index({ 'address.city': 'text'}) // works


const Company = mongoose.model('company', CompanySchema)

export default Company;
