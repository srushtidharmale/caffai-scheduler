# Coffee Booking Form ☕

A modern, responsive coffee booking form built with HTML, CSS, and JavaScript. This project allows users to book coffee meetings with a clean, intuitive interface.

## Features ✨

- **Modern Design**: Clean, professional UI with gradient backgrounds and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Form Validation**: Real-time validation with helpful error messages
- **Interactive Elements**: Smooth transitions, hover effects, and loading states
- **Success Modal**: Beautiful confirmation modal after successful booking
- **Accessibility**: Proper form labels, keyboard navigation, and screen reader support

## Form Fields 📝

- **Name**: First and last name inputs
- **Topic Selection**: Dropdown with predefined meeting topics
- **Date & Time**: DateTime picker with minimum date validation (24 hours advance notice)
- **Additional Notes**: Optional textarea for additional information

## Technologies Used 🛠️

- **HTML5**: Semantic markup with proper form structure
- **CSS3**: Modern styling with Flexbox, Grid, and CSS animations
- **JavaScript (ES6+)**: Form validation, modal handling, and user interactions
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Inter font family for clean typography

## File Structure 📁

```
coffee-booking-form/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Getting Started 🚀

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd coffee-booking-form
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Customize**:
   - Modify `styles.css` for different colors and styling
   - Update `script.js` to integrate with your backend API
   - Add more form fields in `index.html` as needed

## Customization 🎨

### Colors
The form uses a warm color palette:
- Primary: Purple gradient (`#8b5cf6` to `#a855f7`)
- Secondary: Orange gradient (`#f97316` to `#ea580c`)
- Background: Yellow gradient (`#fef3c7` to `#fde68a`)
- Success: Green (`#10b981`)

### Form Topics
Edit the topic options in `index.html`:
```html
<option value="your-topic">Your Topic Name</option>
```

### Backend Integration
Replace the simulated API call in `script.js`:
```javascript
// Replace this section with your actual API call
setTimeout(() => {
    processBooking();
}, 2000);
```

## Browser Support 🌐

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features in Detail 🔍

### Form Validation
- Required field validation
- Date/time validation (must be future date)
- Real-time error feedback
- Visual error states with animations

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- High contrast ratios
- Screen reader compatibility

### Animations
- Smooth form appearance
- Loading states
- Hover effects
- Modal transitions

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Contact 📧

If you have any questions or suggestions, feel free to reach out!

---

**Happy Coffee Booking! ☕✨**
