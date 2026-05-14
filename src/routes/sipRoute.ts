import express from 'express'

import {
    createSIP,
    getSIP,
    processSIP,
    getTransactions,
    getNAV
} from '../controllers/sipController'

const router = express.Router()

router.get('/transactions', getTransactions)

router.post('/', createSIP)

router.get('/:sipId', getSIP)

router.post('/:sipId/process', processSIP)

// router.get('/:sipId/transactions', getTransactions)

router.get('/:sipId/nav', getNAV)

export default router