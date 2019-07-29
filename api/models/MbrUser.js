/**
 * MbrUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Name : {
      type : "string",
      required:true
    },
    
    Email: {
      type : "string",
      required:true,
      unique:true
    },

    Password: {
      type : "string",
      required:true
    },

    Address: {
      type : "string",
      required:true
    },

    Phone_Number: {
      type : "number",
      required:true
    },

    Salary: {
      type:"number",
      required:true
    },

    Tenure: {
      type:"number",
      required:true
    },

    Status: {
      type : "string",
      required:true
    },

    MortgageValue: {
      type : "number",
      required:true
    },

    MlsID: { // property id
      type : "string",
      required:true
    },

    IsInsurable: {
      type : "boolean",
      required: false,
      defaultsTo: true
    },

    InsuredValue: {
      type : "number",
      required: false
    },

    Deductable: {
      type : "number",
      required: false
    },

    Token: {
      type : "string",
      required:false
    },

  },

};

