let token = "";

// Register
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPass").value,
        role: document.getElementById("regRole").value
      })
    });
    const data = await res.json();
    document.getElementById("registerResult").textContent = data.token ? "Registered! Token: " + data.token : (data.message || "Registration failed");
  });
}

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("logEmail").value,
        password: document.getElementById("logPass").value
      })
    });
    const data = await res.json();
    if (data.token) {
      token = data.token;
      document.getElementById("loginResult").textContent = "Logged in! Token stored.";
    } else {
      document.getElementById("loginResult").textContent = data.message || "Login failed";
    }
  });
}

// Add Product (Admin)
if (document.getElementById("productForm")) {
  document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: document.getElementById("prodName").value,
        price: document.getElementById("prodPrice").value,
        category: document.getElementById("prodCategory").value
      })
    });
    const data = await res.json();
    document.getElementById("productResult").textContent = data.name ? `Product Added: ${data.name}` : (data.message || "Add product failed");
  });
}

// View Products
if (document.getElementById("viewProductsBtn")) {
  document.getElementById("viewProductsBtn").addEventListener("click", async () => {
    const res = await fetch("/api/products");
    const products = await res.json();
    const list = document.getElementById("productsList");
    if (Array.isArray(products) && products.length) {
      list.innerHTML = `<ul class='list-group'>` + products.map(p => `<li class='list-group-item'><b>${p.name}</b> ($${p.price}) [${p.category}] <span class='text-muted'>ID: ${p._id}</span></li>`).join('') + `</ul>`;
    } else {
      list.textContent = "No products found.";
    }
  });
}

// Add to Cart
if (document.getElementById("addToCartForm")) {
  document.getElementById("addToCartForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: document.getElementById("cartProductId").value,
        quantity: Number(document.getElementById("cartQuantity").value)
      })
    });
    const data = await res.json();
    document.getElementById("cartResult").textContent = data.items ? "Added to cart!" : (data.message || "Add to cart failed");
  });
}

// View Cart
if (document.getElementById("viewCartBtn")) {
  document.getElementById("viewCartBtn").addEventListener("click", async () => {
    const res = await fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const cart = await res.json();
    const list = document.getElementById("cartList");
    if (cart.items && cart.items.length) {
      list.innerHTML = `<ul class='list-group'>` + cart.items.map(item => `<li class='list-group-item'>${item.product?.name || item.product} x ${item.quantity}</li>`).join('') + `</ul>`;
    } else {
      list.textContent = "Cart is empty.";
    }
  });
}

// Remove from Cart
if (document.getElementById("removeFromCartForm")) {
  document.getElementById("removeFromCartForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: document.getElementById("removeProductId").value
      })
    });
    const data = await res.json();
    document.getElementById("cartResult").textContent = data.items ? "Removed from cart!" : (data.message || "Remove from cart failed");
  });
}

// Place Order
if (document.getElementById("placeOrderBtn")) {
  document.getElementById("placeOrderBtn").addEventListener("click", async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    document.getElementById("ordersList").textContent = data._id ? `Order placed! Order ID: ${data._id}` : (data.message || "Order failed");
  });
}

// View Orders
if (document.getElementById("viewOrdersBtn")) {
  document.getElementById("viewOrdersBtn").addEventListener("click", async () => {
    const res = await fetch("/api/orders", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const orders = await res.json();
    const list = document.getElementById("ordersList");
    if (Array.isArray(orders) && orders.length) {
      list.innerHTML = `<ul class='list-group'>` + orders.map(o => `<li class='list-group-item'>Order #${o._id} - $${o.totalPrice} <br><small>${new Date(o.createdAt).toLocaleString()}</small></li>`).join('') + `</ul>`;
    } else {
      list.textContent = "No orders found.";
    }
  });
} 