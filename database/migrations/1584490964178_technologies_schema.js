"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

// Cadastro de Tecnlogias
class TechnologiesSchema extends Schema {
  up() {
    this.create("technologies", table => {
      table.increments();
      table
        .string("technology", 80)
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("technologies");
  }
}

module.exports = TechnologiesSchema;
