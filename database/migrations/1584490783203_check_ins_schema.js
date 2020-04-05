"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

// Histórico de Check-ins das Tecnlogias
class CheckInsSchema extends Schema {
  up() {
    this.create("check_ins", table => {
      table.increments();
      // Id do Usuário
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      // Id da Tecnologia
      table
        .integer("technology_id")
        .unsigned()
        .references("id")
        .inTable("technologies")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      // Data do Check-in
      table.timestamps();
    });
  }

  down() {
    this.drop("check_ins");
  }
}

module.exports = CheckInsSchema;
