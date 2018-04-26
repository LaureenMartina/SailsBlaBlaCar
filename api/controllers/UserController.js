/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res, next){
    User.create(req.allParams(), function userCreated(err, user){
      if(err) return next(err);
      res.json(req);
    });
  }

};
