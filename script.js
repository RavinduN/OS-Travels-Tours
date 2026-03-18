// Smooth Scroll Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Lightbox
const galleryImages = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const imageArray = Array.from(galleryImages);

galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox(image.src);
    });
});

function showLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reinitialize icons for lightbox
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
    lightboxImage.src = imageArray[currentImageIndex].src;
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imageArray.length;
    lightboxImage.src = imageArray[currentImageIndex].src;
});

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        lightboxPrev.click();
    } else if (e.key === 'ArrowRight') {
        lightboxNext.click();
    }
});

// Counter Animation for Stats
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + (element.parentElement.querySelector('.stat-label').textContent.includes('Rate') ? '%' : '+');
        }
    };

    updateCounter();
}

// Observe Stats Section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Mobile Menu Toggle 
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

if (mobileToggle && navMenu) {

mobileToggle.addEventListener("click", () => {

navMenu.classList.toggle("active");

if(navMenu.classList.contains("active")){
mobileToggle.innerHTML = '<i data-lucide="x"></i>';
}else{
mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
}

lucide.createIcons();

});

}

// WhatsApp Button Animation on Scroll
const whatsappBtn = document.getElementById('whatsappBtn');
let whatsappVisible = true;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300 && !whatsappVisible) {
        whatsappBtn.style.transform = 'scale(1)';
        whatsappBtn.style.opacity = '1';
        whatsappVisible = true;
    } else if (scrollTop <= 300 && whatsappVisible) {
        whatsappBtn.style.transform = 'scale(0.8)';
        whatsappBtn.style.opacity = '0.8';
        whatsappVisible = false;
    }
});

// Add hover effect to tour cards
const tourCards = document.querySelectorAll('.tour-card');
tourCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        const scrolled = window.pageYOffset;
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add Active State to Nav Links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {

const buttons = document.querySelectorAll(".book-btn");

buttons.forEach(function(button){

button.addEventListener("click", function(){

let tour = this.getAttribute("data-tour");

let message = `Hello OS Travels & Tours, I would like to book the ${tour}. Please send more details.`;

let url = `https://wa.me/94716412452?text=${encodeURIComponent(message)}`;

window.open(url, "_blank");

});

});

});

// Read More Toggle
const readBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

if(readBtn){

moreText.style.display = "none";

readBtn.addEventListener("click", function(){

if(moreText.style.display === "none"){
moreText.style.display = "block";
readBtn.textContent = "Show Less";
}else{
moreText.style.display = "none";
readBtn.textContent = "Read More";
}

});

}


console.log('OS Travels & Tours - Interactive Website Loaded Successfully! 🌴');
