import express from 'express'

import {
    createInvestor,
    getInvestor,
    getInvestorHoldings,
    getInvestorNetworth,
    login,
    logout,
    getInvestorAnalytics,
    getAllInvestors
} from '../controllers/investorController'

const router = express.Router()

router.post('/', createInvestor)

router.get('/analytics', getInvestorAnalytics)

router.get('/', getAllInvestors)

router.get('/:investorId', getInvestor)

router.get('/:investorId/holdings', getInvestorHoldings)

router.get('/:investorId/networth', getInvestorNetworth)

router.post('/login', login)

router.post('/logout', logout)

export default router