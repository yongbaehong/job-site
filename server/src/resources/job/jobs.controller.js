import 'colors'
import Job from './jobs.model'
import Company from './../company/company.model'
import User from '../user/user.model';

export const getAllJobs = async (req, res) => {
  // wait 1.5s to give feel of data loading
  await new Promise(resolve => {
    setTimeout(resolve, 1500)
  })
  try {
    const allJobs = await Job.find()
      .populate({
        path: 'companyId',
        select: 'address companyName'
      })
      .lean().exec()
    if (!allJobs) {
      return res.status(400).send({ message: "getAllJobs ERROR" }).end()
    }
    return res.status(200).json(allJobs).end()
  } catch (err) {
    console.error(err)
  }
}

export const createJob = async (req, res) => {
  try {
    // create new job
    const newJob = await Job.create(req.body)
    if (!newJob) {
      return res.status(400).json({ msg: "jobs.controller/createJob() ERROR" })
    }

    const addJobIdToCompany = await Company.findByIdAndUpdate(req.body.companyId, { $addToSet: { jobs: newJob._id } }, { new: true })
      .lean()
      .exec()
    // Get user/employer to setState with new data
    const getUserToSetUser = await User.findById(addJobIdToCompany.userId)
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
    // send new state
    return res.status(200).json(getUserToSetUser).end()
  } catch (err) {
    console.log(err)
  }

}

export const removeJob = async (req, res) => {
  try {
    // Remove jobId from ALL user.model > bookmarkJob
    await User.updateMany({ bookmarkJob: req.body.jobId }, { $pull: { bookmarkJob: req.body.jobId } }).exec()
    // Remove job from db.jobs/database
    let removeJobFromMongoDB = await Job.findByIdAndDelete(req.body.jobId).lean().exec()
    if (!removeJobFromMongoDB) {
      return res.status(500).send({ message: "jobs.controller.js > removeJobFromMongoDB > ERROR" })
    }
    // Remove and Update jobId from Company.jobs:[] 
    let findCompanyToRemoveJob = await Company.findByIdAndUpdate(req.body.companyId, { $pull: { jobs: req.body.jobId } }, { new: true })
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
    if (!findCompanyToRemoveJob) {
      return res.status(400).end()
    }
    // Find User to reset data
    let setUser = await User.findById(req.body.userId)
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
    if (!setUser) {
      return res.status(400).send({ message: "removeJob ERROR" }).end()
    }
    return res.status(200).json({ user: setUser, company: findCompanyToRemoveJob }).end()

  } catch (err) {
    console.log(err)
    return res.status(500).send(err).end()
  }
}

export const searchJobByTitleOrCity = async (req, res) => {
  // wait 1.5s to give feel of data loading
  await new Promise(resolve => {
    setTimeout(resolve, 1500)
  })
  try {
    console.log('SearchBar post request:'.red, req.body)
    const jobTitleRegex = new RegExp(req.body.jobTitle, 'ig');
    const cityRegex = new RegExp(req.body.city, 'ig');

    // Search by Job Title
    if (!req.body.city) {
      const jobsFoundByJobTitle = await Job.find({ title: jobTitleRegex })
        .populate({
          path: 'companyId',
          select: 'address companyName'
        })
        .sort('title')
        .lean()
        .exec()
      // If there are no jobs found, send an empty array for 0 results
      if (!jobsFoundByJobTitle.length) {
        return res.status(200).send([]).end()
      }
      return res.status(200).json(jobsFoundByJobTitle).end()
    }
    // Seach by City
    if (!req.body.jobTitle) {
      // const jobsFoundByCity = await Company.find({ 'address.city': new RegExp(`${req.body.city}`, 'gi') })
      const jobsFoundByCity = await Company.find({ 'address.city': cityRegex })
        .select('jobs -_id')
        .sort('address.city')
        .populate({
          path: 'jobs',
          model: 'job',
          populate: {
            path: 'companyId',
            model: 'company',
            select: 'address companyName'
          }
        })
        .lean()
        .exec()
      // If there are no jobs found, send an empty array for 0 results
      if (jobsFoundByCity.length === 0) {
        return res.status(200).json([]).end()
      }
      // Need to find a way for mongoose to remove 'jobs' key and,
      // return and Array of 'job' Objects
      const jobs = jobsFoundByCity.map(el => {
        return [...el.jobs]
      }).flat()

      return res.status(200).json(jobs).end()
    }
    // Search by Job Title and City
    if (req.body.jobTitle && req.body.city) {
      // search by city first
      let jobsFoundByJobTitleAndCity = await Company.find({ 'address.city': cityRegex })
        .select('jobs -_id')
        .sort('address.city')
        .populate({
          path: 'jobs',
          model: 'job',
          // filter by matching jobTitle
          // match: { title: new RegExp(`${req.body.jobTitle}`, 'gi') },
          match: { title: jobTitleRegex },
          options: { sort: { title: 1 } },
          populate: {
            path: 'companyId',
            model: 'company',
            select: 'address companyName'
          }
        })
        .sort('title')
        .lean()
        .exec()
      // If there are no jobs found, send an empty array for 0 results
      jobsFoundByJobTitleAndCity = jobsFoundByJobTitleAndCity.map(el => {
        return [...el.jobs]
      }).flat()
      if (jobsFoundByJobTitleAndCity.length === 0) {
        return res.status(200).json([]).end()
      }
      return res.status(200).json(jobsFoundByJobTitleAndCity).end()



      /** 
       * Query 'jobs' & 'company' collection seperately and join array together,
       * but will have multiple same documents. 
      **/
      // const jobsFoundByCity = await Company.find({ 'address.city': cityRegex })
      //   .select('jobs -_id')
      //   .sort('address.city')
      //   .populate({
      //     path: 'jobs',
      //     model: 'job',
      //     populate: {
      //       path: 'companyId',
      //       model: 'company',
      //       select: 'address companyName'
      //     }
      //   })
      //   .lean()
      //   .exec()
      // // If there are no jobs found, send an empty array for 0 results
      // if (jobsFoundByCity.length === 0) {
      //   return res.status(200).json([]).end()
      // }
      // // Need to find a way for mongoose to remove 'jobs' key and,
      // // return and Array of 'job' Objects
      // const cityJobs = jobsFoundByCity.map(el => {
      //   return [...el.jobs]
      // }).flat()
      // // console.log('JOBS'.bgGreen, jobs)
      // console.log('cityJobs'.rainbow, cityJobs)
      // const titleJobs = await Job.find({ title: jobTitleRegex })
      //   .populate({
      //     path: 'companyId',
      //     select: 'address companyName'
      //   })
      //   .sort('title')
      //   .lean()
      //   .exec()
      // console.log('titleJobs'.rainbow, titleJobs)
      // const titleAndCityJobs = [cityJobs, titleJobs].flat()
      // if (titleAndCityJobs.length === 0) {
      //   console.log('NONE FOUND jobsFoundByTitleAndCity'.bgRed, jobsFoundByJobTitleAndCity)
      //   return res.status(200).json([]).end()
      // }

      // console.log('titleAndCityJobs'.bgYellow, titleAndCityJobs)
      // return res.status(200).json(titleAndCityJobs).end()
    }
  } catch (err) {
    console.error(err)
  }
}

export const applyToJob = async (req, res) => {
  try {
    const applyedToJob = await Job.findOneAndUpdate(
      // find job by _id, that don't have user._id || email that matches in the jobs schema, applicants array
      { _id: req.body.jobId, applicants: { $ne: { userId: req.body.userId, applicantEmail: req.body.applicantEmail } } },
      {
        $push: {
          applicants: {
            userId: req.body.userId,
            applicantEmail: req.body.applicantEmail,
          }
        }
      },
      { new: true })
      .populate('companyId')
      .lean()
      .exec()
    if (!applyedToJob) {
      return res.status(400).send({ message: 'jobs.controller.js > applyedToJob ERROR' }).end()
    }
    return res.status(200).json({ message: `applyed to job successfully` }).end()
  } catch (err) {
    console.error('jobs.controller.js > applyToJob'.red, err)
  }
}

export const unapplyJob = async (req, res) => {
  try {
    const unapplyJob = await Job.findByIdAndUpdate(req.body.jobId, { $pull: { applicants: { userId: req.body.userId } } }, { new: true })
      .populate('companyId')
      .lean()
      .exec()
    if (!unapplyJob) {
      return res.status(400).send({ message: 'jobs.controller.js > unapplyJob ERROR' }).end()
    }
    return res.status(200).send({ message: `unapply to job succuessful` }).end()
  } catch (err) {
    console.error(err)
  }
}

export const getAppliedJobs = async (req, res) => {
  try {
    let appliedJobs = await Job.find({ "applicants.userId": { $all: [req.params.userId] } })
      .select('-applicants')
      .populate({
        path: 'companyId',
        model: 'company',
        select: 'address companyName'
      })
      .lean().exec()
    if (!appliedJobs) {
      return res.status(400).send({ message: "Bad Request at jobs.controller.js > getAppliedJobs()" }).end()
    }

    return res.status(200).json(appliedJobs).end()

  } catch (err) {
    console.error('jobs.controller.js > getAppliedJobs()\n', err)
  }
}
