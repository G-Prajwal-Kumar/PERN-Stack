const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "123857496",
    host: "localhost",
    port: 5432,
    database: "NGIT"
})

module.exports = pool;