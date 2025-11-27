// Enhanced JavaScript for the Weather App with particle effects

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.weather-form');
    const button = form.querySelector('.btn-primary');
    const select = document.getElementById('location');
    
    // Create particle background
    createParticleBackground();
    
    // Add loading state to button
    form.addEventListener('submit', function() {
        button.classList.add('loading');
        button.disabled = true;
        
        // Re-enable button after 5 seconds (safety)
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
        }, 5000);
    });
    
    // Add smooth interactions
    select.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 6px 25px rgba(38, 166, 154, 0.3)';
    });
    
    select.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(77, 182, 172, 0.1)';
    });
    
    // Add keyboard shortcut (Enter key to submit)
    select.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    // Auto-focus on select element
    select.focus();
    
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.weather-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.01)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 5px 20px rgba(79, 195, 247, 0.2)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'float 1.5s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'float 3s ease-in-out infinite';
        });
    });
    
    // Add scroll to results after form submission
    if (window.location.hash === '#results') {
        setTimeout(() => {
            const results = document.querySelector('.weather-dashboard, .weather-card');
            if (results) {
                results.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
});

function createParticleBackground() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particle-background';
    document.body.appendChild(particlesContainer);
    
    const colors = ['#4FC3F7', '#81D4FA', '#4DB6AC', '#80CBC4', '#26A69A'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 60 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: ${Math.random() * 0.1 + 0.05};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${Math.random() * 10 + 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add real-time clock update
function updateClock() {
    const clockElements = document.querySelectorAll('.last-updated, .last-updated-card');
    if (clockElements.length > 0) {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        clockElements.forEach(element => {
            if (element.classList.contains('last-updated')) {
                element.textContent = `Last updated: ${timeString}`;
            } else if (element.classList.contains('last-updated-card')) {
                element.textContent = `Last checked: ${timeString}`;
            }
        });
    }
}

// Update clock every minute
setInterval(updateClock, 60000);

// Add smooth scrolling for better UX
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add this to form submission to scroll to results
document.querySelector('.weather-form')?.addEventListener('submit', function(e) {
    setTimeout(() => {
        const results = document.querySelector('.weather-dashboard, .weather-card');
        if (results) {
            smoothScrollTo(results, 800);
        }
    }, 100);
});