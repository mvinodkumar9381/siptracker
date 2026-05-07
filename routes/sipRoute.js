const express = require('express')

const {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
} = require('../controllers/sipController.js')

const router = express.Router()

router.post('/', createSIP)

router.get('/:sipId', getSIP)

router.post('/:sipId/process', processSIP)

router.get('/:sipId/transactions', getTransactions)

module.exports = router