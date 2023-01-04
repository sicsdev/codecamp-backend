
import Study from "../model/Study";
import fs from 'fs';
import Signup from "../model/Signup";
import Submission from "../model/Submission";


const submissionController = {


    async updatedassignment(req,res) {
        const {  submission_url ,assignment_id,comments } = req.body;
     
         console.log(req.user.id)
         
          let document;
        try{
           document = await Submission.create({
            submission_url,
            user_id: req.user.id,
            assignment_id,
            submitted:true,
            comments
         });
          }
          catch(err){
             console.log(err)
          }
          res.status(201).json({
              success:true,
              data: document
          }); 

    },


    async submission(req,res) {

        const batch = await Submission.find({user_id:req.user.id});
        if(!batch){
            return res.status(400).json({sucess:false })
        }
        let data=[]
        for(let x of batch){
        // const user = await Signup.find({_id:x.user_id});
        // data.push({submitted:x.submitted,users:user,submission_url:x.submission_url,assignment_id:x.assignment_id})
        data.push(x.assignment_id)
        }
      res.status(201).json(data);
      console.log(batch)
    },


    async checksubmission(req,res) {

        const batch = await Submission.find();
        if(!batch){
            return res.status(400).json({sucess:false })
        }
        let alldata=[]
        for(let x of batch){
        const userdata = await Signup.find({_id:x.user_id});
        alldata.push({submitted:x.submitted,users:userdata,submission_url:x.submission_url,assignment_id:x.assignment_id})
       
        }
      res.status(201).json(alldata);
      console.log(batch)
    },

    
  

}
export default submissionController;