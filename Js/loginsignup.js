// logout feature
function signout() {
  localStorage.removeItem("loggedUser");
  location.href = "/index.html";
}

// Checking user logged in or not
if (localStorage.getItem("loggedUser") == null) {
} else {
  let loginbtn = document.getElementById("signIn");
  loginbtn.style.display = "none";
  let signoutbtn = document.getElementById("signout");
  signoutbtn.style.display = "block";
}

// Sign up Functionality Start

// function to check is email exist or not
async function isEmailExist(email) {
  let isEmail = false;
  let res = await fetch("http://localhost:3000/users");
  let data = await res.json();
  data.forEach(({ userEmail }) => {
    if (email === userEmail) {
      isEmail = true;
      return isEmail;
    }
  });
  return isEmail;
}

// function to check is mobile number exist or not
async function isPhoneExist(umobile) {
  let isTrue = false;
  let res = await fetch("http://localhost:3000/users");
  let data = await res.json();
  data.forEach(({ mobile }) => {
    if (umobile === mobile) {
      isTrue = true;
      return isTrue;
    }
  });
  return isTrue;
}

// constructor function to create data skelton
function userDetails(f_name, l_name, mobile, u_email, u_pass, res_city) {
  this.firstName = f_name;
  this.lastName = l_name;
  this.mobile = mobile;
  this.userEmail = u_email;
  this.userPass = u_pass;
  this.rescidentialCity = res_city;
}

// add user to database
async function addUser(event) {
  event.preventDefault();
  let f_name = document.getElementById("f_name").value;
  let l_name = document.getElementById("l_name").value;
  let mobile = document.getElementById("mobile").value;
  let u_email = document.getElementById("u_email").value;
  let u_pass = document.getElementById("u_pass").value;
  let res_city = document.getElementById("res_city").value;

  let isEmail = await isEmailExist(u_email);
  let isPhone = await isPhoneExist(mobile);

  if (mobile.length != 10) {
    alert("Length should be equal to 10");
    document.getElementById("mobile").value = "";
    return;
  } else if (u_pass.length < 8) {
    alert("password length is too short");
    document.getElementById("u_pass").value = "";
    return;
  } else if (isPhone) {
    alert("Mobile Number already exist");
    document.getElementById("mobile").value = "";
    return;
  } else if (isEmail) {
    alert("Email already exist");
    document.getElementById("u_email").value = "";
    return;
  } else {
    // creating user details object
    let data = new userDetails(
      f_name,
      l_name,
      mobile,
      u_email,
      u_pass,
      res_city
    );
    // setting url into url variable
    let url = "http://localhost:3000/users";
    // post data into api
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let data1 = await response.json();
    alert("signup Successfully");
  }
}
// Sign up functionality start

// Login functionality start
async function loginUser(event) {
  event.preventDefault();
  let login_email = document.getElementById("login_email").value;
  let login_pass = document.getElementById("login_pass").value;

  if (login_pass.length < 8) {
    alert(`Password is too short`);
    return;
  }

  let res = await fetch("http://localhost:3000/users");
  let data = await res.json();

  if (data === null) {
    alert(`User doesn't Exist`);
    document.getElementById("login_email").value = "";
    document.getElementById("login_pass").value = "";
    return;
  }
  let userExist = false;
  data.forEach((el) => {
    if (el.userEmail === login_email) {
      if (el.userPass === login_pass) {
        userExist = true;
        login_email = "";
        login_pass = "";
        alert(`Login Successfully`);
        localStorage.setItem("loggedUser", JSON.stringify(el.id));
        location.href = "/index.html";
        document.getElementById("login_email").value = "";
        document.getElementById("login_pass").value = "";
        return;
      } else {
        alert(`Invalid Password`);
        document.getElementById("login_pass").value = "";
        userExist = true;
        return;
      }
    }
  });

  if (userExist === false) {
    alert(`User doesn't Exist`);
    document.getElementById("login_email").value = "";
    document.getElementById("login_pass").value = "";
  }
}

// Login functionality end
