// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 بدء تحميل الموقع...');
    initializeWebsite();
});

function initializeWebsite() {
    // 1. تهيئة النجوم
    initializeStars();
    
    // 2. تهيئة المؤشر الذكي
    initializeSmartCursor();
    
    // 3. تهيئة زر الموسيقى
    initializeMusicPlayer();
    
    // 4. تهيئة العدادات
    initializeCounters();
    
    // 5. تهيئة البطاقات الذكية
    initializeSmartCards();
    
    // 6. تهيئة شريط التقدم
    initializeProgressBar();
    
    // 7. تهيئة زر العودة للأعلى
    initializeBackToTop();
    
    // 8. تهيئة أزرار النسخ
    initializeCopyButtons();
    
    console.log('✅ تم تحميل جميع المكونات بنجاح!');
}

// 1. النجوم المتحركة
function initializeStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 150;

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.5,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(10, 5, 30, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            
            star.opacity += (Math.random() - 0.5) * 0.02;
            star.opacity = Math.max(0.2, Math.min(1, star.opacity));
        });
        
        requestAnimationFrame(drawStars);
    }

    setupCanvas();
    createStars();
    drawStars();
    
    window.addEventListener('resize', function() {
        setupCanvas();
        createStars();
    });
}

// 2. المؤشر الذكي - الإصلاح الجذري
function initializeSmartCursor() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;
    
    // إظهار المؤشر فوراً
    cursor.style.display = 'block';
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // تتبع حركة الماوس
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // تأثير النقر على المؤشر
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'scale(0.8)';
        cursor.style.backgroundColor = 'rgba(0, 240, 255, 0.8)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });
    
    // نظام النقر الذكي بالمؤشر
    document.addEventListener('click', function(e) {
        const cursorRect = {
            left: mouseX - 15,
            top: mouseY - 15,
            right: mouseX + 15,
            bottom: mouseY + 15
        };
        
        // البحث عن العناصر تحت المؤشر
        const elementsUnderCursor = document.elementsFromPoint(mouseX, mouseY);
        
        for (let element of elementsUnderCursor) {
            // إذا كان المؤشر فوق زر موسيقى
            if (element.id === 'musicBtn' || element.closest('#musicBtn')) {
                simulateButtonClick('musicBtn');
                break;
            }
            
            // إذا كان المؤشر فوق رابط تيك توك
            if (element.classList.contains('card-link') || element.closest('.card-link')) {
                const link = element.classList.contains('card-link') ? element : element.closest('.card-link');
                openTikTokLink(link);
                break;
            }
            
            // إذا كان المؤشر فوق زر نسخ
            if (element.classList.contains('copy-btn') || element.closest('.copy-btn')) {
                const button = element.classList.contains('copy-btn') ? element : element.closest('.copy-btn');
                simulateCopyButtonClick(button);
                break;
            }
            
            // إذا كان المؤشر فوق زر العودة للأعلى
            if (element.id === 'backToTop' || element.closest('#backToTop')) {
                simulateButtonClick('backToTop');
                break;
            }
            
            // إذا كان المؤشر فوق بطاقة (وليس على زر أو رابط)
            if (element.classList.contains('card-3d') || element.closest('.card-3d')) {
                const card = element.classList.contains('card-3d') ? element : element.closest('.card-3d');
                if (!element.closest('a') && !element.closest('button')) {
                    flipCard(card);
                    break;
                }
            }
        }
    });
}

// محاكاة نقر الزر
function simulateButtonClick(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    // تأثير النقر المرئي
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // تنفيذ الإجراء بناءً على نوع الزر
    switch(buttonId) {
        case 'musicBtn':
            toggleMusic();
            break;
        case 'backToTop':
            scrollToTop();
            break;
    }
}

// فتح رابط تيك توك
function openTikTokLink(linkElement) {
    if (!linkElement) return;
    
    const url = linkElement.getAttribute('href');
    if (url && url.startsWith('http')) {
        console.log('🔗 فتح رابط تيك توك:', url);
        
        // تأثير النقر المرئي على الرابط
        linkElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            linkElement.style.transform = 'scale(1)';
        }, 150);
        
        // فتح الرابط في نافذة جديدة
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

// نسخ النص
function simulateCopyButtonClick(buttonElement) {
    if (!buttonElement) return;
    
    const textToCopy = buttonElement.getAttribute('data-id');
    console.log('📋 نسخ الآيدي:', textToCopy);
    
    // تأثير النقر المرئي
    buttonElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        buttonElement.style.transform = 'scale(1)';
    }, 150);
    
    // نسخ إلى الحافظة
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('تم نسخ الآيدي بنجاح!');
    }).catch(err => {
        // طريقة بديلة للنسخ
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('تم نسخ الآيدي بنجاح!');
    });
}

// قلب البطاقة
function flipCard(cardElement) {
    if (!cardElement) return;
    
    const cardInner = cardElement.querySelector('.card-inner');
    if (!cardInner) return;
    
    const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
    cardInner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
    
    // تأثير النقر المرئي
    cardElement.style.transform = 'scale(0.98)';
    setTimeout(() => {
        cardElement.style.transform = 'scale(1)';
    }, 150);
}

// 3. زر الموسيقى
function initializeMusicPlayer() {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.7;
    audio.src = 'music.mp3';
    
    window.toggleMusic = function() {
        const musicBtn = document.getElementById('musicBtn');
        if (!musicBtn) return;
        
        if (window.isMusicPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
            window.isMusicPlaying = false;
            console.log('⏸️ تم إيقاف الموسيقى');
        } else {
            audio.play().then(() => {
                musicBtn.classList.add('playing');
                window.isMusicPlaying = true;
                console.log('▶️ تم تشغيل الموسيقى');
            }).catch(error => {
                console.error('❌ خطأ في التشغيل:', error);
                alert('🔊 يرجى السماح بتشغيل الصوت في الموقع');
            });
        }
    };
    
    window.isMusicPlaying = false;
}

// 4. العدادات الرقمية
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }
        update();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// 5. البطاقات الذكية
function initializeSmartCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    // تأثير الظهور
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 6. شريط التقدم
function initializeProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// 7. زر العودة للأعلى
function initializeBackToTop() {
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const backButton = document.getElementById('backToTop');
    if (backButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backButton.classList.add('show');
            } else {
                backButton.classList.remove('show');
            }
        });
    }
}

// 8. أزرار النسخ
function initializeCopyButtons() {
    // تم دمج هذه الوظيفة في نظام المؤشر الذكي
}

// عرض الإشعارات
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
}

// إضافة CSS ديناميكي
const dynamicStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .card-3d {
        transition: all 0.3s ease;
    }
    
    .music-toggle, .card-link, .copy-btn, .back-to-top {
        transition: all 0.2s ease;
    }
    
    .cursor-glow {
        display: block !important;
        pointer-events: none !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

console.log('🎉 تم تحميل النظام الذكي بنجاح!');