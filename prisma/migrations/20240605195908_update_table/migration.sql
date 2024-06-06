-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL,
    "checkin" DATE NOT NULL,
    "description" VARCHAR(150),
    "status" VARCHAR(10) NOT NULL,
    "total_price" INTEGER NOT NULL,
    "tourist_id" INTEGER NOT NULL,
    "checkout" DATE NOT NULL,
    "datetime" TIMESTAMPTZ(6) NOT NULL,
    "adult" TEXT NOT NULL,
    "children" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" SMALLINT NOT NULL,
    "discount_price" SMALLINT NOT NULL,
    "picture" TEXT[],
    "per_person" SMALLINT NOT NULL,
    "service_time" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_activity" (
    "book_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Book_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_room" (
    "book_id" INTEGER NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "room_type_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Book_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "price" SMALLINT NOT NULL,
    "twin_bed" SMALLINT,
    "double_bed" SMALLINT,
    "description" TEXT NOT NULL,
    "picture" TEXT[],
    "swimming_pool" BOOLEAN NOT NULL,
    "bath_tub" BOOLEAN NOT NULL,

    CONSTRAINT "room_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourist_info" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "phone_number_2" VARCHAR(10),
    "for_other" BOOLEAN NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "tourist_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

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
    "status" VARCHAR(10) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Book_package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel_info" (
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Hotel_info_pkey" PRIMARY KEY ("contact","address")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "tourist_id" FOREIGN KEY ("tourist_id") REFERENCES "Tourist_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_activity" ADD CONSTRAINT "book_activity_activity" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_activity" ADD CONSTRAINT "book_activity_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_room" FOREIGN KEY ("room_type_id") REFERENCES "Room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "package_activity" FOREIGN KEY ("activity") REFERENCES "Activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "room_type_package" FOREIGN KEY ("room_type") REFERENCES "Room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_package" ADD CONSTRAINT "book_package_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_package" ADD CONSTRAINT "book_package_package" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
