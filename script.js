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
        
        console.log('✅ تم تحميل جميع المكونات بنجاح!');
    } catch (error) {
        console.error('❌ خطأ في تحميل الموقع:', error);
    }
}

// 1. النجوم المتحركة
function initializeStars() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 100;

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
                speed: Math.random() * 0.3,
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
        });
        
        requestAnimationFrame(drawStars);
    }

    setupCanvas();
    createStars();
    drawStars();
    
    window.addEventListener('resize', setupCanvas);
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
    if (!musicButton) return;

    musicButton.addEventListener('click', function() {
        this.classList.toggle('playing');
        console.log('🎵 تم النقر على زر الموسيقى');
    });
}

// 4. العدادات الرقمية
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // بدء العد بعد تأخير بسيط
        setTimeout(updateCounter, 500);
    });
}

// 5. البطاقات
function initializeCards() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach((card, index) => {
        // تأثير الظهور
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // تأثير القلب
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.card-link') && !e.target.closest('.copy-btn')) {
                const isFlipped = this.getAttribute('data-flipped') === 'true';
                this.setAttribute('data-flipped', !isFlipped);
                this.classList.toggle('flipped');
            }
        });
    });
}

// 6. شريط التقدم
function initializeProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;
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

    backButton.addEventListener('click', function() {
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
            e.stopPropagation();
            const textToCopy = this.getAttribute('data-id');
            
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

// تأثيرات التمرير
function initializeScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
    });
}