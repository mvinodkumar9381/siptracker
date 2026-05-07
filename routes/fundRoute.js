const express = require('express')

const {
    createFund,
    getFunds,
    updateNAV
} = require('../controllers/fundController.js')

const router = express.Router()

router.post('/', createFund)

router.get('/', getFunds)

router.put('/:fundId/nav', updateNAV)

module.exports = router