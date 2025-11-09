// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== بدء تحميل الموقع ===');
    initWebsite();
});

function initWebsite() {
    // 1. النجوم المتحركة
    initStars();
    
    // 2. تأثير المؤشر
    initCursor();
    
    // 3. زر الموسيقى
    initMusic();
    
    // 4. العدادات الرقمية
    initCounters();
    
    // 5. تأثيرات البطاقات
    initCards();
    
    // 6. شريط التقدم
    initProgressBar();
    
    // 7. زر العودة للأعلى
    initBackToTop();
    
    // 8. نسخ الآيدي
    initCopyButtons();
    
    // 9. تأثيرات التمرير
    initScrollEffects();
    
    console.log('✅ تم تهيئة جميع المكونات بنجاح');
}

// 1. النجوم المتحركة
function initStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
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
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });
}

// 2. تأثير المؤشر
function initCursor() {
    const cursorGlow = document.querySelector('.cursor-glow');
    if (!cursorGlow) return;
    
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

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

// 3. زر الموسيقى - محدث
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    let isPlaying = false;
    const bgMusic = new Audio();

    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    // تم التغيير هنا: استخدام ملف محلي بدلاً من الرابط الخارجي
    bgMusic.src = 'music.mp3';

    musicBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎵 النقر على زر الموسيقى');

        if (isPlaying) {
            // إيقاف الموسيقى
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
            console.log('⏸️ تم إيقاف الموسيقى');
        } else {
            // تشغيل الموسيقى
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                isPlaying = true;
                console.log('▶️ تم تشغيل الموسيقى');
            }).catch(error => {
                console.error('❌ خطأ في تشغيل الموسيقى:', error);
                alert('⚠️ يرجى السماح بتشغيل الصوت في الموقع أو التأكد من وجود ملف music.mp3');
            });
        }
    });

    // التعامل مع أخطاء الصوت
    bgMusic.addEventListener('error', function(e) {
        console.error('❌ خطأ في تحميل الملف الصوتي');
        musicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        musicBtn.title = 'خطأ في تحميل الموسيقى - تأكد من وجود ملف music.mp3';
        musicBtn.style.cursor = 'not-allowed';
    });

    console.log('✅ زر الموسيقى جاهز');
}

// 4. العدادات الرقمية
function initCounters() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

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
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsContainer);
}

// 5. تأثيرات البطاقات - الإصلاح الرئيسي
function initCards() {
    const cards = document.querySelectorAll('.card-3d');
    if (cards.length === 0) return;

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

    // تأثير الظهور
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });

    // تأثير قلب البطاقات - الإصلاح هنا
    cards.forEach(card => {
        let isCardFlipped = false;
        
        // النقر على البطاقة لقلبها (فقط على الأجزاء غير النشطة)
        card.addEventListener('click', function(e) {
            // إذا كان النقر على رابط أو زر، لا تقلب البطاقة
            if (e.target.closest('a') || e.target.closest('button')) {
                console.log('🖱️ النقر على رابط/زر - لا قلب البطاقة');
                return;
            }
            
            console.log('🔄 قلب البطاقة');
            const cardInner = this.querySelector('.card-inner');
            isCardFlipped = !isCardFlipped;
            cardInner.style.transform = isCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });
    });

    // إصلاح روابط تيك توك - الإصلاح الرئيسي هنا
    fixTikTokLinks();
}

// إصلاح روابط تيك توك
function fixTikTokLinks() {
    const tiktokLinks = document.querySelectorAll('.card-link[href*="tiktok.com"]');
    
    console.log(`🔗 عدد روابط تيك توك: ${tiktokLinks.length}`);
    
    tiktokLinks.forEach(link => {
        // إزالة أي event listeners سابقة
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // إضافة event listener جديدة
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const url = this.getAttribute('href');
            console.log(`🔗 فتح رابط تيك توك: ${url}`);
            
            if (url && url.startsWith('http')) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });
    });
}

// 6. شريط التقدم
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 7. زر العودة للأعلى
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. نسخ الآيدي
function initCopyButtons() {
    const notification = document.getElementById('notification');
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    if (copyButtons.length === 0) return;

    copyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const id = this.getAttribute('data-id');
            console.log(`📋 نسخ الآيدي: ${id}`);

            navigator.clipboard.writeText(id).then(() => {
                showNotification('تم نسخ الآيدي بنجاح!');
            }).catch(err => {
                // طريقة بديلة للنسخ
                const textArea = document.createElement('textarea');
                textArea.value = id;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('تم نسخ الآيدي بنجاح!');
            });
        });
    });

    function showNotification(message) {
        if (notification) {
            notification.querySelector('.notification-text').textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
}

// 9. تأثيرات التمرير
function initScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            scrollIndicator.style.opacity = currentScroll > 100 ? '0' : '1';
            scrollIndicator.style.pointerEvents = currentScroll > 100 ? 'none' : 'auto';
        });
    }

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroSection.style.opacity = 1 - (scrolled / 800);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// إعادة تهيئة عند تغيير الحجم
window.addEventListener('resize', function() {
    console.log('🔄 إعادة تهيئة الموقع...');
});