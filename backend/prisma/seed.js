const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
    },
  });

  console.log("Test user created successfully");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    prisma.$disconnect();
  });