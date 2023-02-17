import { Request, Response } from 'express';
import { FindUserUseCase } from './FindUserUseCase';

export class FindUserController {
  async handle(request: Request, response: Response) {
    const { username } = request.body;

    const findUserUseCase = new FindUserUseCase();
    const result = await findUserUseCase.execute({
      username,
    });

    return response.json(result);
  }
}
