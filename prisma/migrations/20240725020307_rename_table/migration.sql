/*
  Warnings:

  - You are about to drop the column `indepedency_Level` on the `animals` table. All the data in the column will be lost.
  - Added the required column `independency_Level` to the `animals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndependencyLevel" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- AlterTable
ALTER TABLE "animals" DROP COLUMN "indepedency_Level",
ADD COLUMN     "independency_Level" "IndependencyLevel" NOT NULL;

-- DropEnum
DROP TYPE "IndepedencyLevel";
