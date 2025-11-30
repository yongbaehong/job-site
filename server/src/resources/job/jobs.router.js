import { Router } from 'express'
import { createJob, removeJob, getAllJobs, searchJobByTitleOrCity, applyToJob, unapplyJob, getAppliedJobs } from './jobs.controller'

const router = Router()

router.get('/getalljobs', getAllJobs)
router.get('/appliedjobs/:userId', getAppliedJobs)

router.post('/', createJob)
router.post('/searchjobs', searchJobByTitleOrCity)

router.put('/applytojob', applyToJob)
router.put('/removejob', removeJob)
router.put('/unapplyjob', unapplyJob)

export default router
