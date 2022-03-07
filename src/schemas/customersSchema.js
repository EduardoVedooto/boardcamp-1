
  
  import joi from 'joi';

  const customersSchema = joi.object({
        id: joi.number().integer().required(),
        name: joi.string().required(),
        phone: joi.string().required(/^[0-9]{2}$/),
        cpf: joi.string().required().pattern(/^[a-zA-Z][0-9]$/),
        birthday: joi.string().required()
      
  })
  
  export default customersSchema;