import { Router } from 'express';

import { CreateUserController } from './modules/user/Create/CreateUserController';
import { FindUserController } from './modules/user/Find/FindUserController';

const routes = Router();

const createUserController = new CreateUserController();
const findUserController = new FindUserController();

routes.post('/user/create/', createUserController.handle);
routes.get('/user/find', findUserController.handle);

export { routes };
