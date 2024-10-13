var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var invalidMsg = document.getElementById("invalidMsg");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var exist = document.getElementById("emailExist");

var userwelcome = localStorage.getItem("sessionforuser");

var users = [];

if (localStorage.getItem("ourUsers") != null) {
  users = JSON.parse(localStorage.getItem("ourUsers"));
}

if (userwelcome) {
  document.getElementById("userwelcome").innerHTML = "Welcome " + userwelcome;
}

function signUp() {
  if (emptySignup() == true) {
    exist.innerHTML = "All inputs are required";
    exist.style.color = "red";
  } else if (isExist()) {
    exist.innerHTML = "Email Already Exists";
    exist.style.color = "red";
  } else if (
    validation(nameRegex, signupName) &&
    validation(emailRegex, signupEmail) &&
    validation(passwordRegex, signupPassword)
  ) {
    var user = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    users.push(user);
    localStorage.setItem("ourUsers", JSON.stringify(users));
    exist.innerHTML = "Success";
    exist.style.color = "#28a745";
  } else {
    exist.innerHTML = `<span class="text-danger">Name Must be More than 3 chars</span><br />
                       <span class="text-danger">email must be at form like (name@social.org)</span><br />
                       <span class="text-danger">Password Must consist of 8 chars with [A-a] and special char [#?!@$%^&*-] at least</span>`;
  }
}

function Login() {
  if (emptyLogin()) {
    invalidMsg.innerHTML = "All inputs required";
    invalidMsg.style.color = "red";
  } else if (
    validation(emailRegex, signinEmail) &&
    validation(passwordRegex, signinPassword)
  ) {
    for (var i = 0; i < users.length; i++) {
      if (
        users[i].email == signinEmail.value &&
        users[i].password == signinPassword.value
      ) {
        localStorage.setItem("sessionforuser", users[i].name);
        window.location.href = "welcome.html";
      }
    }
  } else {
    invalidMsg.innerHTML = "incorrect email or password";
    invalidMsg.style.color = "red";
  }
}

function isExist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function emptySignup() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

function emptyLogin() {
  if (signinEmail.value == "" || signinPassword.value == "") {
    return true;
  } else {
    return false;
  }
}

function logOut() {
  localStorage.removeItem("sessionforuser");
  window.location = "index.html";
}

var nameRegex = /^[a-zA-Z]{3,}$/;
var emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function validation(regex, input) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
