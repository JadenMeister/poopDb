const mysql = require("mysql2/promise");
require("dotenv").config();


const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"pooptime",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
    port:3307
})



module.exports = pool;