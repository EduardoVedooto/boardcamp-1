import { Router } from "express";
import { getRentals, postRentals, postIdRentals, deleteIdRentals } from "../controllers/rentalsController.js"
import rentalSchema from '../schemas/rentalsSchema.js';
import validateSchemaMeddleware from '../middleware/validadeSchemaMiddleware.js'
const rentalsRouter = Router ();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals',validateSchemaMeddleware(rentalSchema), postRentals);
rentalsRouter.post('/rentals/:id/return', postIdRentals);
rentalsRouter.delete('/rentals/:id', deleteIdRentals);

export default rentalsRouter