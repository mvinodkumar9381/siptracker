import express from 'express'

import {
    createFund,
    getFunds,
    updateNAV
} from '../controllers/fundController'

const router = express.Router()

router.post('/', createFund)

router.get('/', getFunds)

router.put('/:fundId/nav', updateNAV)

export default router