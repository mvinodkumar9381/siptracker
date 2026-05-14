import mysql from '../utility/dbManager';

export const insertInvestor = (data:any) => {

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

        mysql.query(
            query,
            [
                data.investor_id,
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.pan_number
            ],
            (err: Error | null, result: any) => {

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

export const fetchInvestor = (investorId:string) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM investors
            WHERE investor_id = ?
        `

        mysql.query(query, [investorId], (err: Error | null, result: any) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

export const fetchHoldings = (investorId:string) => {

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

        mysql.query(query, [investorId], (err: Error | null, result: any) => {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export const calculateNetworth = (investorId:string) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT
                SUM(t.units_allocated * nh.nav_value) AS networth

            FROM transactions t

            JOIN nav_history nh
            ON t.fund_id = nh.fund_id

            WHERE t.investor_id = ?
        `

        mysql.query(query, [investorId], (err: Error | null, result: any) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

export const loginUser = (email:string) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM investors
            WHERE email = ?
        `

        mysql.query(query, [email], (err: Error | null, result: any) => {

            if (err) {
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

export const logoutUser = (token:string) => {

    return {
        message: 'Logout Successful'
    }
}


export const fetchAllInvestors = async () => {
  try {
    const query = `

      SELECT

          investor_id
          AS investor_id,

          first_name  ' '  last_name
          AS investor_name,

          email
          AS email,

          phone
          AS phone,

          pan_number
          AS pan_number,

          created_at
          AS created_at

      FROM investors

      ORDER BY investor_id

    `;

    const result:any = await mysql.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const fetchInvestorAnalytics = async () => {
  try {
    const query = `

      SELECT

          i.investor_id
          AS investor_id,

          i.first_name  ' '  i.last_name
          AS investor_name,

          i.email
          AS email,

          SUM(t.transaction_amount)
          AS amount_invested,

          ROUND(
              SUM(
                  t.units_allocated * latest_nav.nav_value
              ),
              2
          )
          AS investor_holdings,

          ROUND(
              AVG(latest_nav.nav_value),
              2
          )
          AS latest_nav

      FROM investors i

      JOIN transactions t
      ON i.investor_id = t.investor_id

      JOIN (

          SELECT DISTINCT ON (fund_id)

              fund_id,

              nav_value,

              nav_date

          FROM nav_history

          ORDER BY
              fund_id,
              nav_date DESC

      ) latest_nav

      ON t.fund_id = latest_nav.fund_id

      GROUP BY

          i.investor_id,

          i.first_name,

          i.last_name,

          i.email

      ORDER BY i.investor_id

    `;

    const result:any = await mysql.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};


