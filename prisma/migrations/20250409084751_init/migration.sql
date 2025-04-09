/*
  Warnings:

  - You are about to drop the column `dictTypeId` on the `AnalysisTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnalysisTask" DROP CONSTRAINT "AnalysisTask_dictTypeId_fkey";

-- AlterTable
ALTER TABLE "AnalysisTask" DROP COLUMN "dictTypeId";
