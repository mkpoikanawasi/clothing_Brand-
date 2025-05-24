// persistent-animations.js

document.addEventListener('DOMContentLoaded', function() {
    // ========== SESSION STORAGE TRACKING ==========
    const hasAnimationsPlayed = sessionStorage.getItem('animationsPlayed');
    
    // Only run initial animations if this is the first visit in this session
    if (!hasAnimationsPlayed) {
        sessionStorage.setItem('animationsPlayed', 'true');
        initializeAnimations();
    } else {
        // For subsequent page views, show elements already animated
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // ========== PRODUCT POPUP VIEWER ==========
    setupProductPopups();

    // ========== SCROLL ANIMATIONS ==========
    setupScrollAnimations();

    // ========== HOVER ANIMATIONS ==========
    setupHoverAnimations();
});

function initializeAnimations() {
    // Set initial state for all animatable elements
    document.querySelectorAll('.product, .category, .about-content, .section-header').forEach(el => {
        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Force reflow to ensure transitions work
    document.querySelectorAll('.animate-on-scroll')[0].offsetHeight;
}

function setupProductPopups() {
    const products = document.querySelectorAll('.product');
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    document.body.appendChild(popupOverlay);

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupOverlay.appendChild(popupContent);

    products.forEach(product => {
        product.addEventListener('click', function(e) {
            if (e.target.closest('.product-actions')) return;
            
            const productImage = this.querySelector('.product-image img').src;
            const productTitle = this.querySelector('.product-info h3').textContent;
            const productPrice = this.querySelector('.price').textContent;
            const productDesc = this.querySelector('.product-info p')?.textContent || 'Premium product from MINIMAL';

            popupContent.innerHTML = `
                <span class="close-popup">&times;</span>
                <img src="${productImage}" alt="${productTitle}" class="popup-product-image">
                <div class="popup-info">
                    <h3>${productTitle}</h3>
                    <p class="popup-price">${productPrice}</p>
                    <p class="popup-desc">${productDesc}</p>
                    <div class="popup-buttons">
                        <button class="btn popup-btn">Add to Cart</button>
                        <button class="btn whatsapp-btn">
                            <i class="fab fa-whatsapp"></i> Share via WhatsApp
                        </button>
                    </div>
                </div>
            `;

            // Add WhatsApp share functionality
            const whatsappBtn = popupContent.querySelector('.whatsapp-btn');
// Inside the setupProductPopups() function, modify the whatsappBtn event listener:

whatsappBtn.addEventListener('click', function() {
    const productImageSrc = popupContent.querySelector('.popup-product-image').src;
    const productTitle = popupContent.querySelector('h3').textContent;
    const productPrice = popupContent.querySelector('.popup-price').textContent;
    
    // Ensure the image URL is absolute (not relative)
    const absoluteImageUrl = new URL(productImageSrc, window.location.href).href;
    
    // Format the message for better WhatsApp preview
    const whatsappMessage = `Check out this product from MINIMAL:
    
*${productTitle}*
Price: ${productPrice}

${absoluteImageUrl}`;

    const phoneNumber = '2348129476753'; // Your WhatsApp number without '+' or '00'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(url, '_blank');
});

            popupOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animate in the popup
            setTimeout(() => {
                popupContent.style.opacity = '1';
                popupContent.style.transform = 'scale(1)';
            }, 10);
        });
    });

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay || e.target.classList.contains('close-popup')) {
            popupContent.style.opacity = '0';
            popupContent.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                popupOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    });
}

function setupScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

function setupHoverAnimations() {
    // Product hover effects
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productImage = product.querySelector('.product-image');
        const productActions = product.querySelector('.product-actions');
        
        product.addEventListener('mouseenter', () => {
            if (productImage) {
                productImage.style.transform = 'translateY(-10px)';
                productImage.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            }
            if (productActions) {
                productActions.style.opacity = '1';
                productActions.style.bottom = '20px';
            }
        });
        
        product.addEventListener('mouseleave', () => {
            if (productImage) {
                productImage.style.transform = 'translateY(0)';
                productImage.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            }
            if (productActions) {
                productActions.style.opacity = '0';
                productActions.style.bottom = '0';
            }
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn:not(.popup-btn)');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Popup Styles */
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .popup-content {
        position: relative;
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 800px;
        width: 90%;
        display: flex;
        gap: 30px;
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.3s ease-out;
    }
    
    .popup-content img {
        width: 50%;
        height: auto;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .popup-info {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .popup-info h3 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #333;
    }
    
    .popup-price {
        font-size: 20px;
        font-weight: 600;
        color: #d4a373;
        margin-bottom: 15px;
    }
    
    .popup-desc {
        color: #666;
        margin-bottom: 20px;
        font-size: 14px;
    }
    
    .popup-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .whatsapp-btn {
        background-color: #25D366;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .whatsapp-btn:hover {
        background-color: #128C7E;
    }
    
    .close-popup {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 28px;
        cursor: pointer;
        color: #333;
        transition: transform 0.2s;
    }
    
    .close-popup:hover {
        transform: scale(1.2);
    }
    
    /* Scroll Reveal */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    /* Product Hover */
    .product-image {
        transition: all 0.3s ease;
    }
    
    .product-actions {
        transition: all 0.3s ease;
        opacity: 0;
        bottom: 0;
    }
    
    /* Button Hover */
    .btn {
        transition: all 0.3s ease;
    }
    
    /* Page transition */
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Page load transition
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});