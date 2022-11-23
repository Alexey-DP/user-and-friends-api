import { MigrationInterface, QueryRunner } from "typeorm";

export class newEntity1669129525829 implements MigrationInterface {
    name = 'newEntity1669129525829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(32) NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_following_users" ("usersId_1" uuid NOT NULL, "usersId_2" uuid NOT NULL, CONSTRAINT "PK_a41e4dcaab91b51d41267c083ea" PRIMARY KEY ("usersId_1", "usersId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f257a3163914a2e398d7bfa800" ON "users_following_users" ("usersId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a5ef04f52de98c49916c8798e" ON "users_following_users" ("usersId_2") `);
        await queryRunner.query(`ALTER TABLE "users_following_users" ADD CONSTRAINT "FK_f257a3163914a2e398d7bfa8001" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_following_users" ADD CONSTRAINT "FK_4a5ef04f52de98c49916c8798ec" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_following_users" DROP CONSTRAINT "FK_4a5ef04f52de98c49916c8798ec"`);
        await queryRunner.query(`ALTER TABLE "users_following_users" DROP CONSTRAINT "FK_f257a3163914a2e398d7bfa8001"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a5ef04f52de98c49916c8798e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f257a3163914a2e398d7bfa800"`);
        await queryRunner.query(`DROP TABLE "users_following_users"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
