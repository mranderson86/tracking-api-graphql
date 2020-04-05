"use strict";

const CheckInModel = use("App/Models/CheckIn");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with checkins
 */
class CheckInController {
  async user({ auth, request, response, view }) {
    const user = await User.findOrFail(auth.user.id);
    const dateToday = new Date();

    const tech = await user
      .technologies()
      .wherePivot("date_checkIn", dateToday)
      .fetch();

    return tech;
  }

  /**
   * Show a list of all checkins.
   * GET checkins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new checkin.
   * POST checkins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    // Converte um objeto em array
    const technologies = Object.values(request.body);

    const data = technologies.map((tech) => {
      const { technology_id } = tech;
      return {
        technology_id,
        user_id: auth.user.id,
        date_checkIn: new Date(),
      };
    });

    const checkins = await CheckInModel.createMany(data);
    return checkins;
  }

  /**
   * Display a single checkin.
   * GET checkins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const checkIn = await CheckInModel.findOrFail(params.id);

    return checkIn;
  }

  /**
   * Update checkin details.
   * PUT or PATCH checkins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a checkin with id.
   * DELETE checkins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const checkIn = await checkInModel.findOrFail(params.id);

    await checkIn.delete();
  }
}

module.exports = CheckInController;
