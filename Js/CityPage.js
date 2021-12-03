let card_holder = document.getElementById("card_holder");

// appending data to webpage by DOM
function appendData(data) {
  data.forEach((element) => {
    let col = document.createElement("div");
    col.setAttribute("class", "col");
    col.addEventListener("click", () => {
      localStorage.setItem("villaInfo", JSON.stringify(element));
      location.href = "../Assets/VillaDetails.html";
    });
    col.innerHTML = `
      <div class="card">
        <img
          src=${element.img1}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5>${element.name}</h5>
          <p>${element.location}</p>
          <h6>${element.rooms}</h6>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5>₹ ${element.cost}<span>/ night</span></h5>
              <small>(excl. taxes & charges)</small>
            </div>
            <div>
              <span>
                <i class="fa fa-angle-right font-20"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    card_holder.append(col);
  });
}
// getting data through api
async function getData() {
  let data = await fetch("http://localhost:3000/villas");
  let res = await data.json();
  appendData(res);
}

getData();

function removeprev() {
  let card_holder = document.getElementById("card_holder");
  card_holder.innerHTML = "";
}

// filter villas by sort by low to high or reverse
async function run() {
  let sort = document.getElementById("sortby");
  let data = sort.value;
  if (data === "ltoh") {
    let data = await fetch("http://localhost:3000/villas");
    let res = await data.json();
    res.sort((a, b) => {
      return a.cost - b.cost;
    });
    removeprev();
    appendData(res);
  } else if (data === "htol") {
    let data = await fetch("http://localhost:3000/villas");
    let res = await data.json();
    res.sort((a, b) => {
      return b.cost - a.cost;
    });
    removeprev();
    appendData(res);
  } else {
    let data = await fetch("http://localhost:3000/villas");
    let res = await data.json();
    removeprev();
    appendData(res);
  }
}

let r_value;

function rangeSlide(value) {
  document.getElementById("rangeValue").innerHTML = value;
  r_value = value;
}

async function filterRange(e) {
  let filterData = [];
  e.preventDefault();
  let data = await fetch("http://localhost:3000/villas");
  let res = await data.json();
  let range_num = parseInt(r_value);
  res.forEach((element) => {
    if (element.cost <= range_num) {
      filterData.push(element);
    }
  });
  removeprev();
  appendData(filterData);
}
