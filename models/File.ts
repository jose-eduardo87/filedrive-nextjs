import { prisma } from "@/lib/index";

function File() {
  // computed field added to the prisma.file object.

  // returns all the user files in 'Drive' in descending order. Useful for rendering the polar chart in the dashboard.
  return Object.assign(prisma.file, {
    async sortBySize(id: string) {
      const sortedFiles = await prisma.file.findMany({
        where: {
          ownerId: id,
          location: "DRIVE",
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
