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
    
    console.log('✅ النجوم المتحركة جاهزة');
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
    
    console.log('✅ تأثير المؤشر جاهز');
}

// 3. زر الموسيقى - إصلاح كامل
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) {
        console.log('❌ زر الموسيقى غير موجود');
        return;
    }

    let isPlaying = false;
    const bgMusic = new Audio();

    // إعدادات الموسيقى
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    
    // استخدام ملف صوتي افتراضي (يمكنك تغييره)
    bgMusic.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

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
                alert('⚠️ يرجى السماح بتشغيل الصوت في الموقع');
            });
        }
    });

    // التعامل مع أخطاء الصوت
    bgMusic.addEventListener('error', function(e) {
        console.error('❌ خطأ في تحميل الملف الصوتي');
        musicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        musicBtn.title = 'خطأ في تحميل الموسيقى';
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
    console.log('✅ العدادات الرقمية جاهزة');
}

// 5. تأثيرات البطاقات
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

    // تأثير قلب البطاقات
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

    console.log('✅ تأثيرات البطاقات جاهزة');
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

    console.log('✅ شريط التقدم جاهز');
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

    console.log('✅ زر العودة للأعلى جاهز');
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
            console.log(`📋 محاولة نسخ: ${id}`);

            // استخدام Clipboard API
            navigator.clipboard.writeText(id).then(() => {
                showNotification('تم نسخ الآيدي بنجاح!');
            }).catch(err => {
                console.error('❌ فشل في النسخ:', err);
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

    console.log('✅ أزرار نسخ الآيدي جاهزة');
}

// 9. تأثيرات التمرير
function initScrollEffects() {
    // مؤشر التمرير
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            scrollIndicator.style.opacity = currentScroll > 100 ? '0' : '1';
            scrollIndicator.style.pointerEvents = currentScroll > 100 ? 'none' : 'auto';
        });
    }

    // تأثير البارالاكس
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroSection.style.opacity = 1 - (scrolled / 800);
        });
    }

    // التمرير السلس للروابط الداخلية
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

    console.log('✅ تأثيرات التمرير جاهزة');
}

// 10. إصلاح جميع روابط تيك توك
function fixTikTokLinks() {
    const tiktokLinks = document.querySelectorAll('.card-link');
    
    tiktokLinks.forEach(link => {
        // إزالة أي event listeners سابقة
        link.replaceWith(link.cloneNode(true));
    });

    // إضافة event listeners جديدة
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card-link')) {
            e.preventDefault();
            e.stopPropagation();
            
            const link = e.target.closest('.card-link');
            const url = link.getAttribute('href');
            
            if (url && url.startsWith('http')) {
                console.log(`🔗 فتح رابط تيك توك: ${url}`);
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        }
    });

    console.log('✅ روابط تيك توك جاهزة');
}

// إصلاح الروابط بعد تحميل الصفحة
setTimeout(fixTikTokLinks, 1000);

// إعادة تهيئة عند تغيير الحجم
window.addEventListener('resize', function() {
    console.log('🔄 إعادة تهيئة الموقع...');
});