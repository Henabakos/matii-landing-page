-- CreateTable
CREATE TABLE "FooterContent" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "content" TEXT NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FooterContent_pkey" PRIMARY KEY ("id")
);
