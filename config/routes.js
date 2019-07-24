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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
// Logger routes:
  '/show-logs' : {controller: 'LoggerController', action: 'showLogs', locals: {layout: 'layouts/mbr/layout.ejs'}},

  // MBR Service routes:
  '/mbr/addUser' : {controller: 'MbrServiceController', action: 'mbrAddUser', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/mbrLogin': {controller: 'MbrServiceController', action: 'mbrLogin', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/status'  : {controller: 'MbrServiceController', action: 'mbrStatus', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/verify'  : {controller: 'MbrServiceController', action: 'confirmEmploymentStatus', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/confirm-insurance-availability'  : {controller: 'MbrServiceController', action: 'mbrConfirmInsuranceAvailability', locals: {layout: 'layouts/mbr/layout.ejs'}},

  // MBR Application routes:
  '/mbr'           : {view: 'pages/mbr/homepage', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/signup'    : {view: 'pages/mbr/signup', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/signin'    : {view: 'pages/mbr/signin', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/dashboard' : {view: 'pages/mbr/dashboard', locals: {layout: 'layouts/mbr/layout.ejs'}},

  // INSinc Service routes:
  '/insinc/check-insurance-availability' : {controller: 'INSincController', action: 'checkInsuranceAvailability'},

  // Logger routes:
  '/show-logs' : {controller: 'LoggerController', action: 'showLogs', locals: {layout: 'layouts/mbr/layout.ejs'}},

  '/employee': { view: 'pages/homepage' },
  '/employee/signup' : { view: 'pages/signup'},
  '/employee/signin' : {view: 'pages/signin'},
  '/employee/dashboard' : {view: 'pages/dashboard'},

  
  //Employee Application Route
  '/employee' : { view: 'pages/employee/Portal', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/SignIn' : {view:'pages/employee/SignIn', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/SignUp' : {view:'pages/employee/SignUp', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/MortgageSend' : {view:'pages/employee/MortgageInfoSupply', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/MissMatch' : {view:'pages/employee/mismatch', locals: {layout: 'layouts/employee/layout.ejs'}},

  //Employee web service Route
  'Post /employee/create' : { 
    controller: 'EmployeeController',
    action : 'create'
  },

  'Post /employee/auth' : {
    controller : 'EmployeeController',
    action : 'authenticateUser'
  },

  //Real Estate web Services
  'Post /realEstate/reqAppraisal' : {
    controller : 'RealEstateController',
    action: 'requestAppraisal'
  },

  'Get /realEstate/fetchAppraisals' : {
    controller : 'RealEstateController',
    action: 'fetchAppraisals'
  },

  'Post /realEstate/appraiserSignUp' : {
    controller : 'RealEstateController',
    action: 'appraiserSignUp'
  },

  'Post /realEstate/appraiserLogIn' : {
    controller : 'RealEstateController',
    action: 'appraiserLogin'
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


};