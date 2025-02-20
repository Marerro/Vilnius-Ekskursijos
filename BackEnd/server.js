const app = require('./app');
const dotenv = require('dotenv');
const { sql, testConnection } = require('./dbConnection');

dotenv.config(); // read .env file
const port = process.env.PORT; // PORT is what we set in .env file.

(async () => {
    try {
        await testConnection();
        // server start
        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        })
    } catch (error) {
        process.exit(1); // terminate the running application 1 = means error;
    }
    process.on('SIGINT', async () => {
        console.log("Closing database connection ...");
        await sql.end();
        process.exit(0);
    })
})();