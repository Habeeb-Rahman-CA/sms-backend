import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchoolTable1779781403953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "schools" (
                "id" SERIAL NOT NULL,
                "school_name" character varying(150) NOT NULL,
                "school_code" character varying(50) NOT NULL,
                "domain" character varying(100),
                "address" text,
                "phone" character varying(20),
                "email" character varying(100) NOT NULL,
                "logo" text,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_schools_school_code" UNIQUE ("school_code"),
                CONSTRAINT "UQ_schools_domain" UNIQUE ("domain"),
                CONSTRAINT "UQ_schools_email" UNIQUE ("email"),
                CONSTRAINT "PK_schools" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "schools"`);
    }

}
