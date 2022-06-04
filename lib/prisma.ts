import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// MIDDLEWARES:

// performs a soft delete when user deletes account. It changes the request action to 'update' and sets the 'active' property to false
prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "delete") {
    params.action = "update";
    params.args["data"] = { active: false };

    // RODAR O deleteUserFolder AQUI OU DENTRO DO ENDPOINT??? TALVEZ FAÇA MAIS SENTIDO RODAR AQUI...
  }

  return next(params);
});

export default prisma;
