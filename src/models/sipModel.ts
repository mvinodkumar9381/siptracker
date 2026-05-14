import mysql from '../utility/dbManager';

export const createSIP = (data: { sip_id: string, investor_id: string, fund_id: string, sip_amount: number, sip_day: number, start_date: string, status: string }) => {

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

        mysql.query(
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
            (err: Error | null, result: any) => {

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

export const getSIP = (sipId: string) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM sips
            WHERE sip_id = ?
        `

        mysql.query(query, [sipId], (err: Error | null, result: any) => {

            if (err) {

                reject(err)

            } else {

                resolve(result[0])
            }
        })
    })
}

export const processSIP = (data: { sip_id: string, investor_id: string, fund_id: string, transaction_id: string, transaction_type: string, transaction_amount: number, transaction_date: string }) => {

    return new Promise((resolve, reject) => {

        const navQuery = `
            SELECT
                nav_value
            FROM nav_history
            WHERE fund_id = ?
            ORDER BY nav_date DESC
            LIMIT 1
        `

        mysql.query(navQuery, [data.fund_id], (err: Error | null, navResult: any) => {

            if (err) {

                reject(err)

            } else {

                if (!navResult || navResult.length === 0) {

                    return reject(
                        new Error('NAV not found for this fund')
                    )
                }

                const nav = navResult[0].nav_value

                const units =
                    data.transaction_amount / nav

                const transactionQuery = `
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

                mysql.query(
                    transactionQuery,
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
                    (err: Error | null, result: any) => {

                        if (err) {

                            reject(err)

                        } else {

                            resolve({
                                message: 'SIP Processed Successfully',
                                allocated_units: units,
                                nav_used: nav,
                                result
                            })
                        }
                    }
                )
            }
        })
    })
}

// const getTransactions = (sipId) => {

//     return new Promise((resolve, reject) => {

//         const query = `
//             SELECT *
//             FROM transactions
//             WHERE sip_id = ?
//             ORDER BY transaction_date DESC
//         `;

//         db.query(query, [sipId], (err, result) => {

//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };
export  const getTransactions = () => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM transactions
            ORDER BY transaction_date DESC
        `;

        mysql.query(query, (err: Error | null, result: any) => {

            if (err) {

                console.log(err);

                reject(err);

            } else {
                console.log(result);
                resolve(result);

            }
        });
    });
};
export const calculateNAV = (sipId: string) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                s.sip_id,
                mf.fund_name,
                SUM(t.units_allocated) AS total_units,
                MAX(t.nav_used) AS latest_nav,
                SUM(t.units_allocated) *
                MAX(t.nav_used) AS current_value

            FROM transactions t

            JOIN sips s
            ON t.sip_id = s.sip_id

            JOIN mutual_funds mf
            ON t.fund_id = mf.fund_id

            WHERE s.sip_id = ?

            GROUP BY
                s.sip_id,
                mf.fund_name
        `

        mysql.query(query, [sipId], (err: Error | null, result: any) => {

            if (err) {

                reject(err)

            } else {

                resolve(result[0])
            }
        })
    })
}




