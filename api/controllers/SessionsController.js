/**
 * SessionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcrypt');
module.exports = {

  'new': function(req,res){
    var oldDateObj = new Date();
    var newDateObj = new Date(oldDateObj.getTime() + 60000 );
    req.session.cookie.expires = newDateObj;
    req.session.authenticated = true;
    console.log(req.session);
  },

  create: async function(req, res, next){
    if (!req.param('username') || !req.param('password')) {
      var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'Il faut saisir le pseudo et le mot de passe'}];
      return next(res.json(usernamePasswordRequiredError));
    }
    var authUser = await User.findOne({
      where: {username:req.param('username')}
    });
    if (!authUser) {
      var noAccountError = [{name: 'noAccount', message: "Le pseudo n'existe pas"}];
      return next(res.json(noAccountError));
    }

    bcrypt.compare(req.param('password'), authUser.encryptedPassword, function(err, valid){
      if (!valid) {
        var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatchError', message: 'Le mot de passe incorrect'}]
        return next(res.json(usernamePasswordMismatchError));
      }else{
        return next(res.ok());
      }
      return next(res.json(valid));
    });
  },

  destroy: function(req, res, next){
    req.session.destroy();
    return("Vous êtes déconnecté");
  }
};
