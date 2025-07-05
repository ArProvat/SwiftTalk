import pkg from 'mongoose';
const { connect, connection: _connection } = pkg;
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const connection = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL is not defined in .env file");
        }

        await connect(dbUrl);
        console.log('Connection successful');
        
        const connection = _connection;
        connection.on('error', (error) => {
            console.log('Connection error', error);
        });
    } catch (error) {
        console.error(error);
    }
};

export default connection;
