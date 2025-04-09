/*
  Warnings:

  - You are about to drop the `AnalysisTaskResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ValveOperatingDataList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnalysisTaskResult" DROP CONSTRAINT "AnalysisTaskResult_analysisTaskId_fkey";

-- DropForeignKey
ALTER TABLE "ValveOperatingDataList" DROP CONSTRAINT "ValveOperatingDataList_valveId_fkey";

-- AlterTable
ALTER TABLE "AnalysisTask" ADD COLUMN     "result" INTEGER[];

-- DropTable
DROP TABLE "AnalysisTaskResult";

-- DropTable
DROP TABLE "ValveOperatingDataList";

-- CreateTable
CREATE TABLE "ValveOperatingData" (
    "id" SERIAL NOT NULL,
    "valveId" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "data" JSONB,

    CONSTRAINT "ValveOperatingData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ValveOperatingData" ADD CONSTRAINT "ValveOperatingData_valveId_fkey" FOREIGN KEY ("valveId") REFERENCES "Valve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
