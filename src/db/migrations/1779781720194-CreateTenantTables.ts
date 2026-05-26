import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTenantTables1779781720194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Create classes table
        await queryRunner.query(`
            CREATE TABLE "classes" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "name" character varying(50) NOT NULL,
                "code" character varying(20),
                CONSTRAINT "PK_classes" PRIMARY KEY ("id"),
                CONSTRAINT "FK_classes_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // 2. Create sections table
        await queryRunner.query(`
            CREATE TABLE "sections" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "class_id" integer NOT NULL,
                "name" character varying(50) NOT NULL,
                CONSTRAINT "PK_sections" PRIMARY KEY ("id"),
                CONSTRAINT "FK_sections_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_sections_classes" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE
            )
        `);

        // 3. Create subjects table
        await queryRunner.query(`
            CREATE TABLE "subjects" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "name" character varying(100) NOT NULL,
                "code" character varying(20),
                CONSTRAINT "PK_subjects" PRIMARY KEY ("id"),
                CONSTRAINT "FK_subjects_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // 4. Create students table
        await queryRunner.query(`
            CREATE TABLE "students" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "user_id" integer,
                "class_id" integer NOT NULL,
                "section_id" integer NOT NULL,
                "admission_number" character varying(50) NOT NULL,
                "roll_number" character varying(50),
                "date_of_birth" date,
                "gender_id" integer,
                CONSTRAINT "PK_students" PRIMARY KEY ("id"),
                CONSTRAINT "FK_students_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_students_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL,
                CONSTRAINT "FK_students_classes" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_students_sections" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE RESTRICT,
                CONSTRAINT "FK_students_genders" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE SET NULL
            )
        `);

        // 5. Create parents table
        await queryRunner.query(`
            CREATE TABLE "parents" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "user_id" integer,
                "relation" character varying(50),
                "phone" character varying(20),
                CONSTRAINT "PK_parents" PRIMARY KEY ("id"),
                CONSTRAINT "FK_parents_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_parents_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
            )
        `);

        // 6. Create employees table
        await queryRunner.query(`
            CREATE TABLE "employees" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "user_id" integer,
                "employee_code" character varying(50),
                "designation" character varying(100),
                "phone" character varying(20),
                CONSTRAINT "PK_employees" PRIMARY KEY ("id"),
                CONSTRAINT "FK_employees_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_employees_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL
            )
        `);

        // 7. Create attendances table
        await queryRunner.query(`
            CREATE TABLE "attendances" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "student_id" integer NOT NULL,
                "class_id" integer NOT NULL,
                "section_id" integer NOT NULL,
                "date" date NOT NULL,
                "status" character varying(20) NOT NULL,
                CONSTRAINT "PK_attendances" PRIMARY KEY ("id"),
                CONSTRAINT "FK_attendances_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_attendances_students" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_attendances_classes" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_attendances_sections" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE
            )
        `);

        // 8. Create exams table
        await queryRunner.query(`
            CREATE TABLE "exams" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "name" character varying(100) NOT NULL,
                "start_date" date,
                "end_date" date,
                CONSTRAINT "PK_exams" PRIMARY KEY ("id"),
                CONSTRAINT "FK_exams_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // 9. Create exam_marks table
        await queryRunner.query(`
            CREATE TABLE "exam_marks" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "exam_id" integer NOT NULL,
                "student_id" integer NOT NULL,
                "subject_id" integer NOT NULL,
                "marks_obtained" numeric(5,2) NOT NULL,
                "max_marks" numeric(5,2) NOT NULL,
                CONSTRAINT "PK_exam_marks" PRIMARY KEY ("id"),
                CONSTRAINT "FK_exam_marks_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_exam_marks_exams" FOREIGN KEY ("exam_id") REFERENCES "exams"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_exam_marks_students" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_exam_marks_subjects" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE
            )
        `);

        // 10. Create fees table
        await queryRunner.query(`
            CREATE TABLE "fees" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "name" character varying(100) NOT NULL,
                "amount" numeric(10,2) NOT NULL,
                "due_date" date,
                CONSTRAINT "PK_fees" PRIMARY KEY ("id"),
                CONSTRAINT "FK_fees_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // 11. Create fee_payments table
        await queryRunner.query(`
            CREATE TABLE "fee_payments" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "fee_id" integer NOT NULL,
                "student_id" integer NOT NULL,
                "amount_paid" numeric(10,2) NOT NULL,
                "payment_date" date NOT NULL,
                "payment_method" character varying(50),
                CONSTRAINT "PK_fee_payments" PRIMARY KEY ("id"),
                CONSTRAINT "FK_fee_payments_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_fee_payments_fees" FOREIGN KEY ("fee_id") REFERENCES "fees"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_fee_payments_students" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE
            )
        `);

        // 12. Create timetables table
        await queryRunner.query(`
            CREATE TABLE "timetables" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "class_id" integer NOT NULL,
                "section_id" integer NOT NULL,
                "subject_id" integer NOT NULL,
                "employee_id" integer,
                "day_of_week" integer NOT NULL,
                "start_time" time NOT NULL,
                "end_time" time NOT NULL,
                CONSTRAINT "PK_timetables" PRIMARY KEY ("id"),
                CONSTRAINT "FK_timetables_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_timetables_classes" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_timetables_sections" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_timetables_subjects" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_timetables_employees" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL
            )
        `);

        // 13. Create notifications table
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" SERIAL NOT NULL,
                "school_id" integer NOT NULL,
                "title" character varying(150) NOT NULL,
                "content" text NOT NULL,
                "sent_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_notifications" PRIMARY KEY ("id"),
                CONSTRAINT "FK_notifications_schools" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE CASCADE
            )
        `);

        // Create indexes for optimization
        await queryRunner.query(`CREATE INDEX "IDX_classes_school_id" ON "classes" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_sections_school_id" ON "sections" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_subjects_school_id" ON "subjects" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_students_school_id" ON "students" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_parents_school_id" ON "parents" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_employees_school_id" ON "employees" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_attendances_school_id" ON "attendances" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_exams_school_id" ON "exams" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_exam_marks_school_id" ON "exam_marks" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_fees_school_id" ON "fees" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_fee_payments_school_id" ON "fee_payments" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_timetables_school_id" ON "timetables" ("school_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_notifications_school_id" ON "notifications" ("school_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_notifications_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_timetables_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_fee_payments_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_fees_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_exam_marks_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_exams_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_attendances_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_employees_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_parents_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_students_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_subjects_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sections_school_id"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_classes_school_id"`);

        // Drop tables in reverse creation order to satisfy constraints
        await queryRunner.query(`DROP TABLE IF EXISTS "notifications"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "timetables"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "fee_payments"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "fees"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "exam_marks"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "exams"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "attendances"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "employees"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "parents"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "students"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "subjects"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "sections"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "classes"`);
    }

}
