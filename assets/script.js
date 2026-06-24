// Wizard Navigation
function nextStep(stepNumber) {
    const currentStep = document.querySelector('.wizard-step.active');
    const nextStepElement = document.getElementById('step' + stepNumber);
    
    if (currentStep && nextStepElement) {
        currentStep.classList.remove('active');
        nextStepElement.classList.add('active');
        
        // Update progress
        updateProgress(stepNumber);
        
        // Update step indicator
        document.querySelectorAll('.step').forEach((step, index) => {
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevStep(stepNumber) {
    nextStep(stepNumber);
}

function updateProgress(stepNumber) {
    const percentage = (stepNumber / 5) * 100;
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

// Business Type Selection
document.querySelectorAll('.type-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Business Name Search
function searchBusinessName() {
    const businessName = document.getElementById('businessName').value;
    const searchResult = document.getElementById('searchResult');
    
    if (businessName.length < 3) {
        searchResult.innerHTML = '<p style="color: #f59e0b;">Please enter at least 3 characters</p>';
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        searchResult.innerHTML = `
            <div style="padding: 1rem; background-color: #dcfce7; border-left: 4px solid #10b981; border-radius: 0.5rem; margin-bottom: 1rem;">
                <p><strong>✓ Available!</strong> "${businessName}" is available for registration</p>
                <button class="btn btn-primary small" onclick="reserveBusinessName('${businessName}')">Reserve Now</button>
            </div>
        `;
    }, 500);
}

function reserveBusinessName(name) {
    alert('Business name "' + name + '" has been reserved for 30 days!');
}

// Document Upload with Drag & Drop
document.querySelectorAll('.upload-area').forEach(uploadArea => {
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
});

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
    this.style.borderColor = '#2563eb';
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.style.backgroundColor = '';
    this.style.borderColor = '';
    
    const files = e.dataTransfer.files;
    console.log('Files dropped:', files);
    
    // Show success message
    const message = document.createElement('div');
    message.innerHTML = `<p style="color: #10b981; margin-top: 1rem;">✓ ${files.length} file(s) uploaded successfully!</p>`;
    this.parentElement.appendChild(message);
}

// Form Submission
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background-color: #dcfce7;
            border-left: 4px solid #10b981;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            color: #065f46;
        `;
        successMessage.innerHTML = '✓ Form submitted successfully!';
        this.appendChild(successMessage);
        
        // Clear after 3 seconds
        setTimeout(() => successMessage.remove(), 3000);
    });
});

// Submit Application
function submitApplication() {
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Please agree to the terms and conditions');
        return;
    }
    
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const item = this.parentElement;
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item.active').forEach(active => {
            if (active !== item) {
                active.classList.remove('active');
                active.querySelector('.faq-answer').style.display = 'none';
            }
        });
        
        // Toggle current
        item.classList.toggle('active');
        answer.style.display = item.classList.contains('active') ? 'block' : 'none';
    });
});

// Tab Navigation
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active to clicked button and corresponding content
        this.classList.add('active');
        const tabContent = document.getElementById(tabName + '-tab') || document.getElementById(tabName);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
document.querySelector('.hamburger')?.addEventListener('click', function() {
    const menu = document.querySelector('.navbar-menu');
    menu?.style.display === 'flex' ? menu.style.display = 'none' : menu.style.display = 'flex';
});

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Compliance Calendar
document.querySelectorAll('.calendar-nav button').forEach(button => {
    button.addEventListener('click', function() {
        const monthElement = document.getElementById('currentMonth');
        if (monthElement) {
            // Simple month navigation (you can expand this)
            console.log('Navigate calendar');
        }
    });
});

// Deadline Alert Buttons
document.querySelectorAll('.deadline-card button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Reminder set! You will receive notifications on time.');
    });
});

// Export Calendar
document.querySelectorAll('.export-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        const calendar = this.innerHTML.includes('Google') ? 'Google Calendar' :
                        this.innerHTML.includes('Microsoft') ? 'Microsoft Outlook' :
                        this.innerHTML.includes('Apple') ? 'Apple Calendar' : 'iCalendar';
        alert('Calendar exported to ' + calendar);
    });
});

// Toggle Reminders
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const setting = this.closest('.setting-card').querySelector('h3').textContent;
        const status = this.checked ? 'enabled' : 'disabled';
        console.log(setting + ' ' + status);
    });
});

// Support Page - Open Chat
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Chat') || button.textContent.includes('chat')) {
        button.addEventListener('click', function() {
            alert('Live chat opened. Our support team is here to help!');
        });
    }
});

// Contact Form Validation
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you within 24 hours.');
    this.reset();
});

// Mentorship Booking
document.querySelectorAll('.mentor-card button, .mentorship-info button').forEach(button => {
    if (button.textContent.includes('Book') || button.textContent.includes('Mentorship')) {
        button.addEventListener('click', function() {
            alert('Opening mentorship booking system...');
        });
    }
});

// Community Forum
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('h3').textContent;
        alert('Opening ' + category + '...');
    });
});

// Login Form
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login successful! Redirecting to dashboard...');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
});

// Register Form
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    alert('Account created successfully! Redirecting to login...');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});

// Forgot Password Form
document.getElementById('forgotPasswordForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Password reset link sent to your email!');
    document.getElementById('forgotPasswordModal').style.display = 'none';
});

// Two-Factor Authentication
document.getElementById('twoFactorForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('2FA verified successfully!');
});

function resendOTP() {
    alert('OTP resent to your phone');
}

// Dashboard - Document Actions
document.querySelectorAll('.btn-icon').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('fa-eye')) {
            alert('Opening document preview...');
        } else if (icon.classList.contains('fa-download')) {
            alert('Document downloaded successfully!');
        } else if (icon.classList.contains('fa-trash')) {
            if (confirm('Are you sure you want to delete this document?')) {
                alert('Document deleted');
            }
        }
    });
});

// Registration Tracker Progress Bar
function updateRegistrationProgress() {
    const completedSteps = document.querySelectorAll('.tracker-step.completed').length;
    const totalSteps = document.querySelectorAll('.tracker-step').length;
    const percentage = (completedSteps / totalSteps) * 100;
    
    const progressFillFull = document.querySelector('.progress-bar-full .progress-fill');
    if (progressFillFull) {
        progressFillFull.style.width = percentage + '%';
        document.querySelector('.progress-text').textContent = 'Progress: ' + Math.round(percentage) + '%';
    }
}

// Run on page load
updateRegistrationProgress();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.quick-card, .feature-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});