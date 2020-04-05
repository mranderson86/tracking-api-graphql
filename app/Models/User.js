"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeSave", async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  // Um usuário pode ter muitos check-ins
  checkins() {
    return this.hasMany("App/Models/CheckIn");
    //return this.belongsToMany("App/Models/Technology").pivotTable("CheckIn");
  }

  technologies() {
    return this.belongsToMany("App/Models/Technology").pivotTable("check_ins");
  }

  // Um usuário pode ter muitas tecnologias
  //  technologies() {
  //  return this.hasMany("App/Models/Technology");
  //}
}

module.exports = User;
