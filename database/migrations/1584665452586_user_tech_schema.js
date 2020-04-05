"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserTechSchema extends Schema {
  up() {
    this.create("user_tech", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("cascade")
        .index("user_id");
      table
        .integer("technology_id")
        .unsigned()
        .references("technologies.id")
        .onDelete("cascade")
        .index("technology_id");
      table.date("date_checkIn");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_tech");
  }
}

module.exports = UserTechSchema;
