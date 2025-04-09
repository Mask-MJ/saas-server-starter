/*
  Warnings:

  - You are about to drop the `ValveHistoryDataList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ValveHistoryDataList" DROP CONSTRAINT "ValveHistoryDataList_valveId_fkey";

-- DropTable
DROP TABLE "ValveHistoryDataList";

-- CreateTable
CREATE TABLE "ValveOperatingDataList" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "valveId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,

    CONSTRAINT "ValveOperatingDataList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ValveOperatingDataList" ADD CONSTRAINT "ValveOperatingDataList_valveId_fkey" FOREIGN KEY ("valveId") REFERENCES "Valve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
