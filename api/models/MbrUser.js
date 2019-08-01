/**
 * MbrUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    Name: {
      type: "string",
      required: true
    },

    Email: {
      type: "string",
      required: true,
      unique: true
    },

    Password: {
      type: "string",
      required: true
    },

    Address: {
      type: "string",
      required: true
    },

    Phone_Number: {
      type: "string",
      required: true
    },

    Salary: {
      type: "string",
      required: true
    },

    Tenure: {
      type: "string",
      required: true
    },

    Status: {
      type: "string",
      required: true
    },

    MortgageValue: {
      type: "string",
      required: true
    },

    MlsID: { // property id
      type: "string",
      required: true
    },

    IsInsurable: {
      type: "boolean",
      required: false,
      defaultsTo: true
    },

    InsuredValue: {
      type: "string",
      required: false
    },

    Deductable: {
      type: "string",
      required: false
    },

    Token: {
      type: "string",
      required: false
    },

  },

};

