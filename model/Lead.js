import mongoose from "mongoose";
const Schema = mongoose.Schema;



const leadSchema = new Schema({
    userId: { type: String},
    feedback: { type: String, required: true },
    status: { type: String, required: true },
    interest: { type: String, required: true },
    call: { type: String, required: true },
    screening: { type: String, required: true },
    interview: { type: String, required: true },
    test: { type: String, required: true },
    selected: { type: String, required: true },
   
}, { timestamps:true });

export default mongoose.model('Lead', leadSchema, 'leads');