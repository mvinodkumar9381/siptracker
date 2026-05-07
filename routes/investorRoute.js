const express = require('express')

const {
    createInvestor,
    getInvestor,
    getInvestorHoldings,
    getInvestorNetworth,
    login,
    logout
} = require('../controllers/investorController.js')

const router = express.Router()

router.post('/', createInvestor)

router.get('/:investorId', getInvestor)

router.get('/:investorId/holdings', getInvestorHoldings)

router.get('/:investorId/networth', getInvestorNetworth)

router.post('/login', login)

router.post('/logout', logout)

module.exports = router