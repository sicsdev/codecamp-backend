import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";


const signupSchema = new Schema({
    name: { type: String,  },
    email: { type: String,  unique: true },
    password: { type: String  },
    phone: { type: Number  },
    token: {type: String, default: ''},
    paid: {type: Boolean, default: false},
    role: {type: Intl, default: 0},
    image: {type: String, get: (image) => {
        return `${APP_URL}/${image}`;
     }},
}, { timestamps:true, toJSON: { getters: true } } );

export default mongoose.model('Signup', signupSchema, 'signups');