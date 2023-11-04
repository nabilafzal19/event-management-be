const joi = require('joi')
const APIError = require("../utils/error.class");

const slotSchema = joi.object({
    slotName:joi.string().required(),
    startTime:joi.string().required(),
    endTime:joi.string().required(),
    price:joi.number().required(),
    capacity:joi.number().required(),
    available:joi.number(),
    venue:joi.string().required()
   
})

const checkError = (value) =>{
    if(value.error)
    throw new APIError("validation Error",
    value.error.message,
    400,
    'validateEvent')
}

class validate{
    validateSlot(req,res,next){
        try{
            const value = slotSchema.validate(req.body);
            checkError(value);
            next();

        }catch(err){
            next(err)
        }
    }
}
module.exports = new validate()