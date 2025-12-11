// ==========================================
// Navigation and Content Switching
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Category navigation
    const categoryButtons = document.querySelectorAll('.topnav .cat');
    const contentSections = document.querySelectorAll('.content-section');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(`${category}-section`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Initialize products
    initializeProducts();
    
    // Initialize forum
    initializeForum();
    
    // Contact form handler
    initializeContactForm();
    
    // Modal handlers
    initializeModals();
});

// ==========================================
// Products Section
// ==========================================

const products = [
    {
        id: 1,
        name: 'Carbon Road Racer',
        category: 'road',
        price: 2499,
        description: 'Lightweight carbon frame with Shimano 105 groupset',
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: 'Mountain Trail Pro',
        category: 'mountain',
        price: 1899,
        description: '29" wheels with full suspension and hydraulic brakes',
        image: 'https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: 'Urban Commuter',
        category: 'hybrid',
        price: 899,
        description: 'Perfect for city riding with integrated lights',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: 'Electric City Bike',
        category: 'electric',
        price: 3299,
        description: 'E-bike with 50-mile range and pedal assist',
        image: 'https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: 'Gravel Adventure',
        category: 'road',
        price: 1699,
        description: 'Versatile gravel bike for mixed terrain',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: 'Downhill Shredder',
        category: 'mountain',
        price: 3499,
        description: 'Built for aggressive downhill riding',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: 'City Cruiser',
        category: 'hybrid',
        price: 649,
        description: 'Comfortable cruiser for leisurely rides',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: 'Premium Helmet',
        category: 'accessories',
        price: 149,
        description: 'MIPS protection with excellent ventilation',
        image: 'https://images.unsplash.com/photo-1620662831351-b4eea3ffaaa5?w=400&h=300&fit=crop'
    }
];

function initializeProducts() {
    const productsGrid = document.getElementById('products-grid');
    const shopSubtabs = document.querySelectorAll('[data-shop]');
    
    // Render all products initially
    renderProducts('all');
    
    // Add event listeners to shop subtabs
    shopSubtabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-shop');
            
            // Update active tab
            shopSubtabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and render products
            renderProducts(filter);
        });
    });
    
    function renderProducts(filter) {
        productsGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(p => p.category === filter);
        
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%231a1a1a%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2224%22 fill=%22%23dc143c%22%3E${product.name}%3C/text%3E%3C/svg%3E'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <button class="product-btn">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
}

// ==========================================
// Forum Section
// ==========================================

const forumPosts = [
    {
        id: 1,
        title: 'Best bike trails in the city?',
        category: 'routes',
        preview: 'Looking for recommendations on scenic bike trails around the city. Anyone have favorite routes?',
        author: 'RiderMike',
        replies: 12,
        views: 234,
        date: '2 hours ago'
    },
    {
        id: 2,
        title: 'How to maintain your chain properly',
        category: 'maintenance',
        preview: 'Complete guide on chain maintenance, cleaning, and lubrication for optimal performance.',
        author: 'BikeExpert',
        replies: 8,
        views: 156,
        date: '5 hours ago'
    },
    {
        id: 3,
        title: 'Selling: Carbon frame - great condition',
        category: 'marketplace',
        preview: 'Used carbon frame in excellent condition. Size 56cm. Asking $800. Contact for details.',
        author: 'CarbonFan',
        replies: 5,
        views: 89,
        date: '1 day ago'
    },
    {
        id: 4,
        title: 'Group ride this Sunday!',
        category: 'routes',
        preview: 'Organizing a 50-mile group ride this Sunday. All levels welcome! Meet at 8am.',
        author: 'GroupLeader',
        replies: 24,
        views: 412,
        date: '1 day ago'
    },
    {
        id: 5,
        title: 'Tips for long distance cycling',
        category: 'general',
        preview: 'Planning my first century ride. Any tips on training, nutrition, and preparation?',
        author: 'NewRider',
        replies: 15,
        views: 267,
        date: '2 days ago'
    },
    {
        id: 6,
        title: 'Best tire pressure for road bikes?',
        category: 'maintenance',
        preview: 'What tire pressure do you run on your road bike? Looking for the sweet spot.',
        author: 'TireGuru',
        replies: 18,
        views: 198,
        date: '3 days ago'
    }
];

function initializeForum() {
    const forumContainer = document.getElementById('forum-posts');
    const forumSubtabs = document.querySelectorAll('[data-forum]');
    
    // Render all posts initially
    renderForumPosts('all');
    
    // Add event listeners to forum subtabs
    forumSubtabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-forum');
            
            // Update active tab
            forumSubtabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and render posts
            renderForumPosts(filter);
        });
    });
    
    function renderForumPosts(filter) {
        forumContainer.innerHTML = '';
        
        const filteredPosts = filter === 'all' 
            ? forumPosts 
            : forumPosts.filter(p => p.category === filter);
        
        filteredPosts.forEach(post => {
            const postElement = createForumPost(post);
            forumContainer.appendChild(postElement);
        });
    }
    
    function createForumPost(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'forum-post';
        postDiv.innerHTML = `
            <div class="forum-header">
                <h3 class="forum-title">${post.title}</h3>
                <span class="forum-badge">${post.category}</span>
            </div>
            <p class="forum-preview">${post.preview}</p>
            <div class="forum-meta">
                <div class="forum-meta-item">
                    <i class="fas fa-user"></i>
                    <span>${post.author}</span>
                </div>
                <div class="forum-meta-item">
                    <i class="fas fa-comments"></i>
                    <span>${post.replies} replies</span>
                </div>
                <div class="forum-meta-item">
                    <i class="fas fa-eye"></i>
                    <span>${post.views} views</span>
                </div>
                <div class="forum-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${post.date}</span>
                </div>
            </div>
        `;
        
        return postDiv;
    }
}

// ==========================================
// Contact Form
// ==========================================

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this to a server
            console.log('Contact Form Submission:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ==========================================
// Modal Handlers
// ==========================================

function initializeModals() {
    const newPostBtn = document.getElementById('new-post-btn');
    const postModal = document.getElementById('post-modal');
    const modalClose = document.querySelector('.modal-close');
    const newPostForm = document.getElementById('new-post-form');
    
    // Open modal
    if (newPostBtn) {
        newPostBtn.addEventListener('click', function() {
            postModal.classList.add('active');
        });
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            postModal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    postModal.addEventListener('click', function(e) {
        if (e.target === postModal) {
            postModal.classList.remove('active');
        }
    });
    
    // Handle new post form
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value;
            const category = document.getElementById('post-category').value;
            const content = document.getElementById('post-content').value;
            
            // In a real application, you would send this to a server
            console.log('New Forum Post:', { title, category, content });
            
            // Show success message
            alert('Your post has been submitted!');
            
            // Reset form and close modal
            newPostForm.reset();
            postModal.classList.remove('active');
            
            // Optionally, add the new post to the forum
            const newPost = {
                id: forumPosts.length + 1,
                title: title,
                category: category,
                preview: content.substring(0, 100) + '...',
                author: 'You',
                replies: 0,
                views: 0,
                date: 'Just now'
            };
            
            forumPosts.unshift(newPost);
            
            // Re-render forum if on forum section
            const forumSection = document.getElementById('forum-section');
            if (forumSection.classList.contains('active')) {
                const forumContainer = document.getElementById('forum-posts');
                const postElement = createForumPost(newPost);
                forumContainer.insertBefore(postElement, forumContainer.firstChild);
            }
        });
    }
    
    function createForumPost(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'forum-post';
        postDiv.innerHTML = `
            <div class="forum-header">
                <h3 class="forum-title">${post.title}</h3>
                <span class="forum-badge">${post.category}</span>
            </div>
            <p class="forum-preview">${post.preview}</p>
            <div class="forum-meta">
                <div class="forum-meta-item">
                    <i class="fas fa-user"></i>
                    <span>${post.author}</span>
                </div>
                <div class="forum-meta-item">
                    <i class="fas fa-comments"></i>
                    <span>${post.replies} replies</span>
                </div>
                <div class="forum-meta-item">
                    <i class="fas fa-eye"></i>
                    <span>${post.views} views</span>
                </div>
                <div class="forum-meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${post.date}</span>
                </div>
            </div>
        `;
        
        return postDiv;
    }
}

// ==========================================
// Smooth Scrolling
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Add to Cart (Product Buttons)
// ==========================================

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-btn') || e.target.closest('.product-btn')) {
        const button = e.target.classList.contains('product-btn') ? e.target : e.target.closest('.product-btn');
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Animation feedback
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add';
            button.style.background = '';
        }, 2000);
        
        // In a real application, you would add this to a shopping cart
        console.log('Added to cart:', productName);
    }
});
