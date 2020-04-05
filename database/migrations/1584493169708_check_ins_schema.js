"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckInsSchema extends Schema {
  up() {
    this.table("check_ins", table => {
      table
        .integer("technology_id")
        .unsigned()
        .references("id")
        .inTable("technologies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("check_ins", table => {
      // reverse alternations
    });
  }
}

module.exports = CheckInsSchema;
