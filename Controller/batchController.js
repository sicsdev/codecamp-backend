import Batch from "../model/Batch";
import Signup from "../model/Signup";

const batchController = {
    async storebatch(req,res){
        const  { name } = req.body;
        let data;
        try{
            data = await Batch.create({
                name,
            });
        }
        catch(err){
           console.log(err)
        }
        res.status(201).json(data);
  
    },
    async getbatch(req,res) {
            const batchrecord = await Batch.find(
            );
            res.status(201).json(batchrecord);

            console.log(batchrecord, "check")
    },

    async assignbatch(req,res) {
        const  { batch } = req.body;
       console.log("data",batch,req.params.id)
        let records;
        try{
            records = await Signup.findOneAndUpdate({_id: req.params.id },{
                $set:{batch: batch}
         
            },{new:true})
            console.log(records)
            res.status(200).json({
                sucess:true,
                data:records
            })
        }
        catch(err){
            console.log(err)
            res.status(400).json({
                sucess:false,
                data:null,
                
            })
        }

    },
    async get(req,res) {

        const batch = await Batch.find();
        if(!batch){
            res.status(400).json({sucess:false })
        }
        let data=[]
        for(let x of batch){
        const user = await Signup.find({batch:x._id});
        data.push({name:x.name,users:user, _id:x._id})

        }
       res.status(201).json(data);
    },


    async getbtch(req,res) {
        let records;
        try{
          records= await Signup.findById( req.params.id).populate({path:"batch",select:"name"});
         }
       catch(err){
          res.status(500).json({ error: err.message });
         }
         res.status(201).json(records);
        }

    
    
}
export default batchController;