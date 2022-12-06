import mongoose from "mongoose";
const Schema = mongoose.Schema;



const batchSchema = new Schema({
    name: { type: String,  },

  
}, { timestamps:true } );

export default mongoose.model('Batch', batchSchema, 'batch');