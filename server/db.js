const Pool = require("pg").Pool;
require('dotenv').config();

let pool;

if (process.env.NODE_ENV === 'production') {
    // Use DATABASE_URL for production (Vercel deployment)
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    // Use local database for development
    pool = new Pool({
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "root",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || "perntodo"
    });
}

module.exports = pool;
