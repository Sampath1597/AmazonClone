function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase().trim();
    let products = document.querySelectorAll(".product");

    if (input.length === 0) {
        products.forEach(product => product.style.display = "block"); // Show all if input is empty
        return;
    }

    products.forEach(product => {
        let productName = product.querySelector("h2").innerText.toLowerCase();
        product.style.display = productName.includes(input) ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let searchBox = document.getElementById("search");
    searchBox.style.color = "black"; // Ensures text is visible
    searchBox.style.backgroundColor = "white"; // Prevents blending
});

// Refresh Page when Clicking "Amazon Clone"
function refreshPage() {
    location.reload();
}

let productHTML = `
    <div class="product bg-white p-4 rounded-md shadow-lg w-72 border border-gray-300 hover:scale-105 transition-transform">
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-md">
        <h2 class="text-lg font-semibold mt-2 text-black">${product.name}</h2>
        <p class="font-bold text-yellow-700">Price: ₹${product.price}</p>
        <a href="${product.amazonUrl}" target="_blank" class="bg-yellow-500 text-white block text-center py-2 mt-2 rounded-md hover:bg-yellow-600">Buy Now</a>
    </div>
`;

// Toggle Menu Visibility
function toggleMenu() {
    let menu = document.getElementById("menu-items");
    menu.classList.toggle("hidden"); // Show/Hide menu dynamically
}

function refreshPage() {
    location.reload(); // Clicking logo refreshes page
}

// Updated Filtering Function to Show All Products if Needed
function filterCategory(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");
        product.style.display = (category === "all" || productCategory === category) ? "block" : "none";
    });
}


// Load Products Dynamically
function loadProducts() {
    const products = [
        { name: "Cosmic Byte ARES Wireless Controller", category: "electronics", price: 1549, image: "product1.jpg", amazonUrl: "https://www.amazon.in/dp/B07NY2WXPH?tag=your-affiliate-id" },
        { name: "Apple iPhone 14 Pro Max", category: "electronics", price: 63440, image: "iphone.jpg", amazonUrl: "https://amzn.to/45clK47" },
        { name: "Samsung Galaxy S23 Ultra", category: "electronics", price: 84719, image: "samsung_s23_ultra.jpg", amazonUrl: "https://amzn.to/45Io2YK" },
        { name: "Sony WH-1000XM4 Headphones", category: "electronics", price: 22990, image: "sony_headphones.jpg", amazonUrl: "https://amzn.to/4mPZymF" }
    ];

    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear previous items

    products.forEach(product => {
        let productHTML = `
            <div class="product bg-white p-4 rounded-md shadow-lg w-72 border border-gray-300">
                <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-md">
                <h2 class="text-lg font-semibold mt-2 text-black">${product.name}</h2>
                <p class="font-bold text-yellow-700">Price: ₹${product.price}</p>
                <a href="${product.amazonUrl}" target="_blank" class="bg-yellow-500 text-white block text-center py-2 mt-2 rounded-md">Buy Now</a>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    // Animate products after loading
    gsap.from(".product", { duration: 1, opacity: 1, y: 50, stagger: 0.2 });
}

// Call the function when the page loads
window.onload = loadProducts;

// Category Filtering
function filterCategory(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let productCategory = product.getAttribute("data-category");
        if (category === "all") {
            product.style.display = "block"; // Show all products when clicking "All"
        } else {
            product.style.display = productCategory === category ? "block" : "none";
        }
    });
}

// Affiliate Redirection
function redirectToAmazon(url) {
    window.open(url, "_blank");
}

// Sign-In Functionality
async function signIn() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!email || !password) {
        alert("Email and password are required!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert(`Welcome, ${data.user.name}! You are now signed in.`);
            updateUI();
        } else {
            alert(`Sign-In Failed: ${data.msg}`);
        }
    } catch (error) {
        console.error("Error signing in:", error);
        alert("Server error! Please try again later.");
    }
}

// Update UI after login
function updateUI() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.querySelector(".nav-links").innerHTML = `
            <a href="#">Welcome, ${user.name}</a>
            <a href="javascript:void(0);" onclick="signOut()">Sign Out</a>
            <a href="#" class="hover:text-yellow-400">Orders</a>
        `;
    }
}

// Sign Out Functionality
function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have signed out!");
    location.reload();
}