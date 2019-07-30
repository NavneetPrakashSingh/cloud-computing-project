
module.exports.models = {

  //schema: true,

  migrate: 'alter',
  

  attributes: {
    id: { type: 'number', autoIncrement: true, },
  },

  dataEncryptionKeys: {
    default: '4Mcl4c3FlDTbKS8iqbeoq4mtYgfkbtcnEN36Vl+uVjg='
  },

  cascadeOnDestroy: true,


};
