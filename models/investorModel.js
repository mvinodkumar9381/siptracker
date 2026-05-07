const db = require('../utility/dbManager')

const insertInvestor = (data) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO investors(
                investor_id,
                first_name,
                last_name,
                email,
                phone,
                pan_number
            )
            VALUES(?,?,?,?,?,?)
        `

        db.query(
            query,
            [
                data.investor_id,
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.pan_number
            ],
            (err, result) => {

                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: 'Investor Created',
                        result
                    })
                }
            }
        )
    })
}

const fetchInvestor = (investorId) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM investors
            WHERE investor_id = ?
        `

        db.query(query, [investorId], (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

const fetchHoldings = (investorId) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                mf.fund_name,
                SUM(t.units_allocated) AS total_units,
                MAX(nh.nav_value) AS nav_value,
                SUM(t.units_allocated) * MAX(nh.nav_value) AS current_value

            FROM transactions t

            JOIN mutual_funds mf
            ON t.fund_id = mf.fund_id

            JOIN nav_history nh
            ON mf.fund_id = nh.fund_id

            WHERE t.investor_id = ?

            GROUP BY
                mf.fund_id,
                mf.fund_name
        `

        db.query(query, [investorId], (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const calculateNetworth = (investorId) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                SUM(t.units_allocated * nh.nav_value) AS networth

            FROM transactions t

            JOIN nav_history nh
            ON t.fund_id = nh.fund_id

            WHERE t.investor_id = ?
        `

        db.query(query, [investorId], (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

const loginUser = (email) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM investors
            WHERE email = ?
        `

        db.query(query, [email], (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

const logoutUser = (token) => {

    return {
        message: 'Logout Successful'
    }
}

module.exports = {
    insertInvestor,
    fetchInvestor,
    fetchHoldings,
    calculateNetworth,
    loginUser,
    logoutUser
}