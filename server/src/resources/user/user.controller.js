import 'colors'
import User from './user.model'

export const user = (req, res) => {
  return res.status(200).json([req.user])
}

export const userUpdate = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
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
    res.status(200).json({ data: user })
  } catch (err) {
    console.error(err)
    return res.status(400).end()
  }
}

export const bookmarkJob = async (req, res) => {
  try {
    let addJobIdToUser = await User.findByIdAndUpdate(req.body.userId, { $addToSet: { bookmarkJob: req.body.jobId } }, { new: true })
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
    console.log(addJobIdToUser)

    if (!addJobIdToUser) {
      return res.status(401).send({ message: 'user.controller.js > bookmark() ERROR' })
    }
    return res.status(200).json(addJobIdToUser).end()
  } catch (err) {
    console.log(err)
    return res.status(500).end()
  }
}

export const bookmarked = async (req, res) => {
  try {
    const userBookmarked = await User.findById(req.params.userId)
      .select('-password')
      .populate({
        path: 'bookmarkJob',
        select: '-applicants',
        populate: {
          path: 'companyId',
          model: 'company',
          select: 'address companyName'
        }
      })
      .lean()
      .exec()
    if (!userBookmarked) {
      return res.status(400).send({ message: "user.controller.js > bookmarked() > ERROR" }).end()
    }
    console.log(userBookmarked)
    return res.status(200).json(userBookmarked).end()

  } catch (err) {
    console.log(err)
    return res.status(500).end()
  }
}

export const removeBookmarkJob = async (req, res) => {
  try {
    const removeJobFromUser = await User.findByIdAndUpdate(req.body.userId, { $pull: { bookmarkJob: req.body.jobId } }, { new: true })
      .select('-password')
      .populate({
        path: 'bookmarkJob',
        select: '-applicants',
        populate: {
          path: 'companyId',
          model: 'company',
          select: 'address companyName'
        }
      })
      .lean()
      .exec()

    const updateSetUser = await User.findById(req.body.userId)
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
    console.log(updateSetUser)
    if (!removeJobFromUser || !updateSetUser) {
      return res.status(400).send({ message: 'user.controller.js > removeBookmarkJob() > ERROR' }).end()
    }
    return res.status(200).json({ bookmarks: removeJobFromUser, user: updateSetUser }).end()
  } catch (err) {
    console.log(err)
    return res.status(500).end()
  }
}
