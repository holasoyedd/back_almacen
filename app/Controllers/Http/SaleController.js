'use strict'

const Sale = use('App/Models/Sale')
const Inventory = use ('App/Models/Inventory')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sales
 */
class SaleController {
  /**
   * Show a list of all sales.
   * GET sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    let sale = await Sale.all()

    return response
      .status(200)
      .json(sale)
  }

  /**
   * Render a form to be used for creating a new sale.
   * GET sales/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const body = request.only(['product_id','user_id','quantity', 'discount', 'payment_method', 'status_sale'])

    let idProduct = body.product_id
    let amount = body.quantity
    let offert = body.discount
    let offertDecimal = offert/100 

    let product = await Inventory.findBy('product_id',idProduct)

    let price = product.price
    let tax = product.tax
    let taxDecimal = tax/100

    let subTotal = price * amount

    let subPrice = subTotal - (subTotal*offertDecimal)

    let finalPrice =  subPrice + (subPrice*taxDecimal)

    let sale = await Sale.create({
      product_id: body.product_id,
      user_id: body.user_id,
      quantity: body.quantity,
      total: finalPrice,
      discount: body.discount,
      payment_method: body.payment_method,
      status: body.status_sale
    })

    let beforeInventory = product.quantity
    product.quantity = beforeInventory - amount

    await product.save()
    await sale.save()

    return response
      .status(201)
      .json(sale)
  }

  /**
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing sale.
   * GET sales/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response }) {
    let idSale = params.id

    let saleToCancel = await Sale.find(idSale)
    let idProduct = saleToCancel.product_id

    let quantity = saleToCancel.quantity

    let product = await Inventory.findBy('product_id',idProduct)

    saleToCancel.status = 2

    let beforeInventory = product.quantity
    product.quantity = beforeInventory + quantity

    await saleToCancel.save()
    await product.save()

    return response
      .status(200)
      .json(saleToCancel)

  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SaleController
