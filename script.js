// الانتظار حتى تحميل الصفحة بالكامل
window.addEventListener('load', function() {
    console.log('🚀 بدء تحميل الموقع...');
    initializeAllFunctions();
});

function initializeAllFunctions() {
    // 1. تهيئة النجوم
    initializeStars();
    
    // 2. تهيئة المؤشر
    initializeCursor();
    
    // 3. تهيئة زر الموسيقى
    initializeMusicPlayer();
    
    // 4. تهيئة العدادات
    initializeCounters();
    
    // 5. تهيئة البطاقات
    initializeCards();
    
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
        canvas.height = window.documentElement.scrollHeight;
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

// 2. تأثير المؤشر
function initializeCursor() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// 3. زر الموسيقى - الإصلاح الكامل
function initializeMusicPlayer() {
    const musicButton = document.getElementById('musicBtn');
    if (!musicButton) {
        console.log('❌ زر الموسيقى غير موجود');
        return;
    }

    // إنشاء عنصر الصوت
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.7;
    
    // استخدام ملف محلي
    audio.src = 'music.mp3';
    
    let isPlaying = false;

    musicButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('🎵 تم النقر على زر الموسيقى');
        
        if (isPlaying) {
            // إيقاف الموسيقى
            audio.pause();
            musicButton.classList.remove('playing');
            isPlaying = false;
            console.log('⏸️ تم إيقاف الموسيقى');
        } else {
            // تشغيل الموسيقى
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicButton.classList.add('playing');
                    isPlaying = true;
                    console.log('▶️ تم تشغيل الموسيقى');
                }).catch(error => {
                    console.error('❌ خطأ في التشغيل:', error);
                    alert('🔊 يرجى السماح بتشغيل الصوت في الموقع');
                });
            }
        }
    });

    // التعامل مع الأخطاء
    audio.addEventListener('error', function(e) {
        console.error('❌ خطأ في ملف الصوت:', e);
        musicButton.innerHTML = '❌';
        musicButton.title = 'ملف الموسيقى غير موجود';
    });
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

// 5. البطاقات - الإصلاح الكامل
function initializeCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        // تأثير الظهور
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
        
        // تأثير القلب عند النقر
        card.addEventListener('click', function(e) {
            // إذا كان النقر على رابط أو زر، توقف هنا
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            const cardInner = this.querySelector('.card-inner');
            const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
            
            cardInner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });
    
    // إصلاح روابط تيك توك - طريقة مباشرة
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card-link')) {
            e.preventDefault();
            e.stopPropagation();
            
            const link = e.target.closest('.card-link');
            const url = link.getAttribute('href');
            
            if (url && url.startsWith('http')) {
                console.log('🔗 فتح رابط تيك توك:', url);
                window.open(url, '_blank');
            }
        }
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
    const backButton = document.getElementById('backToTop');
    if (!backButton) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backButton.classList.add('show');
        } else {
            backButton.classList.remove('show');
        }
    });

    backButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 8. أزرار نسخ الآيدي
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const notification = document.getElementById('notification');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const textToCopy = this.getAttribute('data-id');
            console.log('📋 نسخ:', textToCopy);
            
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
        });
    });
    
    function showNotification(message) {
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    }
}

// تأثيرات إضافية
function initializeScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
        });
    }
}

// إضافة CSS ديناميكي للأنيميشن
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
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// تهيئة تأثيرات التمرير
initializeScrollEffects();

console.log('🎉 تم تحميل script.js بنجاح!');