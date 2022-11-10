import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { id: 1 },
    update: { password: 'coolbeansdude' },
    create: {
      name: 'Tim Burns',
      email: 'timburns@testing.com',
      password: 'coolbeansdude',
      toDos: {
        create: {
          title: 'Wash Car',
        },
      },
    },
  });
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
