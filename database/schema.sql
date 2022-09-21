set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
    "userId" serial NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."knockoutStage" (
    "knockoutStageId" serial not null,
    "bracketId" integer NOT NULL,
    "game49" integer NOT NULL,
    "game50" integer NOT NULL,
    "game51" integer NOT NULL,
    "game52" integer NOT NULL,
    "game53" integer NOT NULL,
    "game54" integer NOT NULL,
    "game55" integer NOT NULL,
    "game56" integer NOT NULL,
    "game57" integer NOT NULL,
    "game58" integer NOT NULL,
    "game59" integer NOT NULL,
    "game60" integer NOT NULL,
    "game61" integer NOT NULL,
    "game62" integer NOT NULL,
    "game63" integer NOT NULL,
    CONSTRAINT "knockoutStage_pk" PRIMARY KEY ("knockoutStageId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."teams" (
    "teamId" serial NOT NULL,
    "countryName" TEXT NOT NULL,
    "countryFlag" TEXT NOT NULL,
    "coach" TEXT NOT NULL,
    "fifaRank" integer NOT NULL,
    "websiteLink" TEXT NOT NULL,
    "prevWC" TEXT NOT NULL,
    "fifthGame" char(1) NOT NULL,
    "fourthGame" char(1) NOT NULL,
    "thirdGame" char(1) NOT NULL,
    "secondGame" char(1) NOT NULL,
    "firstGame" char(1) NOT NULL,
    CONSTRAINT "teams_pk" PRIMARY KEY ("teamId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."brackets" (
    "bracketId" serial NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL default now(),
    "userId" integer NOT NULL,
    "bracketName" TEXT NOT NULL,
    CONSTRAINT "brackets_pk" PRIMARY KEY ("bracketId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."groupStage" (
    "groupStageId" serial not null,
    "bracketId" integer NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL default now(),
    "a1" integer NOT NULL,
    "a2" integer NOT NULL,
    "b1" integer NOT NULL,
    "b2" integer NOT NULL,
    "c1" integer NOT NULL,
    "c2" integer NOT NULL,
    "d1" integer NOT NULL,
    "d2" integer NOT NULL,
    "e1" integer NOT NULL,
    "e2" integer NOT NULL,
    "f1" integer NOT NULL,
    "f2" integer NOT NULL,
    "g1" integer NOT NULL,
    "g2" integer NOT NULL,
    "h1" integer NOT NULL,
    "h2" integer NOT NULL,
    CONSTRAINT "groupStage_pk" PRIMARY KEY ("groupStageId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "knockoutStage" ADD CONSTRAINT "knockoutStage_fk0" FOREIGN KEY ("bracketId") REFERENCES "brackets"("bracketId");
ALTER TABLE "brackets" ADD CONSTRAINT "brackets_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "groupStage" ADD CONSTRAINT "groupStage_fk0" FOREIGN KEY ("bracketId") REFERENCES "brackets"("bracketId");
