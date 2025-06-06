const products = [
  { id: 1, name: "Vestido Elegante", price: 35.00, image: "https://picsum.photos/id/1003/400/300" },
  { id: 2, name: "Camisa Casual", price: 25.00, image: "https://picsum.photos/id/1004/400/300" },
  { id: 3, name: "Pantalones Jeans", price: 40.00, image: "https://picsum.photos/id/1006/400/300" }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <button class="btn btn-dark mt-auto" onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
      </div>`;
    productList.appendChild(col);
  });
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} (x${item.qty})
      <span>$${(item.price * item.qty).toFixed(2)}</span>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

renderProducts();
renderCart();
