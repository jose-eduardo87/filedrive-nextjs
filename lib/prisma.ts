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

// performs a soft delete when user deletes account. It changes the request action to 'update' and sets the 'active' property to false. Also, it deletes user's folder on S3,
// user's profile image on Cloduinary, and sessions and account in the database.
// Sadly, none of my attempts to use middleware worked. That would provide a really clean solution to this use-case but for some reason it just ends up running multiple instances
// of middlewares.
// prisma.$use(async (params, next) => {
//   if (params.model === "User" && params.action === "delete") {
//     params.action = "update";
//     params.args["data"] = { active: false };

//     // console.log("prisma object?", this);
//     // console.log("params", params);

//   }

//   return next(params);
// });

export default prisma;
