import prisma from "lib/prisma";

function File() {
  return Object.assign(prisma.file, {
    hasSufficientSpace() {}, // implement it later
  });
}

export default File();
