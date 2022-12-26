
import Study from "../model/Study";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import Signup from "../model/Signup";
import Submission from "../model/Submission";

const storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
    
    });

// const handleMultipartData = multer({ storage, limit: {filesize : 1000000 * 5 }}).fields([{name: 'assignments'},{name: 'lecture'}])

const handleMultipartData = multer({ storage, limit: {filesize : 1000000 * 5 }}).single('lecture');
const studyController = {

    async addassignments(req, res) {
    handleMultipartData(req,res, async (err) => {
            
        const {  title, description, assignments, lecture, result, batch, end_date } = req.body;
        // const filePath = req.files.assignments[0].path;
        // const video = req.files.lecture[0].path;
        const filePath = req.file.path;
         console.log(req.body)
          let document;
        try{
           document = await Study.create({
            title,
            description,
            assignments,
            lecture: filePath,
            result,
            batch,
            end_date
         });
          }
          catch(err){
             console.log(err)
          }
          res.status(201).json({
              success:true,
              data: document
          }); 
      });
    },

    async get_assignments(req,res) {
      let records;
      try{
        records= await Study.find({batch: req.params.batch});
       }
     catch(err){
        res.status(500).json({ error: err.message });
       }
     
       return res.json(records); 

},



      async download_assignment(req,res){
        let assign;
        try{
          assign= await Study.find({batch: req.params.batch});

            }
        catch(error){
          console.log(error)
        }
        //res.json(records)

        
            console.log(assign.assignments)

            for(let x of assign){
              console.log(x.assignments)
              res.download(`./${x.assignments}`);
            }
      // res.download(assign.assignments)
      //res.download(`./${x.assignments}`);

      },




}
export default studyController;