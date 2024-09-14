const typingText = document.getElementById('typing-text');
const phrases = ['Web Designer', 'Front End Web Developer', 'Freelancer'];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = '';
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = phrases[phraseIndex];
    
    if (isDeleting) {
        currentPhrase = currentWord.substring(0, letterIndex - 1);
        typingSpeed = 50;
    } else {
        currentPhrase = currentWord.substring(0, letterIndex + 1);
        typingSpeed = 100;
    }
    
    typingText.textContent = currentPhrase;
    
    if (!isDeleting && letterIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    letterIndex += isDeleting ? -1 : 1;
    
    setTimeout(type, typingSpeed);
}

const cursor = document.createElement('span');
cursor.className = 'typing-cursor';
typingText.parentNode.insertBefore(cursor, typingText.nextSibling);

type();

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.project-slider');
    const projects = document.querySelectorAll('.project-card');

    let currentIndex = 1;
    let intervalId;

    function updateSlider() {
        projects.forEach((project, index) => {
            let position = index - currentIndex;
            if (position < -1) position += projects.length;
            if (position > 2) position -= projects.length;
            project.dataset.position = position;
            project.classList.toggle('active', position === 0);
        });
    }

    function rotateSlider() {
        currentIndex = (currentIndex + 1) % projects.length;
        updateSlider();
    }

    function startRotation() {
        clearInterval(intervalId);
        intervalId = setInterval(rotateSlider, 4000);
    }

    function stopRotation() {
        clearInterval(intervalId);
    }

    slider.addEventListener('mouseenter', stopRotation);
    slider.addEventListener('mouseleave', startRotation);

    updateSlider();
    startRotation();
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.project-track');
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    const animateOnLoad = () => {
        document.body.classList.add('fade-in');
        document.querySelectorAll('header, section').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
                element.classList.add('fade-in');
            }, index * 200);
        });
    };

    if (document.readyState === 'complete') {
        animateOnLoad();
    } else {
        window.addEventListener('load', animateOnLoad);
    }
});

const themeSwitch = document.getElementById('theme-switch');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList.add(currentTheme);
    themeSwitch.checked = currentTheme === 'dark-mode';
}

themeSwitch.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// Add this to the end of your script.js file

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });
});

// Add this function to the end of your script.js file

function animateOnLoad() {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const projects = document.querySelector('.projects');
    const contact = document.querySelector('.contact');
    const footer = document.querySelector('.footer');

    header.style.animation = 'slideInFromTop 1s ease-out';
    
    const heroElements = hero.children;
    Array.from(heroElements).forEach((element, index) => {
        element.style.animation = `fadeIn 1s ease-out ${index * 0.2}s forwards`;
    });

    projects.style.animation = 'slideInFromLeft 1s ease-out 0.5s forwards';
    projects.style.opacity = '0';

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `scaleIn 0.5s ease-out ${0.8 + index * 0.2}s forwards`;
        card.style.opacity = '0';
    });

    contact.style.animation = 'slideInFromRight 1s ease-out 1s forwards';
    contact.style.opacity = '0';

    footer.style.animation = 'slideInFromBottom 1s ease-out 1.2s forwards';
    footer.style.opacity = '0';
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', animateOnLoad);

// Also call the function when the page is refreshed
window.addEventListener('load', animateOnLoad);

