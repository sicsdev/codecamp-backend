import dotenv from 'dotenv';

dotenv.config();


export const {
    APP_URL,
    DATABASE_URI,
    emailUser,
    emailPassword,
    SECRETKEY,
    RAZORPAY_API_KEY,
    RAZORPAY_API_SECRET

} = process.env;