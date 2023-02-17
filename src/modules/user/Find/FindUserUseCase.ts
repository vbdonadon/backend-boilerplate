import { prisma } from '../../../database/prismaClient';

interface IFindUser {
  username: string;
}

export class FindUserUseCase {
  async execute({ username }: IFindUser) {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    if (user) throw new Error('Username not found or doesnt');

    return user;
  }
}
