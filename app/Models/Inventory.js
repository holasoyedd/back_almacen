'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inventory extends Model {

    products() {
        return this.belongsTo('App/Models/Product')
    }

    users() {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Inventory
