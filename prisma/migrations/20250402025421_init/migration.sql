/*
  Warnings:

  - You are about to drop the column `account` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_createBy_fkey";

-- DropIndex
DROP INDEX "user_account_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "account",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "user"("username") ON DELETE SET NULL ON UPDATE CASCADE;
