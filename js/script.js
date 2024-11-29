const benefits = [
    {
        icon: '👥',
        title: 'Asesoría personalizada',
        description: 'Recibe orientación personalizada para crear tu plan de ahorro e inversión en vivienda'
    },
    {
        icon: '🏷️',
        title: 'Descuentos superiores',
        description: 'Conoce antes que nadie los nuevos desarrollos y aprovecha precios de preventa exclusivos'
    },
    {
        icon: '🏢',
        title: '+60 desarrolladores verificados',
        description: 'Conoce antes que nadie los nuevos desarrollos y aprovecha precios de preventa exclusivos'
    },
    {
        icon: '✨',
        title: 'Sin comisiones',
        description: 'Comienza a ahorrar sin costos ocultos ni cargos adicionales'
    }
];

// Initialize carousel
function initializeCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    const testimonials = [
        { name: 'Ana García', image: 'assets/images/ana_garcia.png', text: 'Me ayudaron a crear un plan de pagos a la medida' },
        { name: 'Carlos Ruiz', image: 'assets/images/carlos_ruiz.png', text: 'Logre entender mi presupuesto y comprar antes de lo pensado' },
        { name: 'María López', image: 'assets/images/maria_lopez.png', text: 'La mejor decisión para invertir en mi futuro' },
        { name: 'Juan Torres', image: 'assets/images/juan_torres.png', text: 'Excelente asesoría durante todo el proceso' },
        { name: 'Beatriz Estrada', image: 'assets/images/beatriz.png', text: 'Encontré mi departamento ideal gracias a La Haus' },
        { name: 'Paulo Ortiz', image: 'assets/images/paulo.png', text: 'Los mejores desarrollos estan en La Haus' },
        { name: 'Ana Karen', image: 'assets/images/Karen.png', text: 'La mejor decisión para invertir en mi futuro' },
        { name: 'Israel Duarte', image: 'assets/images/israel.png', text: 'Excelente asesoría durante todo el proceso' }
    ];

    // Create triple the items for smooth infinite scroll
    const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
    
    // Clear existing content
    carousel.innerHTML = '';
    
    // Create carousel items
    allTestimonials.forEach((testimonial, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <p class="name">${testimonial.name}</p>
            <p class="text">${testimonial.text}</p>
        `;
        carousel.appendChild(item);
    });

    // Set initial position to center the carousel
    const containerWidth = carousel.parentElement.offsetWidth;
    const totalWidth = carousel.scrollWidth;
    const initialOffset = -(totalWidth / 3);
    carousel.style.transform = `translateX(${initialOffset}px)`;

    startCarouselAnimation(carousel, testimonials.length);
}

function startCarouselAnimation(carousel, itemCount) {
    const items = carousel.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth + 24; // Width + gap
    const totalItems = items.length;
    const middleIndex = Math.floor(totalItems / 2);
    
    let currentIndex = middleIndex;
    let animationFrame;
    let isPaused = false;

    function updateActiveStates() {
        items.forEach((item, index) => {
            const distanceFromCenter = Math.abs(index - currentIndex);
            if (distanceFromCenter <= 1) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function animate() {
        if (isPaused) return;

        const currentTransform = parseFloat(carousel.style.transform.replace('translateX(', ''));
        carousel.style.transform = `translateX(${currentTransform - 1}px)`;

        // Check if we need to reset
        if (Math.abs(currentTransform) >= itemWidth * itemCount) {
            const resetPosition = currentTransform + (itemWidth * itemCount);
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${resetPosition}px)`;
            carousel.offsetHeight; // Force reflow
            carousel.style.transition = 'transform 0.5s linear';
        }

        currentIndex = Math.floor(Math.abs(currentTransform) / itemWidth) % totalItems;
        updateActiveStates();
        
        animationFrame = requestAnimationFrame(animate);
    }

    // Start animation
    updateActiveStates();
    animationFrame = requestAnimationFrame(animate);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isPaused = true;
        cancelAnimationFrame(animationFrame);
    });

    carousel.addEventListener('mouseleave', () => {
        isPaused = false;
        animationFrame = requestAnimationFrame(animate);
    });
}

// Initialize benefits
function initializeBenefits() {
    const benefitsGrid = document.querySelector('.benefits-grid');
    benefits.forEach((benefit, index) => {
        const card = document.createElement('div');
        card.className = 'benefit-card reveal';
        card.style.animationDelay = `${index * 0.2}s`;
        card.innerHTML = `
            <div class="icon">${benefit.icon}</div>
            <h3>${benefit.title}</h3>
            <p>${benefit.description}</p>
        `;
        benefitsGrid.appendChild(card);
    });
}

// Scroll reveal functionality
function initializeScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function handleReveal() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Button click effects
function initializeButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Form animations
function initializeFormAnimations() {
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Initialize modal and form handling
function initializeModal() {
    console.log('Initializing modal...');
    const modal = document.getElementById('registrationModal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const form = document.getElementById('registrationForm');

    // Debug log to verify elements are found
    console.log('Modal elements:', { modal, openModalBtn, closeModalBtn, form });

    if (!form) {
        console.error('Registration form not found!');
        return;
    }

    openModalBtn.addEventListener('click', () => {
        console.log('Opening modal');
        modal.classList.add('active');
    });

    const closeModal = () => {
        console.log('Closing modal');
        modal.classList.remove('active');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };

        console.log('Form data:', formData);

        try {
            console.log('Sending request to server...');
            const response = await fetch('https://lahaus-savings-0ad6075ebf21.herokuapp.com/api/register', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('Response received:', response);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                console.log('Registration successful');
                alert('¡Gracias por registrarte! Nos pondremos en contacto contigo pronto.');
                form.reset();
                closeModal();
            } else {
                throw new Error(data.error || 'Error en el registro');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Hubo un error al procesar tu registro. Por favor intenta nuevamente.');
        }
    });
}

// Scroll reveal functionality
function initializeScrollReveal() {
    console.log('Initializing scroll reveal...');
    const reveals = document.querySelectorAll('.reveal');
    
    function handleReveal() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Initial check
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing components...');
    initializeCarousel();
    initializeBenefits();
    initializeModal();
    initializeScrollReveal();
    console.log('All components initialized');
});

// Debug console log to verify script is loaded
console.log('Script loaded');