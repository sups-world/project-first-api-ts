import prisma from '../database/index.database';

// for signup
export const userSignUp = async (
  email1: string,
  password1: string,
  name1: string,
) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: email1,
        password: password1,
        name: name1,
      },
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
