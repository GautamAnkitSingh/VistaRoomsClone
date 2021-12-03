let id = localStorage.getItem("loggedUser");
if (id == null) {
  location.href = "/index.html";
}
id = parseInt(id);
async function getUSerInfo() {
  let res = await fetch("http://localhost:3000/users");
  let data = await res.json();
  data.forEach((el) => {
    if (id === el.id) {
      document.getElementById("firstName").value = el.firstName;
      document.getElementById("lastName").value = el.lastName;
      document.getElementById("userEmail").value = el.userEmail;
      document.getElementById("resCity").value = el.rescidentialCity;
      document.getElementById("mob").value = el.mobile;

      if (el.dateOfBirth !== undefined) {
        document.getElementById("dob").value = el.dateOfBirth;
      }
      if (el.gender !== undefined) {
        document.getElementById("gender").value = el.gender;
      }
    }
  });
}
getUSerInfo();

async function updateValue(e) {
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let userEmail = document.getElementById("userEmail").value;
  let userResCity = document.getElementById("resCity").value;
  let userMobile = document.getElementById("mob").value;
  let dob = document.getElementById("dob").value;
  let gender = document.getElementById("gender").value;

  let res = await fetch(`http://localhost:3000/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      mobile: userMobile,
      userEmail: userEmail,
      rescidentialCity: userResCity,
      dateOfBirth: dob,
      gender: gender,
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();

  location.href = "/Assets/profile.html";
}
