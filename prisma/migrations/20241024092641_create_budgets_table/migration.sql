-- CreateTable
CREATE TABLE "budgets" (
    "username" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("username")
);
