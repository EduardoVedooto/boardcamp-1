import { Router } from "express";
import { getCategory, postCategory } from '../controllers/categoriesController.js'
import categorySchema from "../schemas/categoriesSchema.js";
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';



const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategory);
categoriesRouter.post('/categories',validateSchemaMiddleware(categorySchema), postCategory);

export default categoriesRouter;