"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckInsSchema extends Schema {
  up() {
    this.table("check_ins", table => {
      // alter table
      table.date("date_checkIn");
    });
  }

  down() {
    this.table("check_ins", table => {
      // reverse alternations
    });
  }
}

module.exports = CheckInsSchema;
