import prisma from "lib/prisma";

function File() {
  // computed field added to the prisma.file object.

  // returns all the user files in ascending order. Useful for rendering one of the charts in the dashboard.
  return Object.assign(prisma.file, {
    async sortBySize(id: string) {
      const sortedFiles = await prisma.file.findMany({
        where: {
          ownerId: id,
        },
        orderBy: {
          size: "desc",
        },
        select: {
          fileName: true,
          size: true,
        },
      });

      return sortedFiles;
    },
  });
}

export default File();
