"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CheckInsSchema extends Schema {
  up() {
    this.table("check_ins", table => {
      // alter table
      table.timestamp("date_check_in", { useTz: false });
    });
  }

  down() {
    this.table("check_ins", table => {
      // reverse alternations
    });
  }
}

module.exports = CheckInsSchema;
