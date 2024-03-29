'use strict'

const Inventory = use ('App/Models/Inventory')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with inventories
 */
class InventoryController {
  /**
   * Show a list of all inventories.
   * GET inventories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let inventory = await Inventory.query()
    .with('products')
    .with('users')
    .fetch()
    //change
    return response
      .status(200)
      .json(inventory)

  }

  async getOne({ params, request, response, view }) {
    let id = params.id
    let inventory = await Inventory.query().where('id', '=', id).with('products').fetch()

    return response
      .status(200)
      .json(inventory)
  }

  /**
   * Render a form to be used for creating a new inventory.
   * GET inventories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new inventory.
   * POST inventories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const body = request.only(['product_id','quantity', 'price', 'tax', 'user_id'])
    
    let inventory = await Inventory.create({
      product_id: body.product_id,
      quantity: body.quantity,
      price: body.price,
      user_id: body.user_id,
      tax: body.tax
    })

    await inventory.save()

    return response
      .status(201)
      .json(inventory)
  }

  /**
   * Display a single inventory.
   * GET inventories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing inventory.
   * GET inventories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update inventory details.
   * PUT or PATCH inventories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a inventory with id.
   * DELETE inventories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InventoryController
