var validateEmail = false;
var validPassword = false;

var validSignupEmail = false;
var validSignupPassword = false;
var validSignupName = false;
var validSignupAddress = false;
var validSignupPhoneNumber = false;
var validSignupSalary = false;
var validSignupTenure = false;
var validSignupMortgageValue = false;
var baseUrl = "https://cloud-computing-project-nodes.herokuapp.com";

$(document).ready(function () {
    alert("inside common.js");
    if (localStorage.getItem("email")) {
        $('.navbar-nav').html("");
        $('.navbar-nav').append("<li class=\"nav-item logout\"><span class=\"nav-link\">Logout</span></li> <li class=\"nav-item dashboard\"><span class=\"nav-link\">Dashboard</span></li>");
    }

    if (localStorage.getItem("Empemail")) {
        $('.navbar-nav').html("");
        $('.navbar-nav').append("<li class=\"nav-item logout-emp\"><span class=\"nav-link\">Logout</span></li>");
    }
    if (localStorage.getItem("realEstate")) {
        $('.navbar-nav').html("");
        $('.navbar-nav').append("<li class=\"nav-item logout-re\"><span class=\"nav-link\">Logout</span></li>  <li class=\"nav-item appform\"><span class=\"nav-link\">Application Form </span></li>");
    }

    if ($('.identify-page').val() == "signin" || $('.identify-page').val() == "signup") {
        if(localStorage.getItem("email")){
            $.ajax({
                url: '/mbr/getToken?email='+localStorage.getItem("email"),
                dataType: 'json',
                beforeSend: function (xhr) {
                }
            })
                .done(function (data) {
                    if(data.token){
                        window.location.replace("/mbr/dashboard?token="+data.token);
                    }
                })
        }else{

        }
    }

    if ($('.emp').val() == "emp-signIn" || $('.emp').val() == "emp-signUp") {
      if(localStorage.getItem("Empemail")){
          $.ajax({
              url: '/employee/employeeGetToken?email='+localStorage.getItem("Empemail"),
              dataType: 'json',
              beforeSend: function (xhr) {
              }
          })
              .done(function (data) {
                  if(data.token){
                      window.location.replace("/employee");
                  }
              })
      }else{

      }
  }
  if ($('.emp').val() == "emp-mortgage" ) {
    if(localStorage.getItem("Empemail")){
        $.ajax({
            url: '/employee/employeeGetToken?email='+localStorage.getItem("Empemail"),
            dataType: 'json',
            beforeSend: function (xhr) {
            }
        })
            .done(function (data) {
                if(data.token){


                }
                else{
                  window.location.replace("/employee");
                }
            })
    }else{
      window.location.replace("/employee");

    }
}


    if ($('.identify-page').val() == "dashboard") {
        if(localStorage.getItem("email")){

        }else{
            window.location.href = "/mbr/signin";
        }
        var token = getUrlParameter('token');
        var emailID = localStorage.getItem("email");
        if (emailID) {
            $.ajax({
                url: '/mbr/status?email=' + emailID,
                dataType: 'json',
                beforeSend: function (xhr) {

                }
            })
                .done(function (data) {
                    if(data.Token == token){
                        $('.dashboard-mortgage-id').text(data.id);
                        $('.dashboard-name').text(data.Name);
                        $('.dashboard-email').text(data.Email);
                        $('.dashboard-address').text(data.Address);
                        $('.dashboard-phone').text(data.Phone_Number);
                        $('.dashboard-salary').text(data.Salary);
                        $('.dashboard-tenure').text(data.Salary);
                        $('.dashboard-status').text(data.Status);
                        $('.dashboard-property-id').text(data.MlsID);
                        if(data.InsuredValue && data.Deductable) {
                            $('.dashboard-is-insured').text("Insurance company has approved your application.");
                            $('#user-info').append("<div class='col-md-6'>Insured Value: <span class='dashboard-insured-value'></span> </div>");
                            $('.dashboard-insured-value').text(data.InsuredValue);
                            $('#user-info').append("<div class='col-md-6'>Deductable: <span class='dashboard-deductable'></span> </div>");
                            $('.dashboard-deductable').text(data.Deductable);
                        } else {
                            if(data.IsInsurable) {
                                $('.dashboard-is-insured').text("Waiting for insurance company decision.");
                            } else {
                                $('.dashboard-is-insured').text("Insurance company has declined your application.");
                            }
                        }
                    }else{
                        window.location.href="/mbr/tokenMismatch";
                    }
                })
        }

    } else {
        //don't do anything
    }
});

$(document).on("click", "li.logout", function () {
    var email = localStorage.getItem("email");
    $.ajax({
        url: '/mbr/remove-session?email='+email,
        dataType: 'json',
        beforeSend: function (xhr) {

        }
    })
        .done(function (data) {
            if(data.Status =="success"){
                localStorage.clear();
                window.location.replace("/mbr");
            }
        })
})

$(document).on("click", "li.logout-emp", function () {
  var empEmail = localStorage.getItem("Empemail");
  $.ajax({
      url: '/employee/employeeRemoveSession?email='+empEmail,
      dataType: 'json',
      beforeSend: function (xhr) {
      }
  })
      .done(function (data) {
          if(data.Status =="success"){
              localStorage.clear();
              window.location.replace("/employee");
          }
      })
})

// $(document).on("click", "li.logout-emp", function () {
//     localStorage.clear();
//     window.location.replace("/employee");
// })

$(document).on("click", "li.logout-re", function () {
    localStorage.clear();
    window.location.replace("/realEstate");
})
$(document).on("click", "li.appform", function () {
    window.location.replace("/realEstate/applicationForm");
})


$(document).on("click", "li.dashboard", function () {
    window.location.replace("/mbr/dashboard");
});


// $(document).on("click", "li.dashboard-emp", function () {
//     window.location.replace("/employee");
// });


// $(document).on("click", "li.dashboard-re", function () {
//     window.location.replace("/realEstate");
// });
    //here
    // window.location.replace("/mbr/dashboard");
    if(localStorage.getItem("email")){
        $.ajax({
            url: '/mbr/getToken?email='+localStorage.getItem("email"),
            dataType: 'json',
            beforeSend: function (xhr) {
            }
        })
            .done(function (data) {
                if(data.token){
                    window.location.replace("/mbr/dashboard?token="+data.token);
                }
            })
    }else{

    }


$('.signin-email').focus(function () {
    $('.email-message').text('');
});

$('.signin-email').focusout(function () {
    var signInEmail = $('.signin-email').val();
    if (checkForBlank(signInEmail)) {
        if (isEmail(signInEmail)) {
            $('.email-message').text('Valid Email');
            validateEmail = true;
        } else {
            //email is invalid format
            $('.email-message').text('Invalid Email.');
            validateEmail = false;
        }
    } else {
        //email is blank
        $('.email-message').text('Email Cannot Be Blank');
        validateEmail = false;
    }
});

$('.signin-password').focus(function () {
    $('.password-message').text('Make sure that the password has a length of 6');
});

$('.signin-password').keyup(function () {
    var signInPasswordLength = $('.signin-password').val();
    if (checkLengthForPassword(signInPasswordLength)) {
        $('.password-message').text('Valid Password');
        validPassword = true;
    } else {
        $('.password-message').text('Invalid Password');
        validPassword = false;
    }

});

$('.signin-button').click(function () {

    if (validateEmail == true && validPassword == true) {
        // var encryptedPassword = CryptoJS.AES.encrypt($('.signin-password').val(), "cloud computing");
        $.ajax({
            url: '/mbr/mbrLogin?email=' + $('.signin-email').val() + '&password=' + $('.signin-password').val(),
            dataType: 'json',
            beforeSend: function (xhr) {

            }
        })
            .done(function (data) {
                var jsonResponse = JSON.stringify(data);
                var response = JSON.parse(jsonResponse);
                if (response.status == "authentic") {
                    localStorage.setItem("email", $('.signin-email').val());
                    localStorage.setItem("token", response.token);
                    window.location.replace("/mbr/dashboard?token="+response.token);
                } else {
                    alert("Username and password combination is not correct");
                }
            })

    } else {
        $('.password-message').text('Email or password is not valid');
    }
})

function checkLengthForPassword(value) {
    if (value.length > 6) {
        return true;
    } else {
        return false;
    }
}

function checkForBlank(value) {
    if (value.length > 1) {
        return true;
    } else {
        return true;
    }
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// ----------------------------------signup page validation ------------------------------------

$('.signup-email').focus(function () {
    $('.email-message').text('');
});

$('.signup-password').focus(function () {
    $('.password-message').text('');
});

$('.signup-password').focusout(function () {
    var password = $('.signup-password').val();

    if (checkForBlank(password)) {
        if (checkLengthForPassword(password)) {
            validSignupPassword = true;
            $('.password-message').text('Valid Password');
        } else {
            validSignupPassword = false;
            $('.password-message').text('Invalid Password. Password must be greater than 6 in length');
        }
    } else {
        validSignupPassword = false;
        $('.password-message').text('Password cannot be blank');
    }
});

$('.signup-name').focus(function () {
    $('.name-message').text('');
});

$('.signup-name').focusout(function () {
    var name = $('.signup-name').val();

    if (checkForBlank(name)) {
        validSignupName = true;
        $('.name-message').text('Valid Name');
    } else {
        validSignupName = false;
        $('.name-message').text('Name cannot be blank');
    }
});


$('.signup-address').focus(function () {
    $('.address-message').text('');
});

$('.signup-address').focusout(function () {
    var address = $('.signup-address').val();

    if (checkForBlank(address)) {
        validSignupAddress = true;
        $('.address-message').text('Valid Address');
    } else {
        validSignupAddress = false;
        $('.address-message').text('Address cannot be blank');
    }
});

$('.signup-phonenumber').focus(function () {
    $('.phoneNumber-message').text('');
});

$('.signup-phonenumber').focusout(function () {
    var phoneNumber = $('.signup-phonenumber').val();

    if (checkForBlank(phoneNumber)) {
        validSignupPhoneNumber = true;
        $('.phonenumber-message').text('Valid Phone Number');
    } else {
        validSignupPhoneNumber = false;
        $('.phonenumber-message').text('Phone Number cannot be blank');
    }
});

$('.signup-salary').focus(function () {
    $('.salary-message').text('');
});

$('.signup-salary').focusout(function () {
    var salary = $('.signup-salary').val();
    if (checkForBlank(salary)) {
        validSignupSalary = true;
        $('.salary-message').text('Valid Salary');
    } else {
        validSignupSalary = false;
        $('.salary-message').text('Salary canot be blank');
    }
});

$('.signup-tenure').focus(function () {
    $('.tenure-message').text('');
});

$('.signup-tenure').focusout(function () {
    var tenure = $('.signup-tenure').val();
    if (checkForBlank(tenure)) {
        validSignupTenure = true;
        $('.tenure-message').text('Valid Tenure');
    } else {
        validSignupTenure = false;
        $('.tenure-message').text('Tenure Cannot Be Blank');
    }

});

$('.signup-mortgage-value').focus(function () {
    $('.mortgage-value-message').text('');
});

$('.signup-mortgage-value').focusout(function () {
    var mortgageValue = $('.signup-mortgage-value').val();
    if (checkForBlank(mortgageValue)) {
        validSignupMortgageValue = true;
        $('.mortgage-value-message').text('Valid Mortgage Ammount');
    } else {
        validSignupMortgageValue = false;
        $('.mortgage-value-message').text('Mortgage Ammount Cannot Be Blank');
    }
});

$('.signup-property-id').focus(function () {
    $('.property-id-message').text('');
});

$('.signup-property-id').focusout(function () {
    var propertyId = $('.signup-property-id').val();
    if (checkForBlank(propertyId)) {
        validSignupPropertyId = true;
        $('.property-id-message').text('Valid Property ID');
    } else {
        validSignupPropertyId = false;
        $('.property-id-message').text('Property ID Cannot Be Blank');
    }
});

$('.signup-email').focusout(function () {
    var signInEmail = $('.signup-email').val();
    if (checkForBlank(signInEmail)) {
        if (isEmail(signInEmail)) {
            $('.email-message').text('Valid Email');
            validSignupEmail = true;
        } else {
            //email is invalid format
            $('.email-message').text('Invalid Email.');
            validSignupEmail = false;
        }
    } else {
        //email is blank
        $('.email-message').text('Email Cannot Be Blank');
        validSignupEmail = false;
    }
});

$('.signup-button').click(function () {

    if (validSignupEmail == true && validSignupPassword == true && validSignupAddress == true && validSignupName && validSignupPhoneNumber && validSignupSalary && validSignupTenure && validSignupMortgageValue) {
        // var encryptedPassword = CryptoJS.AES.encrypt($('.signup-password').val(), "cloud computing");
        $.ajax({
            url: '/mbr/addUser?name=' + $('.signup-name').val() + '&email=' + $('.signup-email').val() +
                '&password=' + $('.signup-password').val() + '&address=' + $('.signup-address').val() + '&phoneNumber=' +
                $('.signup-phonenumber').val() + '&salary=' + $('.signup-salary').val() + '&tenure=' + $('.signup-tenure').val()+
                '&mortgageValue=' + $('.signup-mortgage-value').val() + '&mlsID=' + $('.signup-property-id').val(),
            dataType: 'json',
            beforeSend: function (xhr) {
                $('.signup-button').text("Loading...");
            }
        })
            .done(function (data) {
                var jsonResponse = JSON.stringify(data);
                var response = JSON.parse(jsonResponse);
                if (response.status == "Success") {
                    $('.signup-button').text("Sign Up");
                    localStorage.setItem("email", $('.signup-email').val());
                    localStorage.setItem("token", response.token);
                    window.location.replace("/mbr/dashboard?token="+response.token);
                } else {
                    alert(response.error);
                }
            })
    } else {
        alert("One of the values is not validated properly, please check again!");
    }
})

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

