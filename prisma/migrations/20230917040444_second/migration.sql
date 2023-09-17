/*
  Warnings:

  - You are about to drop the column `class` on the `students` table. All the data in the column will be lost.
  - Added the required column `classSchool` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_students" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "classSchool" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_students" ("created", "id", "name", "school", "updated") SELECT "created", "id", "name", "school", "updated" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
