/**
 * CarsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//afficher ttes les voitures et alimenter 'trip'
module.exports = {
  index: function(req, res, next){
    var car = Cars.find().populate('trips').exec(function(err, cars){
      if(err){
        res.status(500).send(err);
      }else{
        res.status(200).send(cars);
      }
    });
  },

  //envoyer les données de la requete pour créer une voiture
  create: function(req, res, nexxt){
    var car = Cars.create(req.allParams()).exec(function(err, car){
      if(err){
        res.status(500).send(err);
      }else{
        res.status(200).send("Car created");
      }
    });
  },

  //envoyer la/les modifications selon l'id de la voiture
  edit: function(req, res, next){
    var car = Cars.update({id: req.params.id}, req.allParams()).exec(function(err, car){
      if(err){
        res.status(500).send("No car found");
      }else{
        res.status(200).send("Car update");
      }
    });
  },

  //afficher (trouver) les informations selon l'id d'une voiture et remplir 'trip'
  show: function(req, res, next){
    var car = Cars.findOne({id: req.params.id}).populate('trips').exec(function(err, car){
      if(err){
        res.status(500).send("No car found");
      }else{
        res.status(200).send(car);
      }
    });
  },

  //trouver la voiture (id)
  delete: function(req, res, next){
    var car = Cars.findOne({owner: req.body.driver}).exec(function(err, car){
      if(car.id == req.params.id){
        Trip.findOne({car: req.params.id, status: {'!=' : [1]} }).then(function(trip){
          if (!trip) {
            Cars.destroy({id: req.params.id}).then(function(car){
              return res.status(200).send('Car destroyed');
            });
          }else{
            Trip.destroy({car: req.params.id }).then(function(deleted){
              Cars.destroy({id: req.params.id}).then(function(delete_car){
                return res.status(200).send("Car destroyed with it's innactive trips");
              });
            });
          }
        });
      }else{
        return res.status(401).send("Invalid owner");
      }
    });
  }
};
