import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}

// middlewares:

// this middleware checks if it is a 'create' action in params.action and if it belongs to the
// 'User' model and then hashes password before saving it in the database.
prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const hashedPassword = await hash(params.args.data.password, 12);
    console.log(hashedPassword);

    params.args.data.password = hashedPassword;
  }
  const result = await next(params);

  return result;
});

export default prisma;
