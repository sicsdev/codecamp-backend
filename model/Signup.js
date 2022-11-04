import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";


const signupSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    token: {type: String, default: ''}
   

}, { timestamps:true });

export default mongoose.model('Signup', signupSchema, 'signups');