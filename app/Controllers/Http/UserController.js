"use strict";

const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const users = await User.all();

    return users;
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ auth, request, response, view }) {
    const user = await User.findOrFail(auth.user.id);
    return user;
  }

  /**
   * Display all check-in by user.
   * GET users/today
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async technologies({ auth, request, response, view }) {
    const dateToday = new Date();
    // OK - Filtra todos os usuários que fizeram check-in no dia
    // e quais foram as tecnologias foram feitas o check-in
    const techs = await User.query()
      .whereHas("technologies", ">", 0)
      .with("technologies", (builder) => {
        builder.wherePivot("date_checkIn", dateToday);
      })
      .fetch();

    return techs;
  }

  async create({ request }) {
    const data = request.only(["username", "email", "password"]);
    // cadastra um novo usuário
    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
