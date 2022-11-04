import dotenv from 'dotenv';

dotenv.config();


export const {
    APP_URL,
    DATABASE_URI,
    emailUser,
    emailPassword
} = process.env;