/**
 * Employee.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    empID: { type: 'number',required:true, unique: true},
    password: {type: 'string'},
    fullName:{type:'string'},
    salary:{type:'string'},
    tenure:{type:'string'},
    email:{type:'string', unique: true, required: true},
    token:{type:'string'}
  },

};

