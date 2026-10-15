// Navigation tab switching logic
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link, .brand-logo');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Update active state on nav buttons
            document.querySelectorAll('.nav-link').forEach(nav => {
                if(nav.getAttribute('data-target') === targetId) {
                    nav.classList.add('active');
                } else {
                    nav.classList.remove('active');
                }
            });

            // Show target section, hide others
            sections.forEach(section => {
                if(section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

// Toggle expand card details on hero cards
function toggleCardDetails(button) {
    const cardBody = button.closest('.card-body');
    const extraDetails = cardBody.querySelector('.card-extra-details');
    
    if (extraDetails.classList.contains('open')) {
        extraDetails.classList.remove('open');
        button.textContent = 'Read More ✨';
    } else {
        extraDetails.classList.add('open');
        button.textContent = 'Show Less 🔼';
    }
}

// Text-to-Speech audio voiceover helper for lower-primary readers
function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for primary students
        utterance.pitch = 1.1; // Friendly tone
        
        // Try to pick an English voice if available
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        window.speechSynthesis.speak(utterance);
    } else {
        alert('Audio speech synthesis is not supported on your browser.');
    }
}