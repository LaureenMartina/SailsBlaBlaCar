/**
* User.js
*
* @description :: A model definition.  Represents a database table/collection/etc.
* @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
*/

module.exports = {
    schema: false,

    attributes: {
        username: {
            type: 'String',
            required: true,
            unique: true
        },
        encryptedPassword: {
            type: 'String'
        },
        firstName: {
            type: 'String',
            required: true
        },
        lastName: {
            type: 'String',
            required: true
        },
        age: {
            type: 'Number',
            required: false
        },
        cars: {
            collection: 'Cars',
            via: "owner"
        }
    },

    beforeCreate: function(values, next){
        if (!values.password || values.password !== values.passwordConfirmation ) {
            return values;
        }
        require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
            if (err) {
                return next(err);
            }
            delete values.password;
            delete values.passwordConfirmation;
            values.encryptedPassword = encryptedPassword;
            next();
        });
        return next([{msg: "ok"}]);
    }
};
