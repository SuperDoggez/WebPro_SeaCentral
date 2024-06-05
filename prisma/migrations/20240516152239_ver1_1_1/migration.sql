-- AlterTable
CREATE SEQUENCE tourist_info_id_seq;
ALTER TABLE "Tourist_info" ALTER COLUMN "id" SET DEFAULT nextval('tourist_info_id_seq');
ALTER SEQUENCE tourist_info_id_seq OWNED BY "Tourist_info"."id";
