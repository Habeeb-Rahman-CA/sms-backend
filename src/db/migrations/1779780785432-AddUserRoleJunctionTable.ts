import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRoleJunctionTable1779780785432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the old junction table
        await queryRunner.query(`DROP TABLE IF EXISTS "userole" CASCADE`);

        // Create the new user_role junction table
        await queryRunner.query(`
            CREATE TABLE "user_role" (
                "userid" integer NOT NULL,
                "roleid" integer NOT NULL,
                CONSTRAINT "PK_user_role" PRIMARY KEY ("userid", "roleid"),
                CONSTRAINT "FK_user_role_users" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_user_role_roles" FOREIGN KEY ("roleid") REFERENCES "roles"("id") ON DELETE CASCADE
            )
        `);

        // Create indexes on user_role
        await queryRunner.query(`
            CREATE INDEX "IDX_user_role_userid" ON "user_role" ("userid");
            CREATE INDEX "IDX_user_role_roleid" ON "user_role" ("roleid");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_role_roleid"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_role_userid"`);

        // Drop new table
        await queryRunner.query(`DROP TABLE IF EXISTS "user_role"`);

        // Recreate the old table userole structure in down method for reversibility
        await queryRunner.query(`
            CREATE TABLE "userole" (
                "userid" integer NOT NULL,
                "roleid" integer NOT NULL,
                CONSTRAINT "PK_userole" PRIMARY KEY ("userid", "roleid"),
                CONSTRAINT "FK_userole_users" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_userole_roles" FOREIGN KEY ("roleid") REFERENCES "roles"("id") ON DELETE CASCADE
            )
        `);
    }

}
