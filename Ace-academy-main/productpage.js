// Product data with more images
const products = [
    {
        id: 0,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMWlbDQYgxCo2A1vosXX0fkCSzLogRsqO1p2ZuqYcmA5c0pCR6_BrdCoKuoFKfzt1UOE&usqp=CAU',
        title: 'Children\'s Clothing Set',
        description: 'This product was donated by Ramakrishna from Hyderabad. Perfect for kids aged 5-10 years. Made from comfortable cotton material. Includes shirts, pants, and accessories.',
        donor: 'Ramakrishna from Hyderabad'
    },
    {
        id: 1,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ezQDYHyw4UvOZed5VurbiwMdUnOAykf6bA&s',
        title: 'Girls\' Dress Collection',
        description: 'This product was donated by Ramu from Nirmal. Suitable for girls, excellent condition with vibrant colors. Perfect for special occasions and daily wear.',
        donor: 'Ramu from Nirmal'
    },
    {
        id: 2,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfw-kSfdNPS1olUA86w8uQGPLNvlZmu_Ar6Q&s',
        title: 'Casual Wear',
        description: 'This product is donated by Krishna from Medak. High quality fabric, perfect for daily wear. Comfortable and durable clothing for active children.',
        donor: 'Krishna from Medak'
    },
    {
        id: 3,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1bHPMpNVYosTZC42DR3Jj0rQXJ8Gq2TpPWA&s',
        title: 'Winter Collection',
        description: 'This product was donated by Ramesh from Kollur. Comfortable and durable, great for active children. Warm clothes perfect for cold weather.',
        donor: 'Ramesh from Kollur'
    },
    {
        id: 4,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi4Xh1Vh_x2CHDwb_gLNsamw-bWAJLmCJJIw&s',
        title: 'School Uniforms',
        description: 'This product was donated by Manohar from Allahabad. Versatile clothing suitable for both girls and boys. Educational support through proper clothing.',
        donor: 'Manohar from Allahabad'
    },
    {
        id: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1rI9c4VGF9pPibS6DBOg4xe9pId8JDxupiA&s',
        title: 'Sports Wear',
        description: 'This product was donated by Priya from Chennai. Perfect for active children who love sports. Breathable fabric and comfortable fit.',
        donor: 'Priya from Chennai'
    },
    {
        id: 6,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnTvo6xNxvNh8ZARdTL5fRn30Z1RHwlFEfRg&s',
        title: 'Traditional Wear',
        description: 'This product was donated by Lakshmi from Bangalore. Beautiful traditional clothing for festivals and special occasions. Rich cultural heritage.',
        donor: 'Lakshmi from Bangalore'
    },
    {
        id: 7,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEFoWPMRIFMsStTzzYwsnyT9X3_Fq4tXgxg&s',
        title: 'Baby Clothes',
        description: 'This product was donated by Anjali from Pune. Soft and gentle clothing for infants and toddlers. Made with love and care.',
        donor: 'Anjali from Pune'
    },
    {
        id: 8,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxvQv4yF5Qs8wQGpYvF5Qs8wQGpYvF5Qs8wQ&s',
        title: 'Summer Collection',
        description: 'This product was donated by Rajesh from Delhi. Light and airy clothes perfect for hot summer days. Comfortable and stylish.',
        donor: 'Rajesh from Delhi'
    },
    {
        id: 9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKvQv4yF5Qs8wQGpYvF5Qs8wQGpYvF5Qs8wQ&s',
        title: 'Party Wear',
        description: 'This product was donated by Meera from Kolkata. Elegant party wear for special celebrations. Makes every child feel special.',
        donor: 'Meera from Kolkata'
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProductId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    
    // Check if specific product was selected from homepage
    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct !== null) {
        const productId = parseInt(selectedProduct);
        setTimeout(() => {
            openProductModal(productId);
        }, 500);
        localStorage.removeItem('selectedProduct');
    }
});

// Load products dynamically
function loadProducts() {
    const container = document.getElementById('productsContainer');
    
    container.innerHTML = products.map((product, index) => {
        return `
            <section class="product">
                <img src="${product.image}" 
                     alt="${product.title}" 
                     class="product-image" 
                     onclick="openProductModal(${index})">
                <div class="product-details">
                    <h1>${product.title}</h1>
                    <p>${product.description}</p>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <div class="quantity-section">
                        <label for="quantity${index + 1}">Quantity:</label>
                        <input type="number" id="quantity${index + 1}" value="1" min="1">
                    </div>
                    <div class="product-buttons">
                        <button class="add-to-cart-btn" onclick="addToCart(${index})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="donate-btn" onclick="handleDonateClick(${index})">
                            <i class="fas fa-hand-holding-heart"></i> Donate
                        </button>
                    </div>
                </div>
            </section>
        `;
    }).join('');
}

// Function to open product modal
function openProductModal(productId) {
    currentProductId = productId;
    const product = products[productId];
    
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Add rating stars
    const ratingDiv = document.getElementById('modalRating');
    ratingDiv.innerHTML = `
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star-o"></i>
    `;
    
    document.getElementById('productModal').style.display = 'block';
}

// Function to close product modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    currentProductId = null;
}

// Function to add to cart from product page
function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`quantity${productId + 1}`).value);
    const product = products[productId];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
    updateCartCount();
    
    // Redirect to cart page
    setTimeout(() => {
        window.location.href = 'cartpage.html';
    }, 1000);
}

// Function to add to cart from modal
function addToCartFromModal() {
    if (currentProductId !== null) {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        const product = products[currentProductId];
        
        const existingItem = cart.find(item => item.id === currentProductId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: currentProductId,
                title: product.title,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
        closeProductModal();
        updateCartCount();
        
        // Redirect to cart page
        setTimeout(() => {
            window.location.href = 'cartpage.html';
        }, 1000);
    }
}

// Function to donate from modal
function donateFromModal() {
    if (currentProductId !== null) {
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        const product = products[currentProductId];
        
        const existingItem = cart.find(item => item.id === currentProductId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: currentProductId,
                title: product.title,
                image: product.image,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        closeProductModal();
        
        // Redirect to cart page for donation process
        alert(`${product.title} added to cart! Redirecting to cart page for donation process.`);
        window.location.href = 'cartpage.html';
    }
}

// Function to handle donate button click
function handleDonateClick(productId) {
    const quantity = parseInt(document.getElementById(`quantity${productId + 1}`).value);
    const product = products[productId];
    
    // Add to cart first
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to cart page for donation process
    alert(`${product.title} added to cart! Redirecting to cart page for donation process.`);
    window.location.href = 'cartpage.html';
}

// Function to update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
}


