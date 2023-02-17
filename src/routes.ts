import { Router } from 'express'

import { CreateUserController } from './modules/user/Create/CreateUserController'

const routes = Router()

const createUserController = new CreateUserController()

routes.post('/user/create/', createUserController.handle)

export { routes }
