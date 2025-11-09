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
const bgMusic = document.createElement('audio');
bgMusic.loop = true;
// يمكن إضافة مصدر للموسيقى هنا
// bgMusic.src = 'music.mp3';
let isPlaying = false;
musicBtn.addEventListener('click', () => {
    if(isPlaying){ 
        bgMusic.pause(); 
        musicBtn.classList.remove('playing'); 
        isPlaying=false;
    }
    else{ 
        bgMusic.play().catch(e => console.log('لم يتم تحميل الموسيقى: ', e)); 
        musicBtn.classList.add('playing'); 
        isPlaying=true;
    }
});

// Counter للأرقام
function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('