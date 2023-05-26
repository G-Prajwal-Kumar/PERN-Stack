const Pool = require("pg").Pool
const connectionString = 'postgres://prajwal:4Wz1U9aVmIhoWk60OW8XOFgKgRnMFUoC@dpg-choclmm7avja2d89drfg-a/ngit'

const pool = new Pool({
    connectionString,
})

module.exports = pool;