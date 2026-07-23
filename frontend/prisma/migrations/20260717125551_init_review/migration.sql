-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "overallScore" TEXT,
    "securityScore" TEXT,
    "performanceScore" TEXT,
    "qualityScore" TEXT,
    "maintainabilityScore" TEXT,
    "review" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
