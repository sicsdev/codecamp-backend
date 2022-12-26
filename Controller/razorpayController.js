import Signup from "../model/Signup";

  const Razorpay = require("razorpay");
  const instance = new Razorpay({
    key_id : "rzp_test_oHaeHtz7GnT2Ra",
    key_secret : "PEjyK9zPVwArf26flrKiXu3e"
  });
const razorpayController = {
  
    async order(req,res,next){
     
      if(req.user.id){
            let userdata= await Signup.findById( req.user.id );   
            let name = userdata.name
            let email= userdata.email
            let phone= userdata.phone

            console.log(phone)
        try {
            const options = {
            amount: 20000 * 100, // amount == Rs 10
            currency: "INR",
            receipt: "receipt#1",
       
            };
        instance.orders.create(options, async function (err, order) {
            if (err) {
            return res.status(500).json({
                message: "Something Went Wrong",
            });
            }
            console.log(order)

            let edit = await Signup.findByIdAndUpdate({_id: req.user.id}, {
              paid: true
            })
        return res.status(200).json ({data: order.id, value:order.amount, success: true, userdata:{name:name, email:email, phone:phone}});
        });
        } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
        }
      }
      else{
        alert("please login first")
      }
    },

  

    async paymentverification(req,res){
    
      res.redirect(`http://localhost:3000/`);
      return
    }
}
export default razorpayController;