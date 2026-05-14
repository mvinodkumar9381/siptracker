import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vinodkumar2004',
    database: 'siptracker',
    port : 3306
})

connection.connect((err: Error | null) => {

    if (err) {
        console.log(err)
    } else {
        console.log('MySQL Connected')
    }
})

export default connection