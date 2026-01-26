import "dotenv/config";
import bcrypt from "bcrypt";

import { prisma } from "../src/lib/prisma";
import { researchData2018 } from "../src/researches/2018";
import { researchData2023 } from "../src/researches/2023";
import { researchData2024 } from "../src/researches/2024";
import { researchData2025 } from "../src/researches/2025";

const SALT_ROUNDS = 10;

async function main() {
  console.log("🚀 Starting database seeding...");

  // Seed Admin User
  console.log("\n👤 Seeding admin user...");

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { lrn: "000000000000" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", SALT_ROUNDS);

    const admin = await prisma.user.create({
      data: {
        firstName: "Admin",
        lastName: "User",
        lrn: "000000000000",
        email: "admin@cnchs.edu",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log(`✅ Admin user created: ${admin.email}`);
    console.log(`   LRN: ${admin.lrn}`);
    console.log(`   Password: admin123`);
  } else {
    console.log(`ℹ️  Admin user already exists: ${existingAdmin.email}`);
  }

  await prisma.$queryRaw`
    TRUNCATE TABLE Research;
    `;

  // Clear existing data
  await prisma.research.deleteMany();
  console.log("🗑️  Cleared existing research data.");

  // Combine all research data
  const allResearchData = [
    ...researchData2018,
    ...researchData2023,
    ...researchData2024,
    ...researchData2025,
  ];

  console.log(`📚 Total research entries to seed: ${allResearchData.length}`);

  // Seed all research entries
  let seededCount = 0;
  for (const data of allResearchData) {
    const research = await prisma.research.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        author: data.author,
        publishedAt: data.publishedAt,
      },
    });
    seededCount++;
    console.log(
      `✅ [${seededCount}/${allResearchData.length}] Seeded: ${research.title.substring(0, 50)}...`,
    );
  }

  console.log("🎉 Seeding completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   👤 Admin User: admin@cnchs.edu (LRN: 000000000000)`);
  console.log(`   📚 Research Papers:`);
  console.log(`      - 2018: ${researchData2018.length} entries`);
  console.log(`      - 2023: ${researchData2023.length} entries`);
  console.log(`      - 2024: ${researchData2024.length} entries`);
  console.log(`      - 2025: ${researchData2025.length} entries`);
  console.log(`      - Total: ${allResearchData.length} entries`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("👋 Database connection closed.");
  });
