/**
 * RealEstate.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      MortID: { type: 'string',required:true, unique: true},
      fullName:{type:'string',required:true},
      MlsID: { type: 'string',required:true},
      value: { type: 'string'},
    },
};

