"use strict";

const Technology = use("App/Models/Technology");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with technologies
 */
class TechnologyController {
  /**
   * Show a list of all technologies.
   * GET technologies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const technologies = await Technology.all();

    return technologies;
  }

  /**
   * Show a list of all technologies available for current user.
   * api/technologies/available
   * GET technologies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async available({ request, response }) {
    const dateToday = new Date();

    const technologies = await Technology.query()
      .whereHas("users", ">", 0)
      .with("users", builder => {
        builder.wherePivot("date_checkIn", dateToday);
      })
      .fetch();

    return technologies;
  }

  /**
   * Show a list of all technologies.
   * GET users by technology
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async users({ request, response }) {
    const dateToday = new Date();

    const users = await Technology.query()
      .whereHas("users", ">", 0)
      .with("users", builder => {
        builder.wherePivot("date_checkIn", dateToday);
      })
      .fetch();

    return users;
  }

  /**
   * Create/save a new technology.
   * POST technologies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["technology"]);
    // cadastra uma nova tecnologias
    const technology = await Technology.create(data);

    return technology;
  }

  /**
   * Display a single technology.
   * GET technologies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const technology = await Technology.findOrFail(params.id);

    return technology;
  }

  /**
   * Update technology details.
   * PUT or PATCH technologies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a technology with id.
   * DELETE technologies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const technology = await Technology.findOrFail(params.id);

    await technology.delete();
  }
}

module.exports = TechnologyController;
