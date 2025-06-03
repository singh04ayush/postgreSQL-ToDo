const Pool = require("pg").Pool;
require('dotenv').config();

let pool;

    // Use DATABASE_URL for production (Vercel deployment)
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });


module.exports = pool;
