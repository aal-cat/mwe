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

// تهيئة النجوم
window.addEventListener('load', function() {
    resizeCanvas();
    createStars();
    drawStars();
});

window.addEventListener('resize', () => { 
    resizeCanvas(); 
    createStars(); 
});

// Cursor glow
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

if (cursorGlow) {
    document.addEventListener('mousemove', e => { 
        mouseX = e.clientX; 
        mouseY = e.clientY; 
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// زر الموسيقى - إصلاح كامل
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

if (musicBtn) {
    // إنشاء عنصر الصوت
    const bgMusic = new Audio();
    bgMusic.loop = true;
    
    // إضافة مصدر للموسيقى (يمكنك تغيير الرابط)
    bgMusic.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    
    // تعطيل التحكم التلقائي
    bgMusic.autoplay = false;
    
    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if(isPlaying) { 
            bgMusic.pause(); 
            musicBtn.classList.remove('playing'); 
            isPlaying = false;
            console.log('تم إيقاف الموسيقى');
        } else { 
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing'); 
                isPlaying = true;
                console.log('تم تشغيل الموسيقى');
            }).catch(error => {
                console.log('خطأ في تشغيل الموسيقى:', error);
                // عرض رسالة للمستخدم
                alert('يرجى السماح بتشغيل الصوت في الموقع');
            });
        }
    });

    // التعامل مع أخطاء الصوت
    bgMusic.addEventListener('error', function(e) {
        console.error('خطأ في تحميل الملف الصوتي:', e);
        musicBtn.style.display = 'none'; // إخفاء الزر إذا كان هناك خطأ
    });
}

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
            } else { 
                counter.textContent = target.toLocaleString('ar-EG'); 
            }
        };
        updateCounter();
    });
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){ 
            animateNumbers(); 
            statsObserver.unobserve(entry.target);
        }
    });
}, {threshold:0.5});

const statsContainer = document.querySelector('.stats-container');
if(statsContainer) {
    statsObserver.observe(statsContainer);
}

// Animation البطاقات
const cardObserver = new IntersectionObserver(entries => {
    entries.forEach((entry,index) => {
        if(entry.isIntersecting){
            setTimeout(()=>{
                entry.target.style.animation='fadeInUp 0.6s ease forwards';
            }, index*100);
            cardObserver.unobserve(entry.target);
        }
    });
},{threshold:0.1});

const cards = document.querySelectorAll('.card-3d');
cards.forEach(card => { 
    card.style.opacity='0'; 
    cardObserver.observe(card); 
});

// إضافة أنيميشن fadeInUp
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { 
            opacity: 0; 
            transform: translateY(50px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
`;
document.head.appendChild(style);

// scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        scrollIndicator.style.opacity = currentScroll > 100 ? '0' : '1';
        scrollIndicator.style.pointerEvents = currentScroll > 100 ? 'none' : 'auto';
    });
}

// parallax hero
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', ()=>{
        const scrolled = window.pageYOffset;
        heroSection.style.transform = `translateY(${scrolled*0.5}px)`; 
        heroSection.style.opacity = 1 - (scrolled/800);
    });
}

// تأثير 3D للبطاقات - محدث
cards.forEach(card => {
    let isCardFlipped = false;
    
    card.addEventListener('click', function(e) {
        // منع النقر على الروابط والأزرار من قلب البطاقة
        if (e.target.closest('a') || e.target.closest('button')) {
            return;
        }
        
        const cardInner = this.querySelector('.card-inner');
        isCardFlipped = !isCardFlipped;
        cardInner.style.transform = isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    });
});

// إصلاح روابط تيك توك - التأكد من فتحها في نافذة جديدة
document.addEventListener('click', function(e) {
    if (e.target.closest('.card-link')) {
        e.preventDefault();
        const link = e.target.closest('.card-link');
        const url = link.getAttribute('href');
        if (url) {
            window.open(url, '_blank');
        }
    }
});

// Smooth scroll للنقر على الروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// شريط التقدم
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// زر العودة للأعلى
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
}

// نسخ الآيدي
const notification = document.getElementById('notification');
if (notification) {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // منع انتشار الحدث للبطاقة
            e.preventDefault(); // منع السلوك الافتراضي
            
            const id = this.getAttribute('data-id');
            
            // استخدام Clipboard API
            navigator.clipboard.writeText(id).then(() => {
                // إظهار الإشعار
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('فشل في نسخ النص: ', err);
                // طريقة بديلة للنسخ
                const textArea = document.createElement('textarea');
                textArea.value = id;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // إظهار الإشعار حتى مع الطريقة البديلة
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            });
        });
    });
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع بنجاح');
    
    // التأكد من أن جميع العناصر جاهزة
    if (musicBtn) {
        console.log('زر الموسيقى جاهز');
    }
    
    // اختبار الروابط
    const tiktokLinks = document.querySelectorAll('.card-link');
    console.log(`عدد روابط تيك توك: ${tiktokLinks.length}`);
    
    tiktokLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`النقر على رابط تيك توك رقم ${index + 1}`);
        });
    });
});

// إضافة تأثيرات للهواتف
if ('ontouchstart' in window) {
    document.body.style.cursor = 'default';
    
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
}

// منع السلوك الافتراضي للروابط
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});