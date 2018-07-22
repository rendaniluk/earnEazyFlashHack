// var regURL = 'https://api.rehive.com/3/auth/register/';

var username = document.querySelector(".username");
var pwords = document.querySelector(".password");
var company = document.querySelector(".company");
var welcomeName = document.querySelector(".welcomeName");

//Login Functionality
var targetLog = document.querySelector(".loginBtn");
targetLog.addEventListener("click", function() {
  console.log(JSON.stringify(creds));
  console.log(creds);
  var creds = {
    user: username.value,
    company: company.value,
    password: pwords.value
  };
  //console.log(creds.user);
  localStorage.setItem("email", creds.user);

  $.ajax({
    url: "https://api.rehive.com/3/auth/login/",
    type: "post", // <<- the method that we using
    data: JSON.stringify(creds), // <<- JSON of our request obj
    contentType: "application/json", // <<- telling server how we are going to communicate
    // authorization: 'bearer',
    fail: function(xhr, textStatus, errorThrown) {
      console.log(errorThrown, textStatus, xhr); //  <<- log any http errors to the console
      return false;
    }
  }).done(function(results, textStatus, xhr, auth) {
    // setDefaultData();
    if (results.status == "success") {
      localStorage.setItem("token", results.data.token);
      //   localStorage.setItem("email", results.data.token);

      window.location.replace("./account-page.html");
    } else {
      console.log(results);
    }
  });
});

/*;*/