// Coffee Booking Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('coffeeForm');
    const successModal = document.getElementById('successModal');
    const bookButton = document.querySelector('.book-button');
    
    // Set minimum date to 2 hours from now
    const now = new Date();
    now.setHours(now.getHours() + 2);
    
    const datetimeInput = document.getElementById('datetime');
    datetimeInput.min = now.toISOString().slice(0, 16);
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            showLoadingState();
            
            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                processBooking();
            }, 2000);
        }
    });
    
    // Form validation
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const topic = document.getElementById('topic').value;
        const datetime = document.getElementById('datetime').value;
        
        let isValid = true;
        
        // Clear previous error states
        clearErrors();
        
        // Validate name
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate topic
        if (!topic) {
            showError('topic', 'Please select a topic');
            isValid = false;
        }
        
        // Validate datetime
        if (!datetime) {
            showError('datetime', 'Please select a date and time');
            isValid = false;
        } else {
            const selectedDate = new Date(datetime);
            const now = new Date();
            const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
            
            if (selectedDate <= twoHoursFromNow) {
                showError('datetime', 'Please select a date and time at least 2 hours from now');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Show error for specific field
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Add error class
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '4px';
    }
    
    // Clear all errors
    function clearErrors() {
        const errorFields = document.querySelectorAll('.error');
        const errorMessages = document.querySelectorAll('.error-message');
        
        errorFields.forEach(field => field.classList.remove('error'));
        errorMessages.forEach(message => message.remove());
    }
    
    // Show loading state
    function showLoadingState() {
        bookButton.disabled = true;
        bookButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        bookButton.classList.add('loading');
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Process booking (simulate API call)
    function processBooking() {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            topic: document.getElementById('topic').value,
            datetime: document.getElementById('datetime').value,
            notes: document.getElementById('notes').value.trim()
        };
        
        // In a real application, you would send this data to your backend
        console.log('Booking data:', formData);
        
        // Simulate successful booking
        showSuccessModal(formData);
        
        // Reset form
        form.reset();
        
        // Reset button state
        bookButton.disabled = false;
        bookButton.innerHTML = '<i class="fas fa-calendar-alt"></i> Book Coffee Chat';
        bookButton.classList.remove('loading');
    }
    
    // Show success modal
    function showSuccessModal(data) {
        // Populate modal with booking details
        document.getElementById('confirmName').textContent = data.name;
        document.getElementById('confirmEmail').textContent = data.email;
        document.getElementById('confirmTopic').textContent = getTopicLabel(data.topic);
        document.getElementById('confirmDateTime').textContent = formatDateTime(data.datetime);
        
        // Show modal
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Get topic label for display
    function getTopicLabel(topicValue) {
        const topics = {
            'brainstorming': 'Brainstorming Session',
            'career': 'Career Opportunities',
            'business': 'Business Collaboration',
            'technology': 'Technology Discussion',
            'networking': 'Networking & Connections',
            'mentoring': 'Mentoring & Advice',
            'project': 'Project Discussion',
            'general': 'General Coffee Chat',
            'other': 'Other'
        };
        return topics[topicValue] || topicValue;
    }
    
    // Format datetime for display
    function formatDateTime(datetimeString) {
        const date = new Date(datetimeString);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Close modal
    window.closeModal = function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showError(this.id, `${this.previousElementSibling.textContent} is required`);
            } else {
                clearFieldError(this.id);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this.id);
            }
        });
    });
    
    // Clear error for specific field
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        field.classList.remove('error');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Add smooth scrolling for better UX
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
    
    // Add form animation on load
    const formContainer = document.querySelector('.form-container');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        formContainer.style.transition = 'all 0.6s ease';
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 100);
});

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ef4444 !important;
        background-color: #fef2f2 !important;
    }
    
    .error:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .error-message {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
