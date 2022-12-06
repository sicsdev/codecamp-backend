import mongoose from "mongoose";
const Schema = mongoose.Schema;



const studySchema = new Schema({
  
    title: {type: String },
    description: {type: String },
    assignments : {type: String},
    lecture: {type: String},
    result: {type: String },
    batch: { type: Schema.Types.ObjectId, ref: 'Batch'  },


  
}, { timestamps:true } );

export default mongoose.model('Study', studySchema, 'study');