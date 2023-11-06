document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");

    const products = [
        { id: 1, name: "Produk 1", price: 100000 },
        { id: 2, name: "Produk 2", price: 150000 },
        { id: 3, name: "Produk 3", price: 200000 },
    ];

    let cart = [];

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                ${item.name} - Rp. ${item.price}
                <button class="remove-from-cart" data-id="${item.id}">Hapus</button>
            `;
            cartList.appendChild(cartItem);
            total += item.price;
        });

        totalPrice.textContent = `Rp. ${total}`;
    }

    products.forEach((product) => {
        const productItem = document.createElement("li");
        productItem.innerHTML = `
            ${product.name} - Rp. ${product.price}
            <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
        `;

        const addToCartButton = productItem.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", (event) => {
            const productId = parseInt(event.target.getAttribute("data-id"));
            const productToAdd = products.find((product) => product.id === productId);
            cart.push(productToAdd);
            updateCart();
        });

        productList.appendChild(productItem);
    });

    cartList.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-from-cart")) {
            const productId = parseInt(event.target.getAttribute("data-id"));
            const index = cart.findIndex((item) => item.id === productId);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCart();
            }
        }
    });

    document.getElementById("checkout-button").addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Terima kasih telah berbelanja! Total pembayaran: " + totalPrice.textContent);
        } else {
            alert("Keranjang belanja Anda kosong.");
        }
        
    });
});
