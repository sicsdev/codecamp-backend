import Signup from "../model/Signup";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const helpController = {
  async signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      // console.log('cksvjk')
      if (!name || !email || !password || !phone) {
        return res.status(404).json({ msg: "All fields are required" });
      }

      const existingUser = await Signup.findOne({ email: email });
      if (existingUser)
        return res
          .status(400)
          .json({ msg: "An account with this email already exists." });
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const adduser = new Signup({
        name,
        email,
        password: passwordHash,
        phone,
      });
      const savedUser = await adduser.save();
      res.status(201).json({ success: true, data: savedUser });
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
      res.status(201).json({ success: true });
    } catch (err) {
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
    let document = await Signup.findOneAndUpdate({token: req.params.token },{
      password
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
  }

 
};

// // const sendResetPasswordMail = async (user) => {
// //   const { name, email, token } = user;

// //   console.log(token)
// //   try {
// //     const transporter = nodemailer.createTransport({
// //       host: "smtp.zoho.in",
// //       port: 465,
// //       requireTLS: true,
// //       auth: {
// //         user: "nidhi@smartinfocare.com",
// //         pass: "JAPktxMHJXYS",
// //       },
// //     });

// //     const mailOptions = {
// //       from: "nidhi@smartinfocare.com",
// //       to: `${email}`,
// //       subject: "For Reset Password",
// //       html: `Hi ${name}, Please check the following link and reset your password,
// //                          <a href="http://localhost:7000/api/reset-password?token=${token}">Reset link<a> 
// //                          `,
// //     };
// //     transporter.sendMail(mailOptions, function (error, info) {
// //       if (error) {
// //         console.log(error);
// //       } else {
// //         console.log("mail sent", info.response);
// //       }
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }


 
// };

export default helpController;
