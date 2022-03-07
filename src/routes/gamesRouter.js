import { Router } from "express";
import { getGame, postGame } from '../controllers/gamesController.js';
import gameSchema from "../schemas/gameSchema.js";
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', getGame)
gamesRouter.post('/games',validateSchemaMiddleware(gameSchema), postGame);

export default gamesRouter;