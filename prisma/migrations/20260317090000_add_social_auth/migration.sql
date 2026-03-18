ALTER TABLE "User"
ALTER COLUMN "password" DROP NOT NULL,
ADD COLUMN "googleId" TEXT,
ADD COLUMN "facebookId" TEXT;

CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");
