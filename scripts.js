document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Product Quantity
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            if (input) {
                let value = parseInt(input.value);
                
                if (this.id === 'quantity-plus') {
                    value++;
                } else if (this.id === 'quantity-minus' && value > 1) {
                    value--;
                }
                
                input.value = value;
            }
        });
    });
    
    // Product Thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                const imgSrc = this.querySelector('img').getAttribute('src');
                mainImage.setAttribute('src', imgSrc);
            });
        });
    }
    
    // Product Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabBtns.forEach(item => item.classList.remove('active'));
                tabContents.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Form Submission for Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendToWhatsapp();
            this.reset(); // Clear the form after submission
        });
    }
    
    // WhatsApp Function
    function sendToWhatsapp() {
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;

        // Validate required fields
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Format the message with proper spacing and line breaks
        const whatsappMessage = `
        *New Contact Form Submission - MINIMAL Clothing*
        
        *Name:* ${name}
        *Email:* ${email}
        *Subject:* ${subject || 'Not specified'}
        
        *Message:*
        ${message}
        `.trim().replace(/\n/g, '\n').replace(/\s+/g, ' ');

        const phoneNumber = '2348129476753'; // Your WhatsApp number without '+' or '00'
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(url, '_blank');
    }
    
    // Add to Cart Animation
    const addToCartBtns = document.querySelectorAll('.product-actions button:first-child, .add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('added');
            console.log('Product added to cart! This is a demo, so no product was actually added.');
        });
    });
    
    // Wishlist Animation
    const wishlistBtns = document.querySelectorAll('.product-actions button:nth-child(2)');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                alert('Product added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                alert('Product removed from wishlist!');
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active Navigation Link based on Scroll Position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && navLink) {
                navLink.classList.add('active');
            } else if (navLink) {
                navLink.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initialize (call once on load)
    highlightNavLink();
});