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
  '/show-logs' : {controller: 'LoggerController', action: 'showLogs', locals: {layout: 'layouts/layout.ejs'}},

  // MBR Service routes:
  '/mbr/addUser' : {controller: 'MbrServiceController', action: 'mbrAddUser', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/mbrLogin': {controller: 'MbrServiceController', action: 'mbrLogin', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/status'  : {controller: 'MbrServiceController', action: 'mbrStatus', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/verify'  : {controller: 'MbrServiceController', action: 'confirmEmploymentStatus', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/confirm-insurance-availability'  : {controller: 'MbrServiceController', action: 'mbrConfirmInsuranceAvailability', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/remove-session' : {controller: 'MbrServiceController',action:'mbrRemoveSession'},
  '/mbr/getToken' : {controller: 'MbrServiceController',action:'mbrgetToken'},
  '/mbr/sendMail': {controller: 'MbrServiceController',action:'mbrgetMail'},
  '/mbr/confirm-insurance-and-employment': {controller: 'MbrServiceController',action:'confirmInsuranceAndEmployment'},


  // MBR Application routes:
  '/mbr'           : {view: 'pages/mbr/homepage', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/signup'    : {controller:'MbrServiceController', action: 'fetchApplication'},
  '/mbr/signin'    : {view: 'pages/mbr/signin', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/dashboard' : {view: 'pages/mbr/dashboard', locals: {layout: 'layouts/mbr/layout.ejs'}},
  '/mbr/tokenMismatch' : {view: 'pages/mbr/token', locals: {layout: 'layouts/mbr/layout.ejs'}},
  'Get /mbr/getMBRDB' :
  {
    controller : 'MbrServiceController',
    action : 'getMBRDB',
    view:'pages/mbr/listMBR',
    locals:{layout:'layouts/layout.ejs'}
  },


  // INSinc Service routes:
  'Post /insinc/check-insurance-availability/1' : {controller: 'INSincController', action: 'checkInsuranceAvailability'},

  //Employee Application Route
  '/employee' : { view: 'pages/employee/Portal', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/SignIn' : {view:'pages/employee/SignIn', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/SignUp' : {view:'pages/employee/SignUp', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/MissMatch' : {view:'pages/employee/mismatch', locals: {layout: 'layouts/employee/layout.ejs'}},
  '/employee/MortgageInfoSupply':{view:'pages/employee/MortgageInfoSupply', locals: {layout: 'layouts/employee/layout.ejs'}},
  // '/employee/getEmployeeDB' : {view:'pages/employee/listCompany',locals: {layout: 'pages/employee/listCompany.ejs'}},

  //Employee web service Route
  'Post /employee/create' : {
    controller: 'EmployeeController',
    action : 'create'
  },

  'Get /employee/employeeRemoveSession' : {
    controller: 'EmployeeController',
    action : 'employeeRemoveSession'
  },

  'Post /employee/auth' : {
    controller : 'EmployeeController',
    action : 'authenticateUser'
  },

  'Get /employee/employeeGetToken' : {
    controller : 'EmployeeController',
    action : 'employeeGetToken'
  },

  'Get /employee/sendInfo' : {
    controller : 'EmployeeController',
    action : 'supplyMBRinfo'
  },

  'Get /employee/getEmployeeDB' : {
    controller : 'EmployeeController',
    action : 'getEmployeeDB',
    view:'pages/employee/listCompany',
    locals:{layout:'layouts/layout.ejs'}
  },

  //Real Estate frontend
  '/realEstate' : { view: 'pages/realEstate/dashboard', locals: {layout: 'layouts/realEstate/layout.ejs'}},
  '/realEstate/SignUp' : {
    view: 'pages/realEstate/SignUp',
    locals:{layout:'layouts/realEstate/layout.ejs'}
  },

  '/realEstate/SignIn' : {
    view: 'pages/realEstate/SignIn',
    locals:{layout:'layouts/realEstate/layout.ejs'}
  },

  '/realEstate/applicationForm' : {
    view: 'pages/realEstate/ApplicationForm',
    locals:{layout:'layouts/realEstate/layout.ejs'}
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
  },

  'Get /realEstate/getREDB' : {
    controller : 'RealEstateController',
    action: 'getREDB',
    view:'pages/realEstate/listRE',
    locals:{layout:'layouts/layout.ejs'}
  },

  'Post /realEstate/deleteApplication' : {
    controller : 'RealEstateController',
    action : 'deleteApplication'
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
