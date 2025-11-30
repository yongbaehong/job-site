import { Router } from 'express'
import { user, userUpdate, bookmarkJob, bookmarked, removeBookmarkJob } from './user.controller'

const router = Router()

router.get('/', user)
router.get('/bookmarked/:userId', bookmarked)

router.put('/', userUpdate)
router.put('/bookmark', bookmarkJob)
router.put('/removebookmarkjob', removeBookmarkJob)

export default router;
