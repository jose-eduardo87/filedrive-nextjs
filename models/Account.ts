import { prisma } from "@/lib/index";

const Account = () => Object.assign({}, prisma.account);

export default Account();
