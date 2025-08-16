// File upload functionality
document.getElementById('fileInput').addEventListener('change', function(e) {
    const files = e.target.files;
    const uploadedImagesContainer = document.getElementById('uploadedImages');
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'uploaded-image';
                imageDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded clothes">
                    <button class="remove-image" onclick="removeImage(this)">×</button>
                `;
                uploadedImagesContainer.appendChild(imageDiv);
            };
            reader.readAsDataURL(file);
        }
    }
});

// Upload box click functionality
document.getElementById('uploadBox').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

// Remove uploaded image
function removeImage(button) {
    button.parentElement.remove();
}

// Submit donation
function submitDonation() {
    const uploadedImages = document.querySelectorAll('.uploaded-image');
    if (uploadedImages.length === 0) {
        alert('Please upload at least one image of clothes to donate.');
        return;
    }
    
    alert('Thank you for your donation! Your clothes will help orphans in need. We will contact you soon for pickup details.');
    document.getElementById('uploadedImages').innerHTML = '';
    document.getElementById('fileInput').value = '';
}

// View product details - redirect to product page with specific product
function viewProductDetails(productId) {
    localStorage.setItem('selectedProduct', productId);
    window.location.href = 'productpage.html';
}

// Drag and drop functionality
const uploadBox = document.getElementById('uploadBox');

uploadBox.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadBox.style.borderColor = '#764ba2';
    uploadBox.style.background = 'rgba(118, 75, 162, 0.1)';
});

uploadBox.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadBox.style.borderColor = '#667eea';
    uploadBox.style.background = 'rgba(102, 126, 234, 0.05)';
});

uploadBox.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadBox.style.borderColor = '#667eea';
    uploadBox.style.background = 'rgba(102, 126, 234, 0.05)';
    
    const files = e.dataTransfer.files;
    const uploadedImagesContainer = document.getElementById('uploadedImages');
    
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'uploaded-image';
                imageDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded clothes">
                    <button class="remove-image" onclick="removeImage(this)">×</button>
                `;
                uploadedImagesContainer.appendChild(imageDiv);
            };
            reader.readAsDataURL(file);
        }
    }
});