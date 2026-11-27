
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

// MOBILE MENU
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.textContent = nav.classList.contains("active") ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

// SEARCH
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchBox.classList.add("active");
  searchInput.focus();
});

closeSearch.addEventListener("click", () => {
  searchBox.classList.remove("active");
  searchInput.value = "";
  filterProducts("");
});

searchInput.addEventListener("input", event => {
  filterProducts(event.target.value);
});

function filterProducts(value) {
  const cards = document.querySelectorAll(".product-card");
  let found = 0;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const matched = name.includes(value.trim().toLowerCase());

    card.style.display = matched ? "" : "none";

    if (matched) found++;
  });

  document.getElementById("noResult").style.display =
    found === 0 ? "block" : "none";
}

// CART
let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function openCart() {
  cartDrawer.classList.add("active");
  overlay.classList.add("active");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  overlay.classList.remove("active");
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();

    button.textContent = "✓";
    setTimeout(() => button.textContent = "+", 700);
  });
});

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = count;
  cartTotal.textContent = total.toLocaleString("fa-IR") + " تومان";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">سبد خریدت هنوز خالیه.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div>
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString("fa-IR")} تومان × ${item.quantity}</p>
      </div>
      <button class="remove-item" data-index="${index}">×</button>
    </div>
  `).join("");

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);
      updateCart();
    });
  });
}

// FAVORITES
document.querySelectorAll(".favorite-btn").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    button.textContent =
      button.classList.contains("active") ? "♥" : "♡";
  });
});

// FEATURED SLIDER
const slider = document.getElementById("slider");

document.getElementById("slideNext").addEventListener("click", () => {
  slider.scrollBy({ left: -300, behavior: "smooth" });
});

document.getElementById("slidePrev").addEventListener("click", () => {
  slider.scrollBy({ left: 300, behavior: "smooth" });
});

// FLOATING MUSIC NOTES
const notesContainer = document.getElementById("musicNotes");
const notes = ["♪", "♫", "♬", "𝄞"];

function createMusicNote() {
  const note = document.createElement("span");

  note.className = "floating-note";
  note.textContent = notes[Math.floor(Math.random() * notes.length)];

  note.style.left = Math.random() * 100 + "%";
  note.style.fontSize = (18 + Math.random() * 22) + "px";
  note.style.animationDuration = (6 + Math.random() * 5) + "s";

  notesContainer.appendChild(note);

  setTimeout(() => note.remove(), 11000);
}

for (let i = 0; i < 8; i++) {
  setTimeout(createMusicNote, i * 350);
}

setInterval(createMusicNote, 1300);
