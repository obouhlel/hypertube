import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const oussama = await prisma.user.upsert({
    where: { email: "oussama_bouhlel@outlook.fr" },
    update: {},
    create: {
      email: "oussama_bouhlel@outlook.fr",
      name: "Oussama",
    },
  });
  console.log({ oussama });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
