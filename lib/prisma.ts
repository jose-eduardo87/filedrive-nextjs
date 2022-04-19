import { Location, PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

type FileFrontend = {
  fileName: string;
  id: string;
  location: Location | null;
  size: number;
  url: string;
}[];

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

// function that returns computed fields extended to the prisma object:
function User() {
  return Object.assign(prisma.user, {
    // computed field added to the prisma.user object. Logs user by finding it by its ID.
    async login(id: string) {
      return Object.assign(
        await prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            files: {
              select: {
                fileName: true,
                id: true,
                location: true,
                size: true,
                url: true,
              },
            },
          },
        }),
        {
          // computed field added only to logged in users. Returns available space.
          getAvailableSpace(filesArray: FileFrontend) {
            const usedSpace = filesArray.reduce(
              (accumulator, currentValue) => accumulator + currentValue.size,
              0
            );

            return {
              freeSpace: (10485760 - usedSpace) * 0.00000095367432,
              usedSpace: usedSpace * 0.00000095367432,
            };
          },
        }
      );
    },
  });
}

export default prisma;
export const user = User();
export const file = prisma.file;
