-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL,
    "checkin" DATE NOT NULL,
    "checkout" DATE NOT NULL,
    "description" VARCHAR(150),
    "status" VARCHAR(10) NOT NULL,
    "total_price" INTEGER NOT NULL,
    "tourist_id" INTEGER NOT NULL,

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

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_activity" (
    "book_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "Book_activity_pkey" PRIMARY KEY ("activity_id","book_id")
);

-- CreateTable
CREATE TABLE "Book_room" (
    "book_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "Book_room_pkey" PRIMARY KEY ("book_id","room_id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "room_type" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "price" SMALLINT NOT NULL,
    "twin_bed" SMALLINT NOT NULL,
    "double_bed" SMALLINT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT[],
    "swimming_pool" BOOLEAN NOT NULL,
    "bath_tub" BOOLEAN NOT NULL,

    CONSTRAINT "room_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourist_info" (
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "phone_number" VARCHAR(10) NOT NULL,
    "phone_number_2" VARCHAR(10),
    "for_other" BOOLEAN NOT NULL,

    CONSTRAINT "tourist_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "tourist_id" FOREIGN KEY ("tourist_id") REFERENCES "Tourist_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_activity" ADD CONSTRAINT "book_activity_activity" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_activity" ADD CONSTRAINT "book_activity_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_book" FOREIGN KEY ("book_id") REFERENCES "Booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Book_room" ADD CONSTRAINT "book_room_room" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "room_type" FOREIGN KEY ("room_type") REFERENCES "Room_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
