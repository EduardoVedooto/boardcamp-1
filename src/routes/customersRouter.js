import { Router } from "express";
import { getCustomers,  postCustomers, getIdCustomers, putCustomers } from "../controllers/customersController.js";
import customersSchema from "../schemas/customersSchema.js";
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware';

const customersRouter = Router ();

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', getIdCustomers)
customersRouter.post('/customers',validateSchemaMiddleware(customersSchema), postCustomers);
customersRouter.put('/customers/:id',validateSchemaMiddleware(customersSchema), putCustomers)

export default customersRouter;