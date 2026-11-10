// ---- Product list (12 items = 4 columns x 3 rows) ----
let products = [
    { id: 1,  name: "Frozen 2 Erasable Gel Pen Set", icon: "🖊️", price: 249, desc: "Set of 6 pens with Elsa, Anna and Olaf toppers.", image: "media/products/product1_pens.jpg" },
    { id: 2,  name: "Frozen 2 Pencil Case", icon: "✏️", price: 299, desc: "Double-zip pencil case with Elsa, Anna and Olaf.", image: "media/products/product2_pencilcase.jpg" },
    { id: 3,  name: "Elsa & Anna Trolley Backpack", icon: "🎒", price: 1599, desc: "Rolling school bag in icy blue.", image: "media/products/product3_bag.jpg" },
    { id: 4,  name: "Elsa & Anna Tumbler", icon: "🥤", price: 449, desc: "Tumbler with straw and a double-wall design.", image: "media/products/product4_tumbler.jpg" },
    { id: 5,  name: "Olaf Ceramic Mug", icon: "☕", price: 349, desc: "\"I like warm hugs\" mug with a 3D Olaf.", image: "media/products/product5_olaf_mug.jpg" },
    { id: 6,  name: "Elsa Hoodie", icon: "🧥", price: 1499, desc: "Soft light-blue hoodie with a little cape.", image: "media/products/product6_hoodie.jpg" },
    { id: 7,  name: "Elsa Snow Queen Dress", icon: "👗", price: 1899, desc: "Sparkly ice-blue costume dress.", image: "media/products/product7_elsa_dress.jpg" },
    { id: 8,  name: "Sven Reindeer Plush", icon: "🦌", price: 699, desc: "Kristoff's loyal reindeer best friend.", image: "media/products/product8_sven.jpg" },
    { id: 9,  name: "Bruni Fire Spirit Toy", icon: "🔥", price: 549, desc: "The tiny fire salamander spirit.", image: "media/products/product9_bruni.jpg" },
    { id: 10, name: "Anna Classic Doll", icon: "👧", price: 1299, desc: "Anna in her travel outfit.", image: "media/products/product10_annadoll.jpg" },
    { id: 11, name: "Elsa Collector Doll", icon: "👸", price: 1499, desc: "Elsa in her gown with a long braid.", image: "media/products/product11_elsadoll.png" },
    { id: 12, name: "Olaf Plush", icon: "⛄", price: 599, desc: "Soft, huggable snowman.", image: "media/products/product12_olafdoll.jpg" }
];

let cart = [];

// ---- Show the products on the page ----
function showProducts() {
    let html = "";
    for (let i = 0; i < products.length; i++) {
        let p = products[i];
        html += "<div class='card product-card'>" +
                    "<div class='product-img'>" + p.icon + "<img src='" + p.image + "' alt='" + p.name + "' onerror='this.remove()'></div>" +
                    "<h3>" + p.name + "</h3>" +
                    "<p class='desc'>" + p.desc + "</p>" +
                    "<p class='price'>&#8369;" + p.price.toLocaleString() + "</p>" +
                    "<button class='btn' onclick='addToCart(" + p.id + ")'>Add to Cart</button>" +
                "</div>";
    }
    document.getElementById("productGrid").innerHTML = html;
}

// ---- Add to cart ----
function addToCart(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].qty += 1;       // already in the cart, add 1 more
            saveCart();
            showCart();
            return;
        }
    }
    cart.push({ id: id, qty: 1 });
    saveCart();
    showCart();
}

// ---- Change quantity (+1 or -1) ----
function changeQty(id, amount) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].qty += amount;
            if (cart[i].qty <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
    showCart();
}

function removeItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
    showCart();
}

function clearCart() {
    cart = [];
    saveCart();
    showCart();
}

// ---- Custom Centered Checkout Alert Modal (Updated without Obsidian Cinema) ----
function checkout() {
    let overlay = document.createElement("div");
    overlay.className = "custom-modal-overlay";

    let modal = document.createElement("div");
    modal.className = "custom-modal";
    
    let message = document.createElement("p");
    message.innerHTML = "Thank you for your purchase!<br><br><strong>(This is only a school project demo.)</strong>";
    
    let okBtn = document.createElement("button");
    okBtn.className = "btn";
    okBtn.innerText = "OK";
    
    okBtn.onclick = function() {
        document.body.removeChild(overlay);
        clearCart();
    };

    modal.appendChild(message);
    modal.appendChild(okBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// ---- Find a product by id ----
function getProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
}

// ---- Show the cart ----
function showCart() {
    let rows = "";
    let total = 0;
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        let p = getProduct(cart[i].id);
        let subtotal = p.price * cart[i].qty;
        total += subtotal;
        count += cart[i].qty;

        rows += "<tr>" +
                    "<td>" + p.icon + " " + p.name + "</td>" +
                    "<td>&#8369;" + p.price.toLocaleString() + "</td>" +
                    "<td><button class='qty-btn' onclick='changeQty(" + p.id + ", -1)'>-</button> " +
                        cart[i].qty +
                        " <button class='qty-btn' onclick='changeQty(" + p.id + ", 1)'>+</button></td>" +
                    "<td>&#8369;" + subtotal.toLocaleString() + "</td>" +
                    "<td><button class='qty-btn remove-btn' onclick='removeItem(" + p.id + ")'>x</button></td>" +
                "</tr>";
    }

    document.getElementById("cartBody").innerHTML = rows;
    document.getElementById("cartTotal").innerHTML = "&#8369;" + total.toLocaleString();
    document.getElementById("cartCount").innerHTML = count;

    let hasItems = cart.length > 0;
    let ids = ["cartTable", "cartTotalBox", "clearBtn", "checkoutBtn"];
    for (let j = 0; j < ids.length; j++) {
        if (hasItems) {
            document.getElementById(ids[j]).classList.remove("hidden");
        } else {
            document.getElementById(ids[j]).classList.add("hidden");
        }
    }
    if (hasItems) {
        document.getElementById("cartEmpty").classList.add("hidden");
    } else {
        document.getElementById("cartEmpty").classList.remove("hidden");
    }
}

// ---- Keep the cart when the page is refreshed (localStorage) ----
function saveCart() {
    localStorage.setItem("frozenCart", JSON.stringify(cart));
}

function loadCart() {
    let saved = localStorage.getItem("frozenCart");
    if (saved !== null) {
        cart = JSON.parse(saved);
    }
}

loadCart();
showProducts();
showCart();