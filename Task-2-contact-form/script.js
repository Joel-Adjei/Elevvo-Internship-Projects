class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form.querySelector('.submit-btn');
        this.successMessage = this.form.querySelector('.success-message');
        this.messageField = document.getElementById('message');
        this.charCounter = this.form.querySelector('.char-counter');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.form.addEventListener('input', this.handleInput.bind(this));
        this.form.addEventListener('blur', this.handleBlur.bind(this), true);
        this.messageField.addEventListener('input', this.updateCharCounter.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.simulateSubmission();
        }
    }

    handleInput(e) {
        const field = e.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') {
            this.clearFieldError(field);
            this.validateField(field, false);
        }
    }

    handleBlur(e) {
        const field = e.target;
        if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA' || field.tagName === 'SELECT') {
            this.validateField(field, true);
        }
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field, true)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field, showError) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Reset field state
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = `${this.getFieldName(field)} is required`;
        }
        
        // Email validation
        else if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Full name validation (at least 2 words)
        else if (field.name === 'fullName' && field.value.trim()) {
            const nameParts = field.value.trim().split(' ').filter(part => part.length > 0);
            if (nameParts.length < 2) {
                isValid = false;
                errorMessage = 'Please enter your full name (first and last name)';
            }
        }

        // Message length validation
        else if (field.name === 'message' && field.value.trim() && field.value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        // Apply validation result
        if (isValid && field.value.trim()) {
            formGroup.classList.add('success');
            formGroup.classList.remove('error');
        } else if (!isValid && showError) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    getFieldName(field) {
        const label = field.closest('.form-group').querySelector('label');
        return label ? label.textContent.replace(' *', '') : field.name;
    }

    updateCharCounter() {
        const currentLength = this.messageField.value.length;
        const maxLength = parseInt(this.messageField.getAttribute('maxlength'));
        
        this.charCounter.textContent = `${currentLength} / ${maxLength}`;
        
        // Update counter styling based on usage
        this.charCounter.classList.remove('warning', 'danger');
        
        if (currentLength > maxLength * 0.9) {
            this.charCounter.classList.add('danger');
        } else if (currentLength > maxLength * 0.7) {
            this.charCounter.classList.add('warning');
        }
    }

    simulateSubmission() {
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        setTimeout(() => {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            this.successMessage.classList.add('show');
            
            setTimeout(() => {
                this.resetForm();
            }, 3000);
        }, 2000);
    }

    resetForm() {
        this.form.reset();
        this.successMessage.classList.remove('show');
        
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('success', 'error');
            const errorElement = group.querySelector('.error-message');
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        });

        this.updateCharCounter();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});


document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contactForm');
        if (document.activeElement && form.contains(document.activeElement)) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});