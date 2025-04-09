/*
  Warnings:

  - Added the required column `pdfs` to the `AnalysisTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalysisTask" ADD COLUMN     "pdfs" JSONB NOT NULL;
