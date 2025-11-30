import 'colors'
import Company from './company.model'
import User from './../user/user.model'

export const companySingle = async (req, res) => {
  try {
    let companySingle = await Company.findById(req.params.id)
      .populate({
        path: 'jobs',
        model: 'job',
        populate: {
          path: 'applicants.userId',
          model: 'user',
          select: '-password -email -hasCompany -bookmarkJob'
        }
      })
      .lean()
      .exec()
    console.log('here is jobs.applicants.userId POPULATED\n'.rainbow, companySingle)
    if (!companySingle) {
      return res.status(400).json({ message: "companySingle function ERROR" })
    }
    return res.status(200).json(companySingle).end()
  } catch (err) {
    console.log(err)
  }
}

export const createCompany = async (req, res) => {
  console.log(req.body)
  try {
    let newEmployer = await Company.create(req.body)
    console.log(newEmployer)
    let userThatOwnsCompany = await User.findByIdAndUpdate(req.body.userId, { hasCompany: true, companyId: newEmployer._id }, { new: true })
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
    console.log(userThatOwnsCompany)

    if (!newEmployer || !userThatOwnsCompany) {
      return res.status(400).json({ msg: "createEmployer ERROR" }).end()
    }
    return res.status(200).json(userThatOwnsCompany).end()
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err._message }).end()
  }
}

export const editCompany = async (req, res) => {
  try {
    let editedCompany = await Company.findByIdAndUpdate(req.params.companyid, req.body, { new: true }).lean().exec()
    console.log('editedCompany'.blue, editedCompany)
    let userWithEditedCompany = await User.findById(req.body.userId)
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
    console.log('userWithEditedCompany'.green, userWithEditedCompany)
    if (!editedCompany || !userWithEditedCompany) {
      return res.status(400).end()
    }
    return res.status(200).json(userWithEditedCompany).end()
  } catch (err) {
    console.log(err)
  }
}
