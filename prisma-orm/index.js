const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Create a new person
  //   const newPerson = await prisma.persons.createMany({
  //     data: [
  //       {
  //         email: 'janedoe@example.com',
  //         name: 'Jane Doe',
  //       },
  //     {
  //         email: 'test@example.com',
  //         name: 'test Doe',
  //     }
  //     ],
  //   });
  //   console.log('Created new user:', newPerson);

  // const persons = await prisma.persons.findMany();
  // console.log(persons);

  // const person = await prisma.persons.findUnique({
  //     where: {
  //         id: 3,
  //     },
  // });
  // console.log(person);

  // const updatedPerson = await prisma.persons.update({
  //     where: {
  //         id: 3,
  //     },
  //     data: {
  //         email: 'updatedemail@example.com',
  //         name: 'Updated Name',
  //     },
  // });

  const deletedPerson = await prisma.persons.delete({
    where: {
      id: 5,
    },
  });
  console.log('Deleted person:', deletedPerson);
  
}
main().finally(async () => {
  await prisma.$disconnect();
});
