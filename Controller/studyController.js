
import Study from "../model/Study";
import multer from "multer";
import path from 'path';
import fs from 'fs';


const storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
    
    });

const handleMultipartData = multer({ storage, limit: {filesize : 1000000 * 5 }}).fields([{name: 'assignments'},{name: 'lecture'}])

const studyController = {

    async addassignments(req, res) {
    handleMultipartData(req,res, async (err) => {
            
        const {  title, description, assignments, lecture, result, batch } = req.body;
        const filePath = req.files.assignments[0].path;
        const video = req.files.lecture[0].path;
       console.log(req.body)
          let document;
        try{
           document = await Study.create({
            title,
            description,
            assignments: filePath,
            lecture: video,
            result,
            batch
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
    }

}
export default studyController;