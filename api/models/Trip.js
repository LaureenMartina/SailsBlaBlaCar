/**
 * Trip.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    start: {
        type: 'String',
        required: true
    },
    end: {
        type: 'String',
        required: true
    },
    status: {
        type: 'Number',
        defaultsTo: 0
    },
    participants: {
        collection: 'User'
    },
    driver: {
        model: 'User',
        required: true
    },
    car: {
        model: 'Cars'
    }
  },

};
