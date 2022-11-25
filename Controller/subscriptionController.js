import Stripe from 'stripe';
import Signup from "../model/Signup";
import User from "../model/User";


const stripe = new Stripe('sk_test_51M1mJCSGtPJ6RVFDkOun5O88ZlsOxHjQmTJlyd4O2jDiGicO3wMHVajgimv092QqTayyLDVhzcCWpbL0BpV9etF2002od2lFCv')

const subscriptionController = {
    async createNewSubs (req,res){
      let {priceId,paymentMethod}= req.body;
      console.log(req.user)
      // return
      if(req.user.id){
            let userdata= await Signup.findById( req.user.id );
         
            let name = userdata.name
            let email= userdata.email
            console.log(priceId)

            try{
              let data=await createSubscription({name,email,priceId,paymentMethod}) 
                let edit = await Signup.findByIdAndUpdate({_id: req.user.id}, {
                  paid: true
                })
                res.status(200).json({data: data, edit:edit});
                return
            }
            catch(error){
             console.log(error);
             res.status(400).json({msg: "error occured"})
             return
            }
    
      }
      else{
         res.status(500).json({ success: false});
       }

    }
    
    
}
const  createSubscription=async(createSubscriptionRequest) =>{
    // create a stripe customer
    const customer = await stripe.customers.create({
      name: createSubscriptionRequest.name,
      email: createSubscriptionRequest.email,
      payment_method: createSubscriptionRequest.paymentMethod,
      invoice_settings: {
        
        default_payment_method: createSubscriptionRequest.paymentMethod,
      },
    });


    // get the price id from the front-end
    const priceId = createSubscriptionRequest.priceId;

    // create a stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: 'any',
          },
        },
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    });

    // return the client secret and subscription id
    return {
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    };
  }
export default subscriptionController;