import Lead from "../model/Lead";


const leadController = {
    async feedbackdata(req,res,next)
    {
            const  { userId, feedback, status, interest, call, screening, interview, test, selected} = req.body;
            let data;
            try{
                data = await Lead.create({
                    userId,
                    feedback,
                    status,
                    interest,
                    call,
                    screening,
                    interview,
                    test,   
                    selected,
                  
                });
            }
            catch(err){
                return next(err);
            }

            res.status(201).json(data);
      
}
}
export default leadController;