const db = require('../utility/dbManager')

const insertFund = (data) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO mutual_funds(
                fund_id,
                amc_id,
                fund_name,
                fund_code,
                category
            )
            VALUES(?,?,?,?,?)
        `

        db.query(
            query,
            [
                data.fund_id,
                data.amc_id,
                data.fund_name,
                data.fund_code,
                data.category
            ],
            (err, result) => {

                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: 'Fund Created',
                        result
                    })
                }
            }
        )
    })
}

const fetchFunds = () => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM mutual_funds
        `

        db.query(query, (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

const updateFundNAV = (data) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO nav_history(
                nav_id,
                fund_id,
                nav_value,
                nav_date
            )
            VALUES(?,?,?,?)
        `

        db.query(
            query,
            [
                data.nav_id,
                data.fund_id,
                data.nav_value,
                data.nav_date
            ],
            (err, result) => {

                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: 'NAV Updated',
                        result
                    })
                }
            }
        )
    })
}

module.exports = {
    insertFund,
    fetchFunds,
    updateFundNAV
}