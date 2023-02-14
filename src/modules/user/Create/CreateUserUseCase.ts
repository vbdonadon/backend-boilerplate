import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt"

import { PasswordValidation } from "../../../utils/passwordValidator";

interface ICreateUser {
  username: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ username, password }: ICreateUser) {
    const usernameAlreadyExist = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    if (usernameAlreadyExist) throw new Error('Username already exist!');
    
    const validatePassword = await PasswordValidation(password);

    console.log(validatePassword)

    if (validatePassword.length >= 1) throw new Error(`The password is missing the following requirements: ${validatePassword}`);
    
    const hashPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword
      },
      select: {
        id: true,
        username: true,
        created_at: true
      }
    });

    return user;
  }
}