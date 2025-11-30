import { Router } from 'express'
import { companySingle, createCompany, editCompany } from './company.controller'

const router = Router()

router.get('/:id', companySingle)

router.post('/createcompany', createCompany)

router.put('/editcompany/:companyid', editCompany)

export default router;
