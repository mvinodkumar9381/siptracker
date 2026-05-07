const {
    insertFund,
    fetchFunds,
    updateFundNAV
} = require('../models/fundModel.js')

const createFund = async (req, res) => {

    try {

        const result = await insertFund(req.body)

        return res.status(201).json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const getFunds = async (req, res) => {

    try {

        const result = await fetchFunds()

        return res.json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const updateNAV = async (req, res) => {

    try {

        const result = await updateFundNAV(
            req.params.fundId,
            req.body.nav
        )

        return res.json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

module.exports = {
    createFund,
    getFunds,
    updateNAV
}