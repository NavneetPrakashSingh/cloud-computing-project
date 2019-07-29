/**
 * Logger.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'string',autoIncrement: true },
    log: { type: 'string'},
    time: { type: 'string'},
    location: { type: 'string'},
  },

};

