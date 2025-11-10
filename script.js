// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 بدء تحميل الموقع...');
    initializeWebsite();
});

function initializeWebsite() {
    try {
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
        
        // 9. تهيئة تأثيرات التمرير
        initializeScrollEffects();
        
        console.log('✅ تم تحميل جميع المكونات بنجاح!');
    } catch (error) {
        console.error('❌ خطأ في تحميل الموقع:', error);
    }
}

// 1. النجوم المتحركة
function initializeStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) {
        console.log('❌ عنصر النجوم غير موجود');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 150;

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
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
        ctx.fillStyle = 'rgba(13, 2, 33, 0.1)';
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
        cursor.style.left = (e.clientX - 15) + 'px';
        cursor.style.top = (e.clientY - 15) + 'px';
    });
}

// 3. زر الموسيقى
function initializeMusicPlayer() {
    const musicButton = document.getElementById('musicBtn');
    if (!musicButton) {
        console.log('❌ زر الموسيقى غير موجود');
        return;
    }

    let isPlaying = false;

    musicButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('🎵 تم النقر على زر الموسيقى');
        
        if (isPlaying) {
            // إيقاف الموسيقى
            musicButton.classList.remove('playing');
            isPlaying = false;
            console.log('⏸️ تم إيقاف الموسيقى');
        } else {
            // تشغيل الموسيقى
            musicButton.classList.add('playing');
            isPlaying = true;
            console.log('▶️ تم تشغيل الموسيقى');
        }
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

    // بدء العد بعد تأخير بسيط
    setTimeout(() => {
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }, 1000);
}

// 5. البطاقات
function initializeCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach((card, index) => {
        // تأثير الظهور
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // تأثير القلب عند النقر
        card.addEventListener('click', function(e) {
            // منع القلب عند النقر على الروابط أو أزرار النسخ
            if (!e.target.closest('.card-link') && !e.target.closest('.copy-btn')) {
                const isFlipped = this.getAttribute('data-flipped') === 'true';
                this.setAttribute('data-flipped', !isFlipped);
                this.classList.toggle('flipped');
            }
        });
    });
    
    // السماح للروابط بالعمل بشكل طبيعي
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card-link')) {
            // السماح للرابط بالعمل بشكل طبيعي
            console.log('🔗 فتح رابط تيك توك');
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
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
    
    function showNotification(message) {
        if (!notification) return;
        
        notification.querySelector('.notification-text').textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const textToCopy = this.getAttribute('data-id');
            console.log('📋 نسخ:', textToCopy);
            
            // طريقة النسخ البديلة
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                showNotification('تم نسخ الآيدي بنجاح!');
            } catch (err) {
                console.error('فشل النسخ:', err);
            }
            
            document.body.removeChild(textArea);
        });
    });
}

// 9. تأثيرات التمرير
function initializeScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
    });
}