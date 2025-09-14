// Email Service for Coffee Chat Booking
// This will handle sending confirmation emails when someone books a coffee chat

class EmailService {
    constructor() {
        // You can use services like EmailJS, Formspree, or Netlify Forms
        this.serviceId = 'your_service_id';
        this.templateId = 'your_template_id';
        this.publicKey = 'your_public_key';
    }

    async sendBookingConfirmation(bookingData) {
        try {
            // Method 1: Using EmailJS (Free service)
            await this.sendWithEmailJS(bookingData);
            
            // Method 2: Using Formspree (Alternative)
            // await this.sendWithFormspree(bookingData);
            
            return { success: true, message: 'Email sent successfully!' };
        } catch (error) {
            console.error('Email sending failed:', error);
            return { success: false, message: 'Failed to send email. Please try again.' };
        }
    }

    async sendWithEmailJS(bookingData) {
        // EmailJS configuration
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        const templateParams = {
            to_name: bookingData.name,
            to_email: bookingData.email,
            from_name: 'Srushti Dharmale',
            from_email: 'srushti@example.com',
            subject: 'Coffee Chat Booking Confirmation',
            message: this.generateEmailTemplate(bookingData),
            booking_date: this.formatDateTime(bookingData.datetime),
            topic: this.getTopicLabel(bookingData.topic),
            notes: bookingData.notes || 'No additional notes'
        };

        return await emailjs.send(
            this.serviceId,
            this.templateId,
            templateParams,
            this.publicKey
        );
    }

    async sendWithFormspree(bookingData) {
        // Formspree configuration
        const formData = new FormData();
        formData.append('name', bookingData.name);
        formData.append('email', bookingData.email);
        formData.append('topic', bookingData.topic);
        formData.append('datetime', bookingData.datetime);
        formData.append('notes', bookingData.notes || '');
        formData.append('_subject', 'New Coffee Chat Booking');
        formData.append('_replyto', bookingData.email);

        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Formspree submission failed');
        }

        return response.json();
    }

    generateEmailTemplate(bookingData) {
        return `
Hello ${bookingData.name},

Thank you for booking a coffee chat with me! ☕

Here are your booking details:
- Date & Time: ${this.formatDateTime(bookingData.datetime)}
- Topic: ${this.getTopicLabel(bookingData.topic)}
- Additional Notes: ${bookingData.notes || 'None'}

I'm excited to connect with you and discuss ${this.getTopicLabel(bookingData.topic).toLowerCase()}!

I'll send you a calendar invite shortly with the meeting details. If you need to reschedule or have any questions, just reply to this email.

Looking forward to our coffee chat!

Best regards,
Srushti Dharmale

---
This is an automated confirmation email. Please don't reply directly to this email.
        `;
    }

    formatDateTime(datetimeString) {
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

    getTopicLabel(topicValue) {
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
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailService;
} else {
    window.EmailService = EmailService;
}
