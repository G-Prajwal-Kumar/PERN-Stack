const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
        connectionString: 'postgres://prajwal:4Wz1U9aVmIhoWk60OW8XOFgKgRnMFUoC@dpg-choclmm7avja2d89drfg-a/ngit',
        ssl: {
            rejectUnauthorized: false
            }
    }
});

module.exports = db;