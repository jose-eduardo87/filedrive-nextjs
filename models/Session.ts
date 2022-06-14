import { prisma } from "@/lib/index";

const Session = () => Object.assign({}, prisma.session);

export default Session();
