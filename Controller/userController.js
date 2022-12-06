import User from "../model/User";
import multer from "multer";
import path from 'path';
import fs from 'fs';


  const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
      
    });

const handleMultipartData = multer({ storage, limit: {filesize : 1000000 * 5 }}).single('resume');
const userController = {

    async apply(req, res) {
            handleMultipartData(req,res, async (err) => {

                const { name, email, phone, linkedin, resume, reference } = req.body;
                const filePath = req.file.path;
                  console.log(filePath)
                  let document;
                try{
                   document = await User.create({
                    name,
                    email,
                    phone,
                    linkedin, 
                    resume: filePath,
                    reference

                });
                      console.log(document);
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
            async index(req, res) {
              const userdata = await User.find(
              );
               res.status(201).json(userdata);
             
            },
            async download(req,res){
              let records;
              try{
                    records= await User.findById( req.query.id );

                   }
              catch(error){
                console.log(error)
              }
              //res.json(records)
              console.log
             res.download(records.resume)
             // res.download(`./${records.resume}`);
          
            }                    
}
export default userController;