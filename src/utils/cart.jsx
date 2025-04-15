export function localCart() {
  let cart = localStorage.getItem("cart");

  if (!cart) {
    cart = {
      orderedItems: [],
      days: 1,
      startingDate: formatDate(new Date()),
      endingDate: formatDate(new Date()),
    };
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }

  return JSON.parse(cart);
}

export function addToCart(key, qty) {
  const cart = localCart();
  let found = false;

  for (let i = 0; i < cart.orderedItems.length; i++) {
    if (cart.orderedItems[i].key === key) {
      cart.orderedItems[i].qty += qty;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.orderedItems.push({ key, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(key) {
  const cart = localCart(); // ✅ Fixed function call
  cart.orderedItems = cart.orderedItems.filter((item) => item.key !== key);
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // ✅ Ensures two digits
  const day = String(date.getDate()).padStart(2, "0"); // ✅ Ensures two digits
  return `${year}-${month}-${day}`;
}
