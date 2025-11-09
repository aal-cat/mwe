// النجوم المتحركة
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
const starCount = 200;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random()
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        star.opacity += (Math.random() - 0.5) * 0.02;
        if (star.opacity < 0.3) star.opacity = 0.3;
        if (star.opacity > 1) star.opacity = 1;
    });
    requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars();
drawStars();
window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

// Cursor glow
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursorGlow.style.left = cursorX + 'px';
    cursorGlow.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// زر الموسيقى
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;
musicBtn.addEventListener('click', () => {
    if(isPlaying){ bgMusic.pause(); musicBtn.classList.remove('playing'); isPlaying=false;}
    else{ bgMusic.play(); musicBtn.classList.add('playing'); isPlaying=true;}
});

// Counter للأرقام
function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('ar-EG');
                requestAnimationFrame(updateCounter);
            } else { counter.textContent = target.toLocaleString('ar-EG'); }
        };
        updateCounter();
    });
}
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){ animateNumbers(); statsObserver.unobserve(entry.target);}
    });
}, {threshold:0.5});
const statsContainer = document.querySelector('.stats-container');
if(statsContainer) statsObserver.observe(statsContainer);

// Animation البطاقات
const cardObserver = new IntersectionObserver(entries => {
    entries.forEach((entry,index) => {
        if(entry.isIntersecting){
            setTimeout(()=>{entry.target.style.animation='fadeInUp 0.6s ease forwards';}, index*100);
            cardObserver.unobserve(entry.target);
        }
    });
},{threshold:0.1});
const cards = document.querySelectorAll('.card-3d');
cards.forEach(card => { card.style.opacity='0'; cardObserver.observe(card); });

// CSS Animation للبطاقات
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    scrollIndicator.style.opacity = currentScroll>100 ? '0':'1';
    scrollIndicator.style.pointerEvents = currentScroll>100 ? 'none':'auto';
});

// parallax hero
const heroSection = document.querySelector('.hero-section');
window.addEventListener('scroll', ()=>{
    const scrolled = window.pageYOffset;
    if(heroSection){ heroSection.style.transform = `translateY(${scrolled*0.5}px)`; heroSection.style.opacity=1-(scrolled/800);}
});

// تأثير 3D للبطاقات
cards.forEach(card=>{
    card.addEventListener('mousemove', e=>{
        const rect = card.getBoundingClientRect();
        const x = e.clientX-rect.left;
        const y = e.clientY-rect.top;
        const centerX=rect.width/2;
        const centerY=rect.height/2;
        const rotateX = (y-centerY)/10;
        const rotateY = (centerX-x)/10;
        card.style.transform=`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', ()=>{card.style.transform='perspective(1000px) rotateX(0) rotateY(0) scale(1)';});
    card.addEventListener('mouseenter', ()=>{ card.style.transition='all 0.3s cubic-bezier(0.4,0,0.2,1)'; });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
});