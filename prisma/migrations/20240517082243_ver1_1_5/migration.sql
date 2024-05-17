-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "price" SMALLINT NOT NULL,
    "picture" TEXT[],
    "description" TEXT NOT NULL,
    "room_type" INTEGER NOT NULL,
    "activity" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_package" (
    "book_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "Book_package_pkey" PRIMARY KEY ("book_id","package_id")
);

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "room_type_package" FOREIGN KEY ("room_type") REFERENCES "Room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "package_activity" FOREIGN KEY ("activity") REFERENCES "Activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_package" ADD CONSTRAINT "book_package_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_package" ADD CONSTRAINT "book_package_package" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
