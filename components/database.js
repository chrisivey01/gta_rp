const mysql = require('mysql')
const util = require('util')

var pool = mysql.createPool({
    connectionLimit: 100,
    host: '18.209.63.46',
    user: 'chris',
    password: 'baddev12',
    database: 'gta_rp'
});

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err)
    }

    if(connection){
        connection.release();
    }
});


pool.query = util.promisify(pool.query); // Magic happens here.

module.exports = pool;