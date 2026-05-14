import mysql from '../utility/dbManager';

export const insertFund = (data: { fund_id: string, amc_id: string, fund_name: string, fund_code: string, category: string }) => {

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

        mysql.query(
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

export  const fetchFunds = () => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM mutual_funds
        `

        mysql.query(query, (err: Error | null, result: any) => {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export const updateFundNAV = (data: { nav_id: string, fund_id: string, nav_value: number, nav_date: string }) => {

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

        mysql.query(
            query,
            [
                data.nav_id,
                data.fund_id,
                data.nav_value,
                data.nav_date
            ],
            (err: Error | null, result: any) => {

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

