const winkelmand = [];
const wishlist = [];

const products = [
    { naam: "NIke Pegasus Trail 5", prijs: 145, foto: "./assets/Images/ProductImages/NIikePegasusTrail5.webp" },
    { naam: "Nike Zoom XVaporfly Trail", prijs: 160, foto: "./assets/Images/ProductImages/NikeZoomXVaporflyTrail.webp" },
    { naam: "On Cloudultra 2", prijs: 180, foto: "./assets/Images/ProductImages/On_cloudultra_2.jpeg" },
    { naam: "Salomon Speedcross", prijs: 145, foto: "./assets/Images/ProductImages/SalomonSpeedcross.webp" },
    { naam: "Saucony Peregrine 14", prijs: 129, foto: "./assets/Images/ProductImages/SauconyPeregrine14.webp" },
    { naam: "Agravic Speed Ultra", prijs: 135, foto: "./assets/Images/ProductImages/AgravicSpeedUltra.webp" },
    { naam: "Altra Lone Peak 8", prijs: 145, foto: "./assets/Images/ProductImages/Altra-Lone-Peak-8.jpg" },
    { naam: "Asics Trabuco Max", prijs: 160, foto: "./assets/Images/ProductImages/Asics_Trabuco_Max.jpg" },
    { naam: "Brooks Cascadia 18", prijs: 149, foto: "./assets/Images/ProductImages/Brooks_cascadia_18.jpeg" },
    { naam: "Dynafit Ultra 100", prijs: 175, foto: "./assets/Images/ProductImages/Dynafit_Ultra_100.jpeg" },
    { naam: "Hoka One One Speedgoat 6", prijs: 160, foto: "./assets/Images/ProductImages/Hoka_speedgoat_6.jpeg" },
    { naam: "New Balance Fresh Foam More Trail", prijs: 155, foto: "./assets/Images/ProductImages/NBFFXMoreTrail.webp" }
];

function updateCartUI() {
    const cartElement = document.querySelector('.cart-items');
    const totalElement = document.querySelector('#cart-total'); // verwijst via document.queryselector naar dat element

    cartElement.innerHTML = ''; //wat als ik dit weg haal?

    if (winkelmand.length === 0) { 
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Je winkelmandje is leeg.';
        cartElement.appendChild(emptyMessage); // voegt kind element toe: ouder - kind
    } else {
        winkelmand.forEach(product => {
            const productElement = document.createElement('article');
            productElement.classList.add('cart-item');

            const productInfo = document.createElement('p');
            productInfo.textContent = `${product.naam} (${product.aantal}x) - €${(product.prijs * product.aantal).toFixed(2)}`;
            productInfo.classList.add('cart-item-info');

            const controlsContainer = document.createElement('section');
            controlsContainer.classList.add('cart-item-controls');

            const productImage = document.createElement('img');
            productImage.src = product.foto;
            productImage.alt = product.naam;
            productImage.classList.add('cart-item-image');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Verwijder';
            removeButton.addEventListener('click', () => removeProductFromCart(product.naam));

            controlsContainer.appendChild(productImage);
            controlsContainer.appendChild(removeButton);

            productElement.appendChild(productInfo);
            productElement.appendChild(controlsContainer);
            cartElement.appendChild(productElement);
        });
    }

    totalElement.textContent = calculateTotal();
}

function addProductToCart(product) {
    const productenInWinkelmand = winkelmand.map(d => d.naam);
    const isAlInWinkelmand = productenInWinkelmand.includes(product.naam);

    if (isAlInWinkelmand) {
        const filteredProducts = winkelmand.filter(k => k.naam === product.naam);
        const myProduct = filteredProducts[0];
        myProduct.aantal++;
    } else {
        product.aantal = 1;
        winkelmand.push(product);
    }
    updateCartUI();
}


function removeProductFromCart(productName) {
    const productInCart = winkelmand.find(item => item.naam === productName);

    if (productInCart) {
        if (productInCart.aantal > 1) {
            productInCart.aantal--;
        } else {
            winkelmand.splice(winkelmand.indexOf(productInCart), 1);
        }
    }

    updateCartUI();
}

function calculateTotal() {
    const total = winkelmand.reduce((acc, item) => acc + item.prijs * item.aantal, 0);
    return total.toFixed(2);
}

function updateWishlistUI() {
    const wishlistElement = document.querySelector('.wishlist-items');
    wishlistElement.innerHTML = '';

    if (wishlist.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Je wishlist is leeg.';
        wishlistElement.appendChild(emptyMessage);
    } else {
        wishlist.forEach(product => {
            const productElement = document.createElement('article');
            productElement.classList.add('wishlist-item');

            const productInfo = document.createElement('p');
            productInfo.textContent = `${product.naam} - €${product.prijs.toFixed(2)}`;
            productInfo.classList.add('wishlist-item-info');

            const controlsContainer = document.createElement('section');
            controlsContainer.classList.add('wishlist-item-controls');

            const productImage = document.createElement('img');
            productImage.src = product.foto;
            productImage.alt = product.naam;
            productImage.classList.add('wishlist-item-image');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Verwijder';
            removeButton.addEventListener('click', () => removeProductFromWishlist(product.naam));

            controlsContainer.appendChild(productImage);
            controlsContainer.appendChild(removeButton);

            productElement.appendChild(productInfo);
            productElement.appendChild(controlsContainer);
            wishlistElement.appendChild(productElement);
        });
    }
}

function addProductToWishlist(product) {
    const isInWishlist = wishlist.some(p => p.naam === product.naam);

    if (!isInWishlist) {
        wishlist.push(product);
    }

    updateWishlistUI();
}

function removeProductFromWishlist(productName) {
    const productIndex = wishlist.findIndex(item => item.naam === productName);
    if (productIndex > -1) {
        wishlist.splice(productIndex, 1);
        updateWishlistUI();

        const heartIcon = document.querySelector(`img[data-product="${productName}"].wishlist-icon`);
        if (heartIcon) {
            heartIcon.src = './assets/Images/leeg_hartje.png';
        }
    }
}

document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-product');
        const selectedProduct = products.find(p => p.naam === productName);
        if (selectedProduct) {
            addProductToWishlist(selectedProduct);
        } else {
            console.log('Product niet gevonden');
        }
    });
});

document.getElementById("toggleCartButton").addEventListener("click", function () {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartButton = document.getElementById('toggleCartButton');
    const wishlistItems = document.querySelector('.wishlist-items');
    const wishlistButton = document.getElementById('toggleWishlistButton');

    if (cartItems.style.display === "none" || cartItems.style.display === "") {
        cartItems.style.display = "block";
        cartTotal.style.display = "block";
        cartButton.textContent = "Verberg Winkelmandje";
        wishlistItems.style.display = "none";
        wishlistButton.textContent = "Bekijk Wishlist";
    } else {
        cartItems.style.display = "none";
        cartTotal.style.display = "none";
        cartButton.textContent = "Bekijk Winkelmandje";
    }
});

document.getElementById("toggleWishlistButton").addEventListener("click", function () {
    const wishlistItems = document.querySelector('.wishlist-items');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartButton = document.getElementById('toggleCartButton');
    const wishlistButton = document.getElementById('toggleWishlistButton');

    if (wishlistItems.style.display === "none" || wishlistItems.style.display === "") {
        wishlistItems.style.display = "block";
        cartItems.style.display = "none";
        cartTotal.style.display = "none";
        wishlistButton.textContent = "Verberg Wishlist";
        cartButton.textContent = "Bekijk Winkelmandje";
    } else {
        wishlistItems.style.display = "none";
        wishlistButton.textContent = "Bekijk Wishlist";
    }
});

document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-product');
        const selectedProduct = products.find(p => p.naam === productName);
        if (selectedProduct) {
            addProductToCart(selectedProduct);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateWishlistUI();

    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const productName = this.getAttribute('data-product');
            const selectedProduct = products.find(p => p.naam === productName);

            if (selectedProduct) {
                if (wishlist.some(product => product.naam === selectedProduct.naam)) {
                    removeProductFromWishlist(selectedProduct.naam);
                    this.src = './assets/Images/leeg_hartje.png';
                } else {
                    addProductToWishlist(selectedProduct);
                    this.src = './assets/Images/vol_hartje.png';
                }
            }
        });
    });
});

// ------------------------------------- klanten api --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const customersContainer = document.getElementById("customers-container-script");
  
    fetch("https://randomuser.me/api/?results=12&nat=us,gb,fr,nl,be")
      .then(response => response.json())
      .then(data => {
        const customers = data.results;
        customers.forEach(customer => {
          const customerCard = document.createElement("section");
          customerCard.classList.add("customer-card");
  
          customerCard.innerHTML = `
            <img src="${customer.picture.large}" alt="Foto van ${customer.name.first} ${customer.name.last}">
            <h3>${customer.name.title}. ${customer.name.first} ${customer.name.last}</h3>
            <p>Afkomst: ${customer.location.country}</p>
          `;
  
          customersContainer.appendChild(customerCard);
        });
      })
      .catch(error => console.error("Fout bij het ophalen van klanten:", error));
  });  
  