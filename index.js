// npm install -g json- server 
// json-server --watch db.json

const titleInp = document.querySelector("#title");
const descirptionInp = document.querySelector("#descirption");
const priceInp = document.querySelector("#price");
const form = document.querySelector(".form");
const updateBtn = document.querySelector("#update");
const searchInput = document.querySelector("#search"); 

const products = document.querySelector(".products");
let allProducts = []; 

function getData() {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
      allProducts = res; 
      displayData(res);
    });
}

function displayData(data) {
  const searchText = searchInput.value.toLowerCase();
  products.innerHTML = "";

  data.forEach((item) => {
    if (item.title.toLowerCase().includes(searchText)) {
      products.innerHTML += `
        <div class="product">
          <img src='${item.image}' />
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <b>${item.price}</b>
          <button id="${item.id}" class="btn">Edit</button>
        </div>
      `;
    }
  });


  const btns = document.querySelectorAll(".btn");
  btns.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const existingItem = data.find((item) => +item.id === +button.id);
      editProduct(existingItem);
    });
  });
}

getData();

searchInput.addEventListener("input", () => {
  getData();
});

function editProduct(item) {
  if (item) {
    titleInp.value = item.title;
    descirptionInp.value = item.description;
    priceInp.value = item.price;

    updateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      updateProduct(item.id);
    });
  }
}

function updateProduct(id) {
  const obj = {
    id: id,
    title: titleInp.value,
    price: priceInp.value,
    description: descirptionInp.value,
  };
  fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
  getData();
}
