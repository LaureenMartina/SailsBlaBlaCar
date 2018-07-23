/**
* SessionsController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/
var bcrypt = require('bcrypt');
module.exports = {

    create: async function(req, res, next){
        if (!req.param('username') || !req.param('password')) {
            var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'Il faut saisir le pseudo et le mot de passe'}]; // tab d'objets
            return next(res.json(usernamePasswordRequiredError));
        }
        var authUser = await User.findOne({
            where: {username:req.param('username')}
        });
        if (!authUser) { // si vide
            var noAccountError = [{name: 'noAccount', message: "Le pseudo n'existe pas"}];
            return next(res.json(noAccountError));
        }

        bcrypt.compare(req.param('password'), authUser.encryptedPassword, function(err, valid){ // bcrypt = crypter password valid = partie de promesse
            if(err){
                res.status(500).send("No session found");
            }

            if (!valid) {
                var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatchError', message: 'Le mot de passe incorrect'}];
                return next(res.json(usernamePasswordMismatchError));
            }else{
                req.session.authenticated = true; //token
                req.session.User = authUser; //
                return next(res.ok());
            }
            return next(res.json(valid));
        });
    },

    destroy: function(req, res, next){
        req.session.destroy();
        return req.session.destroy();
    }
};
