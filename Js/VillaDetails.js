let data = JSON.parse(localStorage.getItem("villaInfo"));

let loc = data.location;
let newText = loc.replace(", himachal pradesh", "");

// villa images
let img1 = document.getElementById("img1");
img1.src = data.img1;

// villa name
let villa_name = document.getElementById("villa_name");
let villa_name1 = document.getElementById("villa_name1");
let villa_name2 = document.getElementById("villa_name2");
let villa_name4 = document.getElementById("villa_name4");
villa_name.textContent = data.name;
villa_name1.textContent = data.name;
villa_name2.textContent = data.name;
villa_name4.textContent = data.name;
// villa location
let loca = document.getElementById("loc");
loca.textContent = newText;
let loca1 = document.getElementById("loc1");
loca1.textContent = newText;
// villa price
let price = document.getElementById("price");
price.textContent = `₹ ${data.cost}`;

function bookNow() {
  let id = localStorage.getItem("loggedUser");
  if (id == null) {
    alert("Please! You are requested to login first.");
  } else {
    alert("Congratulations! 🎉🎉 Your Booking is Confirmed!");
  }
}
