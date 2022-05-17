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

// middlewares:

// Password hashing before info gets persisted in database.
// prisma.$use(async (params, next) => {
//   // checks if model belongs to 'User' and to 'create' action
//   if (params.model === "User" && params.action === "create") {
//     // all the logic BEFORE 'await next(params)' will run before the creation of the document. This is comparable to the '.pre()' middleware in mongoose.
//     const hashedPassword = await hash(params.args.data.password, 12);
//     console.log("running!", hashedPassword);

//     params.args.data.password = hashedPassword;
//   }
//   const result = await next(params);
//   // all the logic AFTER this point will run after the creation of the document. Comparable to the '.post()' middleware in mongoose.

//   return await next(params);
// });

export default prisma;
