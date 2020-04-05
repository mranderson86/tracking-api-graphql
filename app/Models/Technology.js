"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Technology extends Model {
  users() {
    return this.belongsToMany("App/Models/User").pivotTable("check_ins");
  }
}

module.exports = Technology;
