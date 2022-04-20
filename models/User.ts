import prisma from "lib/prisma";
import type { Location } from "prisma/prisma-client";

type FileFrontend = {
  fileName: string;
  id: string;
  location: Location | null;
  size: number;
  url: string;
}[];

function User() {
  return Object.assign(prisma.user, {
    // computed field added to the prisma.user object. Logs user by finding it by ID.
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
        // computed field available only to logged in users. Useful because it would not be interesting to have this method available in prisma.user.
        // Returns available space information.
        {
          getAvailableSpace(filesArray: FileFrontend) {
            const usedSpace = filesArray.reduce(
              (accumulator, currentValue) => accumulator + currentValue.size,
              0
            );

            return {
              // values are converted from B to MB
              freeSpace: (10485760 - usedSpace) * 0.00000095367432,
              usedSpace: usedSpace * 0.00000095367432,
            };
          },
        }
      );
    },
  });
}

export default User();
