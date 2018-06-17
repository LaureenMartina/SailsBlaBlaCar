/**
 * Cars.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    model: {
        type: 'String',
        defaultsTo: 'Lambda'
    },
    color: {
        type: 'String',
        defaultsTo: 'White'
    },
    seats: {
        type: 'Number',
        defaultsTo: 2
    },
    owner: {
        model: 'User',
        required: true
    },
    trips: {
      collection: 'Trip',
      via: 'car'
    }
  },

};
