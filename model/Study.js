import mongoose from "mongoose";
import { APP_URL } from "../config";
const Schema = mongoose.Schema;



const studySchema = new Schema({
  
    title: {type: String },
    description: {type: String },
    assignments : {type: String},
    result: {type: String },
    end_date: {type: Date},
    submission_url: {type: String},
    submitted: {type: Boolean, default: false},
    userid: { type: Schema.Types.ObjectId, ref: 'Signup'},
    batch: { type: Schema.Types.ObjectId, ref: 'Batch'},
    lecture: {type: String, get: (lecture) => {
        return `${APP_URL}/${lecture}`;
     }},
}, { timestamps:true, toJSON: { getters: true } } );
  


export default mongoose.model('Study', studySchema, 'study');