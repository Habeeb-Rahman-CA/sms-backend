import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAcademicYearAndDesignation1779781850769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create academic_years table
        await queryRunner.query(`
            CREATE TABLE "academic_years" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "year_name" character varying(50) NOT NULL,
                "start_date" date NOT NULL,
                "end_date" date NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_academic_years" PRIMARY KEY ("id"),
                CONSTRAINT "FK_academic_years_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // Create designations table
        await queryRunner.query(`
            CREATE TABLE "designations" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "designation_name" character varying(100) NOT NULL,
                CONSTRAINT "PK_designations" PRIMARY KEY ("id"),
                CONSTRAINT "FK_designations_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // Modify employees table: remove text designation, add designation_id relation
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN IF EXISTS "designation"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD COLUMN "designation_id" integer`);
        await queryRunner.query(`
            ALTER TABLE "employees" 
            ADD CONSTRAINT "FK_employees_designations" 
            FOREIGN KEY ("designation_id") REFERENCES "designations"("id") ON DELETE SET NULL
        `);

        // Add indexes
        await queryRunner.query(`CREATE INDEX "IDX_academic_years_school_id" ON "academic_years" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_designations_school_id" ON "designations" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_employees_designation_id" ON "employees" ("designation_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_employees_designation_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_designations_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_academic_years_school_id"`);

        // Revert employee changes
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT IF EXISTS "FK_employees_designations"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN IF EXISTS "designation_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD COLUMN "designation" character varying(100)`);

        // Drop designations and academic_years tables
        await queryRunner.query(`DROP TABLE IF EXISTS "designations"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "academic_years"`);
    }

}
