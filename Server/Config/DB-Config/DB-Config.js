const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connection = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL is not defined in .env file");
        }

        await mongoose.connect(dbUrl);
        console.log('Connection successful');
        
        const connection = mongoose.connection;
        connection.on('error', (error) => {
            console.log('Connection error', error);
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = connection;
