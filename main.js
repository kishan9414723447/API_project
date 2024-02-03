let container = document.getElementById("container");
let submitItem = document.getElementById("submitBtn");
let para = document.getElementById("para");

let total = 0;

window.addEventListener("DOMContentLoaded", myOnloadFun);

async function getData() {
  let res = await axios.get(
    "https://crudcrud.com/api/b45088c36e1b4456ac5f0cc2bd55ebd8/data"
  );

  return res;
}

function showDetails(price, product_name, id, total) {
  var li = document.createElement("li");
  var textNode = document.createTextNode(`${price}-${product_name}`);
  var button = document.createElement("button");
  var deleteText = document.createTextNode("Delete");
  var span = document.createElement("span");

  li.appendChild(textNode);
  button.appendChild(deleteText);

  span.appendChild(li);
  span.appendChild(button);
  container.appendChild(span);

  para.innerHTML = `Total value worth of product: ${total}`;

  button.addEventListener("click", (e) =>
    deleteFun(e, button, id, total, price, product_name)
  );
}

function myOnloadFun() {
  getData().then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      var price = res.data[i].price;
      var product_name = res.data[i].product_name;
      var id = res.data[i]._id;
      showDetails(price, product_name, id, total);
    }
  });
}

submitItem.addEventListener("click", onsubmit);
async function onsubmit(e) {
  e.preventDefault();

  let price = document.getElementById("price").value;
  let product_name = document.getElementById("product").value;
  total += Number(price);

  let userObj = {
    price,
    product_name,
  };

  axios
    .post(
      "https://crudcrud.com/api/b45088c36e1b4456ac5f0cc2bd55ebd8/data",
      userObj
    )
    .then((temp) => showDetails(price, product_name, temp.data._id, total))

    .catch((err) => console.log(err));
}

function deleteFun(e, button, myid, total, price, product_name) {
  e.preventDefault();

  total -= price;

  var parentEle = button.parentElement;
  parentEle.remove();

  axios
    .delete(
      `https://crudcrud.com/api/b45088c36e1b4456ac5f0cc2bd55ebd8/data/${myid}`
    )
    .then((temp) => {
      console.log(total);

      para.innerHTML = `Total value worth of product: ${total}`;
    })
    .catch((err) => console.error(err));
}
