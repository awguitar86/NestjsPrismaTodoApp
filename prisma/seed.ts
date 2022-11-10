import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Tim Burns',
      email: 'timburns@testing.com',
      password: '$2y$10$eYkTNWoxVWivWozX./Se1uuu3Ia4m8kiebbMEv1CDbHdotRrSaILO',
    },
  });
  await prisma.toDo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Take Out Trash',
      userId: user.id,
    },
  });
  await prisma.toDo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Mow the lawn',
      userId: user.id,
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
