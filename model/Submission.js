import mongoose from "mongoose";
import { APP_URL } from "../config";
const Schema = mongoose.Schema;



const submissionSchema = new Schema({
  
  
    submission_url: {type: String, required:true},
    submitted: {type: Boolean, default: false , required: true },
    assignment_id: {type: String,  required: true},
    user_id: {type: String,  required: true},
    comments: {type: String,  required: true}
   
}, { timestamps:true } );
  


export default mongoose.model('Submission', submissionSchema, 'submission');