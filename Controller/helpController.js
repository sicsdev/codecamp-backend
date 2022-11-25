import Signup from "../model/Signup";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import multer from "multer";

const jwt = require("jsonwebtoken");
const SECRET_KEY= "MYSECRETKEY"


const storage = multer.diskStorage({
 
  destination: (req,file,cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
    
    });

  const handleMultipartData = multer({ storage, limit: {filesize : 1000000 * 5 }}).single('image');

const helpController = {

  async signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;


      const existingUser = await Signup.findOne({ email: email });
      if (existingUser)
        return res
          .status(400).json({ msg: "An account with this email already exists." });
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
              console.log(passwordHash);
      const adduser = new Signup({
        name,
        email,
        password: passwordHash,
        phone,
      });
      const savedUser = await adduser.save();
      // res.status(201).json({ success: true, data: savedUser});
      const token = jwt.sign({email:savedUser.email, id: savedUser._id, role:savedUser.role}, SECRET_KEY)
      res.status(201).json({data: savedUser, authtoken: token})

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "all fields required" });
      }
      const user = await Signup.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials." });


     // res.status(201).json({ success: true, data:user._id });

      const token = jwt.sign({email:user.email, id: user._id,role: user.role}, SECRET_KEY)
      res.status(201).json({success: true,authtoken: token, role: user.role})


      
    }
     catch (err) {
      res.status(500).json({ error: err.message });
    }  

  },


    async resetpassword(req,res) {

        console.log("check",req.query.token)
 
     let user =  await Signup.findOne({token: req.query.token});
        console.log(user);
         if (!user) return res.status(400).send("invalid link ");

         res.redirect(`http://localhost:3000/reset-password/?token=${req.query.token}`);
   
  },
  async confirmpassword(req,res) {
    const { password } = req.body;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      
    let document = await Signup.findOneAndUpdate({token: req.params.token },{
          password: passwordHash,
    });

    
    res.status(201).json({ success: true, data: document });
},
  

  async forgetpassword(req, res) {
    const { email } = req.body;

    try {
      const user = await Signup.findOne({ email: email });
        if(!user){
          res.status(500).json({ msg: "invalid" });
        }
        let newToken = Math.floor(Math.random() * 1000000 + 1);
        user.token = newToken;

        user.save().then((result) => {
          const transporter = nodemailer.createTransport({
                  host: "smtp.zoho.in",
                  port: 465,
                  requireTLS: true,
                  auth: {
                    user: "nidhi@smartinfocare.com",
                    pass: "JAPktxMHJXYS",
                  },
                });
            transporter.sendMail({
            from: "nidhi@smartinfocare.com",
            to: user.email,
            subject: "For Reset Password",
            html: ` Please check the following link and reset your password,
            <a href="http://localhost:7000/api/reset-password?token=${newToken}">Reset link<a> 
            `,
           
          }, (error,info) => {
            if (error) {
              console.log(error);
            } else {
              res.send("mail sent sucessfully.");
            }
  
          })
        
        })
      }
    catch(err) {
      res.status(500).json({ error: err.message });
    }
  },

    async userpofile(req, res){
      let records;
  
      try{
         records= await Signup.findById( req.user.id);
        }
      catch(err){
         res.status(500).json({ error: err.message });
        }
        return res.json(records); 
      },
      async editrecordform(req, res){
        let findrecords;
      
        try{
          findrecords= await Signup.findById( req.user.id );
          }
        catch(err){
           res.status(500).json({ error: err.message });
          }
          return res.json(findrecords); 
        },

      async editprofile(req,res,next){
  

                const  { name, email, password, phone } = req.body;
                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);
                let editrecords;
                try{
                  editrecords = await Signup.findOneAndUpdate({_id: req.user.id },{
                        name,
                        email,
                        password: passwordHash,
                        phone,
                     
                    });
                }
                catch(err){
                    return next(err);
                }

                res.status(201).json(editrecords);
      
      },


        // async existingid(req, res){
        //   let ids;
         
        //   try{
        //      ids= await Signup.findById( req.user.id );
        //     }
        //   catch(err){
        //      res.status(500).json({ error: err.message });
        //     }
        //     return res.json({success: true}); 
        //   },


          async imageupload(req,res) {

          //  console.log(req.user.id)
                handleMultipartData(req,res, async (err) => {
                  const filePath = req.file.path;
                  console.log(filePath)
                  let imageupload;
                  try{
                    imageupload = await Signup.findOneAndUpdate({_id: req.user.id },{
                         
                          image: filePath
                       
                      });
                    }
                 
                  catch(err){
                    console.log(err)
                  }
                  res.status(201).json(imageupload);
              
              });

         

          },
      
            async listusers(req, res) {
              const userdata = await Signup.find( {role: 0} 
              );
              
               res.status(201).json(userdata);
             
            },

    
  

 
};


export default helpController;
