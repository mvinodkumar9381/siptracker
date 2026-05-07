const {
    insertInvestor,
    fetchInvestor,
    fetchHoldings,
    calculateNetworth
} = require('../models/investorModel.js')

const {
    signJWT
} = require('../utility/AuthManager.js')

const invalidTokens = []

const createInvestor = async (req, res) => {

    try {

        const result = await insertInvestor(req.body)

        return res.status(201).json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const getInvestor = async (req, res) => {

    try {

        const result = await fetchInvestor(req.params.investorId)

        if (!result) {
            return res.status(404).send('Investor not found')
        }

        return res.json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const getInvestorHoldings = async (req, res) => {

    try {

        const result = await fetchHoldings(req.params.investorId)

        return res.json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const getInvestorNetworth = async (req, res) => {

    try {

        const result = await calculateNetworth(req.params.investorId)

        return res.json(result)

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const login = async (req, res) => {

    try {

        const { email } = req.body

        const token = signJWT({
            email: email,
            role: 'investor'
        })

        return res.json({
            message: 'Login Successful',
            token: token
        })

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

const logout = async (req, res) => {

    try {

        const token = req.headers.authorization

        invalidTokens.push(token)

        return res.json({
            message: 'Logout Successful'
        })

    } catch (err) {

        return res.status(500).send(err.message)
    }
}

module.exports = {
    createInvestor,
    getInvestor,
    getInvestorHoldings,
    getInvestorNetworth,
    login,
    logout,
    invalidTokens
}