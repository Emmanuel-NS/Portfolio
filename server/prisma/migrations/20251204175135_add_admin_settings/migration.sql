-- AlterTable
ALTER TABLE "AdminSettings" DROP COLUMN "verificationCodeHash",
ADD COLUMN     "totpSecret" TEXT NOT NULL DEFAULT '';