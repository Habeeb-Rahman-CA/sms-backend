import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndRoleTables1779779944325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create roles table
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                CONSTRAINT "UQ_roles_name" UNIQUE ("name"),
                CONSTRAINT "PK_roles" PRIMARY KEY ("id")
            )
        `);

        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "email" character varying(100) NOT NULL,
                "password" character varying(255) NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        // Create userole junction table
        await queryRunner.query(`
            CREATE TABLE "userole" (
                "userid" integer NOT NULL,
                "roleid" integer NOT NULL,
                CONSTRAINT "PK_userole" PRIMARY KEY ("userid", "roleid"),
                CONSTRAINT "FK_userole_users" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_userole_roles" FOREIGN KEY ("roleid") REFERENCES "roles"("id") ON DELETE CASCADE
            )
        `);

        // Create index on userole for faster queries
        await queryRunner.query(`
            CREATE INDEX "IDX_userole_userid" ON "userole" ("userid");
            CREATE INDEX "IDX_userole_roleid" ON "userole" ("roleid");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX "IDX_userole_roleid"`);
        await queryRunner.query(`DROP INDEX "IDX_userole_userid"`);

        // Drop junction table
        await queryRunner.query(`DROP TABLE "userole"`);

        // Drop users and roles tables
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
