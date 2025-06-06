// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Dynamic Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const subject = contactForm.querySelector('#subject').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (name && email && subject && message) {
        // Prepare template parameters for EmailJS
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'Rana Abubakar', // Replace with your name if different
            subject: subject,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_knx801y', 'template_vj87oh8', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showCustomMessageBox("Thank you for reaching out! I'll get back to you soon."); // Use custom message box
                contactForm.reset();
            }, function(error) {
                console.error('FAILED...', error);
                showCustomMessageBox("Failed to send message. Please try again later."); // Use custom message box
            });
    } else {
        // Using a custom message box instead of alert()
        showCustomMessageBox("Please fill out all the fields.");
    }
});

// Custom Message Box (replacement for alert())
function showCustomMessageBox(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('custom-message-box');
    messageBox.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <button class="close-message-box">OK</button>
        </div>
    `;
    document.body.appendChild(messageBox);

    // Basic styling for the message box - ideally this would be in CSS
    messageBox.style.position = 'fixed';
    messageBox.style.top = '0';
    messageBox.style.left = '0';
    messageBox.style.width = '100%';
    messageBox.style.height = '100%';
    messageBox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    messageBox.style.display = 'flex';
    messageBox.style.justifyContent = 'center';
    messageBox.style.alignItems = 'center';
    messageBox.style.zIndex = '10000';

    const messageContent = messageBox.querySelector('.message-content');
    messageContent.style.backgroundColor = 'white';
    messageContent.style.padding = '20px';
    messageContent.style.borderRadius = '8px';
    messageContent.style.textAlign = 'center';
    messageContent.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    messageContent.style.maxWidth = '300px';

    const closeButton = messageBox.querySelector('.close-message-box');
    closeButton.style.marginTop = '15px';
    closeButton.style.padding = '8px 20px';
    closeButton.style.backgroundColor = 'var(--secondary)';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    closeButton.addEventListener('click', () => {
        messageBox.remove();
    });
}


// Initialize AOS
AOS.init({
    duration: 1000, // Animation duration
    once: true,    // Whether animation should happen only once - default
});

// Hero Section Text and Underline Animation
const heroHeadingSpans = document.querySelectorAll('#hero-heading span');
const heroParagraph = document.getElementById('hero-paragraph');
const heroUnderline = document.querySelector('.hero-heading-underline');

const paragraphText = "Specializing in WordPress, Shopify, Webflow, and SEO to create stunning, high-performance websites that drive results.";

window.addEventListener('load', () => {
    // Reveal heading spans sequentially with a fade-in
    let delay = 0;
    heroHeadingSpans.forEach((span) => {
        setTimeout(() => {
            span.style.opacity = '1';
        }, delay);
        delay += 400; // Delay each part's reveal
    });

    // Fade in paragraph after heading animation
    setTimeout(() => {
        heroParagraph.textContent = paragraphText;
        heroParagraph.style.opacity = '1';
    }, delay + 200); // Add a small delay after all heading parts are revealed

    // Animate underline after paragraph fades in
    setTimeout(() => {
        heroUnderline.style.width = '60%'; // Expand width
        heroUnderline.style.maxWidth = '600px'; // Ensure it doesn't exceed maximum width
        heroUnderline.classList.add('animate-underline'); // Trigger the pseudo-element animation
    }, delay + 1000); // Delay after paragraph fade-in
});
