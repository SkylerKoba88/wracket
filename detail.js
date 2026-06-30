import { fetchInventory } from "./supabase-client.js";

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("product-container");

    if (!container) {
        console.error("product-container not found");
        return;
    }

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        if (!productId) {
            container.innerHTML = "<h2>Error: no product specified.</h2>";
            return;
        }

        const products = await fetchInventory();

        const product = products.find((item) => item.id === productId);

        if (!product) {
            container.innerHTML = "<h2>Error: Product not found.</h2>";
            return;
        }

        const materialsMarkup = (product.materials || [])
            .map((material) => `<li>${material}</li>`)
            .join("");

        const sizesMarkup = (product.sizes || []).length > 0
            ? `<p><strong>Sizes:</strong> ${product.sizes.join(", ")}</p>`
            : "<p>Sizes: One size</p>";

        const quantityText = product.quantity !== undefined && product.quantity < 10
            ? `<p><strong>Quantity:</strong> ${product.quantity}</p>`
            : "";

        container.innerHTML = `
            <div class="detail-container">
                <div class="carousel-container">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="text">
                    <h3>${product.name}</h3>
                    <p>${product["long-description"] || product.description}</p>
                    <p><strong>Materials:</strong></p>
                    <ul>${materialsMarkup}</ul>
                    ${sizesMarkup}
                    ${quantityText}
                    <button>Add to Cart</button>
                    <button>Buy Now</button>
                </div>
            </div>
            <div>
                <p>Product reviews here</p>
            </div>
            <div>
                <p>display similar products here</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = "<h2>An error occurred while loading the page.</h2>";
    }
});