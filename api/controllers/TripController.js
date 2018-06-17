/**
 * TripController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res, next){
    var trips = Trip.find().populate('participants').populate('car').exec(function(err, trips){
      if (err) {
        return res.status(500).send(err);
      }else{
        return res.status(200).send(trips);
      }
    });
  },

  create: function(req, res, next){
    var driver = Cars.findOne({ owner: req.body.driver }).exec(function(err, car){
      if (err) {
        return res.status(500).send(err);
      }else{
        if (car.id != req.body.car) {
          return res.status(500).send("Driver doesn't own the car");
        }
      }
    });

    var trip = Trip.findOrCreate({car: req.body.car, status: 1}, req.allParams()).exec(function(err, trip, wasCreated){
      if (err) {
        return res.status(500).send(err);
      }
      if(wasCreated) {
        return res.status(200).send("Trip created!");
      }else {
        return res.status(200).send("Car already has a trip, sorry...");
      }
    });
  },

  edit: function(req, res, next){
    var trip = Trip.update({id: req.params.id}, req.allParams()).exec(function(err, trip){
      if (err) {
        return res.status(500).send("No trip found");
      }else{
        return res.status(200).send("Trip update");
      }
    });

  },

  show: function(req, res, next){
    var trip = Trip.findOne( { id: req.params.id } ).exec(function(err, trip){
      if (err) {
        return res.status(500).send("No trip found");
      }else {
        return res.status(200).send(trip)
      }
    });
  },

  //lier un voyage spécifique à une voiture
  join: function(req, res, next){
    Trip.findOne({id: req.params.id }).populate('participants').then(function(trip){
      if (!trip) return res.status(500).send("No trip found");
      Cars.findOne({id: trip.car}).then(function(car){
        if(!car) return res.status(500).send("No car found");
        if (car.seats != 0 || car.status != 0) {
          Cars.update({id: car.id}, {seats: car.seats-1}).then(function(join){
            Trip.update({id: req.params.id}, req.allParams()).then(function(joined){
              if (!joined) return res.status(500).send("No joined found");
              return res.status(200).send("Joined the trip!");
            });
          });
        }else {
          return res.status(500).send("No seats available");
        }
      });
    });
  },

  //update le status à 1 pour signifier le commencement du voyage
  launch: function(req, res, next){
    Trip.findOne({id: req.params.id}).then(function(trip){
      if (trip.driver == req.body.driver) {
        Trip.update({id: req.params.id}, {status: 1}).then(function(launch){
          return res.status(200).send("Trip is launched");
        });
      }
    });
  },

  //modifier le status à 2 pour signifier le Terminus
  finish: function(req, res, next){
    Trip.findOne({id: req.params.id}).then(function(trip){
      if (trip.driver == req.body.driver && trip.status == 1) {
        Trip.update({id: req.params.id}, {status: 2}).then(function(finish){
          return res.status(200).send("Trip is finished");
        })
      }
    });
  }
};
