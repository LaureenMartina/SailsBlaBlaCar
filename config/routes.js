/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  '/sessions/create': {
    controller: 'SessionsController',
    action: 'create'
  },

  '/sessions/destroy': {
    controller: 'SessionsController',
    action: 'destroy'
  },

  /************** User routes ****************/
  'GET /user': {
    controller: 'UserController',
    action: 'index'
  },

  'POST /user/create': {
    controller: 'UserController',
    action: 'create'
  },

  'POST /user/edit/:id': {
    controller: 'UserController',
    action: 'edit'
  },

  'GET /user/:id': {
    controller: 'UserController',
    action: 'show'
  },

  /************** Car routes ****************/

'GET /cars': {
  controller: 'CarsController',
  action: 'index'
},

'POST /cars/create': {
  controller: 'CarsController',
  action: 'create'
},

'POST /cars/edit/:id': {
  controller: 'CarsController',
  action: 'edit'
},

'GET /cars/:id': {
  controller: 'CarsController',
  action: 'show'
},

'GET /cars/:id/destroy': {
  controller: 'CarsController',
  action: 'delete'
},

/************** Trip routes ****************/

  'GET /trip': {
    controller: 'TripController',
    action: 'index'
  },

  'POST /trip/create': {
    controller: 'TripController',
    action: 'create'
  },

  'POST /trip/edit/:id': {
    controller: 'TripController',
    action: 'edit'
  },

  'GET /trip/:id': {
    controller: 'TripController',
    action: 'show'
  },

  'POST /trip/:id/join': {
    controller: 'TripController',
    action: 'join'
  },

  'POST /trip/:id/launch': {
    controller: 'TripController',
    action: 'launch'
  },

  'POST /trip/:id/finish': {
    controller: "TripController",
    action: 'finish'
  }

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
