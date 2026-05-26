import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGlobalTables1779781522972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create countries table
        await queryRunner.query(`
            CREATE TABLE "countries" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "code" character varying(10) NOT NULL,
                "phone_code" character varying(10),
                CONSTRAINT "UQ_countries_name" UNIQUE ("name"),
                CONSTRAINT "UQ_countries_code" UNIQUE ("code"),
                CONSTRAINT "PK_countries" PRIMARY KEY ("id")
            )
        `);

        // Create states table
        await queryRunner.query(`
            CREATE TABLE "states" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "code" character varying(10),
                "country_id" integer NOT NULL,
                CONSTRAINT "PK_states" PRIMARY KEY ("id"),
                CONSTRAINT "FK_states_countries" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE RESTRICT
            )
        `);

        // Create genders table
        await queryRunner.query(`
            CREATE TABLE "genders" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "code" character varying(10),
                CONSTRAINT "UQ_genders_name" UNIQUE ("name"),
                CONSTRAINT "UQ_genders_code" UNIQUE ("code"),
                CONSTRAINT "PK_genders" PRIMARY KEY ("id")
            )
        `);

        // Create permissions table
        await queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "description" character varying(255),
                CONSTRAINT "UQ_permissions_name" UNIQUE ("name"),
                CONSTRAINT "PK_permissions" PRIMARY KEY ("id")
            )
        `);

        // Create index on states.country_id
        await queryRunner.query(`
            CREATE INDEX "IDX_states_country_id" ON "states" ("country_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop index
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_states_country_id"`);

        // Drop tables in safe order
        await queryRunner.query(`DROP TABLE IF EXISTS "permissions"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "genders"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "states"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "countries"`);
    }

}
