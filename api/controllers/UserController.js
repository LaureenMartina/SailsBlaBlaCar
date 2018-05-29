/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res, next){
    var users = User.find().populate('cars').exec(function(err, users){
      if (err) {
        res.status(500).send(err);
      }else{
        res.status(200).send(users);
      }
    });
  },

  create: function(req, res, next){
    var user = User.create(req.allParams()).exec(function(err, user){
      if(err){
        res.status(500).send(err):
      }else{
        res.status(200).send("User created");
      }
    });
  },

  edit: function(req, res, next){
    var user = User.update({id: req.params.id}, req.allParams()).exec(function(err, user){
      if (err) {
        res.status(500).send("No user found");
      }else{
        res.status(200).send("User update");
      }
    });
  },

  show: function(req, res, next){
    var user = User.findOne( { id: req.params.id } ).populate("cars").exec(function(err, user){
      if (err) {
        res.status(500).send("No user found");
      }else {
        res.status(200).send(user)
      }
    });
  }
};
