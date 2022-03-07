import { Router } from "express";
import { getRentals, postRentals, postIdRentals, deleteIdRentals } from "../controllers/rentalsController.js"
import rentalSchema from '../schemas/rentalsSchema.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js'
const rentalsRouter = Router ();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals',validateSchemaMiddleware(rentalSchema), postRentals);
rentalsRouter.post('/rentals/:id/return', postIdRentals);
rentalsRouter.delete('/rentals/:id', deleteIdRentals);

export default rentalsRouter