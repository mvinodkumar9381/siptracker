const db = require('../utility/dbManager')

const createSIP = (data) => {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO sips(
                sip_id,
                investor_id,
                fund_id,
                sip_amount,
                sip_day,
                start_date,
                status
            )
            VALUES(?,?,?,?,?,?,?)
        `

        db.query(
            query,
            [
                data.sip_id,
                data.investor_id,
                data.fund_id,
                data.sip_amount,
                data.sip_day,
                data.start_date,
                data.status
            ],
            (err, result) => {

                if (err) {
                    reject(err)
                } else {
                    resolve({
                        message: 'SIP Created',
                        result
                    })
                }
            }
        )
    })
}

const getSIP = (sipId) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM sips
            WHERE sip_id = ?
        `

        db.query(query, [sipId], (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

const processSIP = (data) => {

    return new Promise((resolve, reject) => {

        const navQuery = `
            SELECT nav_value
            FROM nav_history
            WHERE fund_id = ?
            ORDER BY nav_date DESC
            LIMIT 1
        `

        db.query(navQuery, [data.fund_id], (err, navResult) => {

            if (err) {

                reject(err)

            } else {

                if (!navResult || navResult.length === 0) {

                    return reject('NAV not found for this fund')
                }

                const nav = navResult[0].nav_value

                const units = data.transaction_amount / nav

                const query = `
                    INSERT INTO transactions(
                        transaction_id,
                        sip_id,
                        investor_id,
                        fund_id,
                        transaction_type,
                        transaction_amount,
                        nav_used,
                        units_allocated,
                        transaction_date
                    )
                    VALUES(?,?,?,?,?,?,?,?,?)
                `

                db.query(
                    query,
                    [
                        data.transaction_id,
                        data.sip_id,
                        data.investor_id,
                        data.fund_id,
                        data.transaction_type,
                        data.transaction_amount,
                        nav,
                        units,
                        data.transaction_date
                    ],
                    (err, result) => {

                        if (err) {

                            reject(err)

                        } else {

                            resolve({
                                message: 'SIP Processed',
                                result
                            })
                        }
                    }
                )
            }
        })
    })
}

const getTransactions = (sipId) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM transactions
            WHERE sip_id = ?
        `

        db.query(query, [sipId], (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    createSIP,
    getSIP,
    processSIP,
    getTransactions
}