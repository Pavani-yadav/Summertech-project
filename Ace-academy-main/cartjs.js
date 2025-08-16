// Products data
const products = [
    { id: 0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMWlbDQYgxCo2A1vosXX0fkCSzLogRsqO1p2ZuqYcmA5c0pCR6_BrdCoKuoFKfzt1UOE&usqp=CAU', title: 'Children\'s Clothing Set' },
    { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ezQDYHyw4UvOZed5VurbiwMdUnOAykf6bA&s', title: 'Girls\' Dress Collection' },
    { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfw-kSfdNPS1olUA86w8uQGPLNvlZmu_Ar6Q&s', title: 'Casual Wear' },
    { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1bHPMpNVYosTZC42DR3Jj0rQXJ8Gq2TpPWA&s', title: 'Winter Collection' },
    { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi4Xh1Vh_x2CHDwb_gLNsamw-bWAJLmCJJIw&s', title: 'School Uniforms' }
];

// Organizations data
const organizations = [
    {
        name: "Miracle Foundation",
        location: "Hyderabad",
        contact: "9876543210",
        address: "123 Hope Street, Hyderabad, Telangana 500001"
    },
    {
        name: "Children's Hope Center",
        location: "Mumbai",
        contact: "9876543211",
        address: "456 Care Avenue, Mumbai, Maharashtra 400001"
    },
    {
        name: "Little Angels Orphanage",
        location: "Delhi",
        contact: "9876543212",
        address: "789 Love Lane, Delhi 110001"
    },
    {
        name: "Rainbow Children's Home",
        location: "Bangalore",
        contact: "9876543213",
        address: "321 Joy Road, Bangalore, Karnataka 560001"
    },
    {
        name: "Sunshine Orphanage",
        location: "Chennai",
        contact: "9876543214",
        address: "654 Bright Street, Chennai, Tamil Nadu 600001"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let donations = JSON.parse(localStorage.getItem('donations')) || [];
let trackingInfo = JSON.parse(localStorage.getItem('trackingInfo')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    updateCartDisplay();
    updateCartCount();
    loadOrganizations();
    updateDonationHistory();
    updateTrackingHistory();
});

// Load organizations
function loadOrganizations() {
    const orgList = document.getElementById('org-list');
    if (!orgList) return;
    
    orgList.innerHTML = organizations.map((org, index) => `
        <div class="org-item" onclick="selectOrganization(${index})">
            <input type="radio" name="organization" value="${index}" id="org-${index}">
            <label for="org-${index}" class="org-label">
                <div class="org-card">
                    <div class="org-header">
                        <h5 class="org-name">${org.name}</h5>
                        <span class="org-location">${org.location}</span>
                    </div>
                    <div class="org-details">
                        <p class="org-contact"><i class="fas fa-phone"></i> ${org.contact}</p>
                        <p class="org-address"><i class="fas fa-map-marker-alt"></i> ${org.address}</p>
                    </div>
                </div>
            </label>
        </div>
    `).join('');
}

function selectOrganization(index) {
    const radio = document.getElementById(`org-${index}`);
    if (radio) {
        radio.checked = true;
        document.querySelectorAll('.org-item').forEach(item => {
            item.classList.remove('selected');
        });
        radio.closest('.org-item').classList.add('selected');
    }
}

// Cart display with better styling
function updateCartDisplay() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty. <a href="productpage.html">Start donating!</a></p></div>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="item-details">
                <h4>${item.title}</h4>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})" class="qty-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})" class="qty-btn plus">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">
                <i class="fas fa-trash"></i> Remove
            </button>
        </div>
    `).join('');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = totalItems;
    }
    
    const totalElement = document.getElementById('total-items');
    if (totalElement) {
        totalElement.textContent = totalItems;
    }
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

// Fixed GPS Location with proper mapping
function getLocation() {
    const locationDisplay = document.getElementById('location-display');
    
    if (navigator.geolocation) {
        locationDisplay.innerHTML = '<p class="loading"><i class="fas fa-spinner fa-spin"></i> Getting your location...</p>';
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                showPosition(position);
            },
            function(error) {
                locationDisplay.innerHTML = '<p class="error">Error getting location: ' + error.message + '</p>';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        locationDisplay.innerHTML = '<p class="error">Geolocation is not supported by this browser.</p>';
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    document.getElementById('location-display').innerHTML = `
        <div class="location-info">
            <p><i class="fas fa-map-marker-alt"></i> <strong>Your Location:</strong></p>
            <p>Latitude: ${lat.toFixed(6)}</p>
            <p>Longitude: ${lon.toFixed(6)}</p>
            <button onclick="openMap(${lat}, ${lon})" class="map-btn">
                <i class="fas fa-map"></i> View on Map
            </button>
        </div>
    `;
}

function openMap(lat, lon) {
    const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&t=m`;
    window.open(mapUrl, '_blank');
}

// Update donation history
function updateDonationHistory() {
    const donationHistoryElement = document.getElementById('donation-history-items');
    if (!donationHistoryElement) return;
    
    if (donations.length === 0) {
        donationHistoryElement.innerHTML = '<p class="no-history">No donation history yet. Make your first donation!</p>';
        return;
    }
    
    donationHistoryElement.innerHTML = donations.map(donation => `
        <div class="history-item donation-item">
            <div class="history-header">
                <h4><i class="fas fa-gift"></i> Donation #${donation.id}</h4>
                <span class="status-badge success">${donation.status}</span>
            </div>
            <div class="history-details">
                <p><strong>Donor:</strong> ${donation.donorInfo.name}</p>
                <p><strong>Date:</strong> ${donation.date}</p>
                <p><strong>Items:</strong> ${donation.totalItems}</p>
                <p><strong>Organization:</strong> ${donation.organization.name}</p>
                <p><strong>Location:</strong> ${donation.donorInfo.city}, ${donation.donorInfo.zip}</p>
            </div>
        </div>
    `).join('');
}

// Update tracking history
function updateTrackingHistory() {
    const trackingHistoryElement = document.getElementById('tracking-history-items');
    if (!trackingHistoryElement) return;
    
    if (trackingInfo.length === 0) {
        trackingHistoryElement.innerHTML = '<p class="no-history">No tracking information available.</p>';
        return;
    }
    
    trackingHistoryElement.innerHTML = trackingInfo.map(tracking => `
        <div class="history-item tracking-item">
            <div class="history-header">
                <h4><i class="fas fa-truck"></i> Donation #${tracking.donationId}</h4>
                <span class="status-badge tracking">${tracking.status}</span>
            </div>
            <div class="history-details">
                <p><strong>Donor:</strong> ${tracking.donorName}</p>
                <p><strong>Date:</strong> ${tracking.date} ${tracking.time}</p>
                <p><strong>From:</strong> ${tracking.donorLocation}</p>
                <p><strong>To:</strong> ${tracking.organization}</p>
                <p><strong>Est. Delivery:</strong> ${tracking.estimatedDelivery}</p>
            </div>
            <div class="tracking-actions">
                <button onclick="showTrackingMap('${tracking.donorLocation}', '${tracking.organization}')" class="track-btn">
                    <i class="fas fa-route"></i> Track Route
                </button>
            </div>
        </div>
    `).join('');
}

function showTrackingMap(fromLocation, toOrganization) {
    const org = organizations.find(o => o.name === toOrganization);
    const orgAddress = org ? org.address : toOrganization;
    const routeUrl = `https://www.google.com/maps/dir/${encodeURIComponent(fromLocation)}/${encodeURIComponent(orgAddress)}`;
    window.open(routeUrl, '_blank');
}

function proceedToDonate() {
    const selectedOrg = document.querySelector('input[name="organization"]:checked');
    const name = document.getElementById('shipping-name').value;
    const address = document.getElementById('shipping-address').value;
    const city = document.getElementById('shipping-city').value;
    const zip = document.getElementById('shipping-zip').value;
    const phone = document.getElementById('shipping-phone').value;
    
    if (!selectedOrg) {
        alert('Please select an organization to donate to!');
        return;
    }
    
    if (!name || !address || !city || !zip || !phone) {
        alert('Please fill in all required information!');
        return;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const orgData = organizations[selectedOrg.value];
    const donationId = Date.now();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Create donation record
    const donation = {
        id: donationId,
        donorInfo: { name, address, city, zip, phone },
        organization: orgData,
        totalItems: totalItems,
        items: [...cart],
        date: new Date().toLocaleDateString(),
        status: 'Confirmed',
        deliveryOption: document.querySelector('input[name="delivery"]:checked')?.value || 'standard'
    };
    
    // Create tracking record
    const tracking = {
        donationId: donationId,
        donorName: name,
        donorLocation: `${city}, ${zip}`,
        organization: orgData.name,
        status: 'Processing',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        trackingSteps: [
            { step: 'Order Confirmed', completed: true, date: new Date().toLocaleDateString() },
            { step: 'Items Collected', completed: false },
            { step: 'In Transit', completed: false },
            { step: 'Delivered', completed: false }
        ]
    };
    
    // Save to localStorage
    donations.push(donation);
    trackingInfo.push(tracking);
    localStorage.setItem('donations', JSON.stringify(donations));
    localStorage.setItem('trackingInfo', JSON.stringify(trackingInfo));
    
    alert(`Thank you ${name}! Your donation will be sent to ${orgData.name} in ${orgData.location}.`);
    
    // Clear cart and update displays
    clearCart();
    updateDonationHistory();
    updateTrackingHistory();
    
    // Redirect to video success page
    setTimeout(() => {
        window.location.href = 'video-success.html';
    }, 2000);
}

// Make functions globally available
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.getLocation = getLocation;
window.proceedToDonate = proceedToDonate;
