import Joi from 'joi'

const confirmNewPasswordValidation= Joi.object(
    {
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cPassword:Joi.string().required().valid(Joi.ref('password')).messages({
            'any.only': 'Confirm password does not match with password.',
            "any.required": `"confirm password" field is a required.`,
        })
    }
)

 

export default  confirmNewPasswordValidation