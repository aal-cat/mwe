/* script.js - ديناميكي ومُحسَّن */
document.addEventListener('DOMContentLoaded', () => {
  // كل الكود الحالي الذي لديك...
  // ... (الكود الحالي كاملاً)

  // =========================
  // شريط التقدم
  // =========================
  function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      progressBar.style.width = progress + '%';
    });
  }

  // =========================
  // تأثيرات الظهور التدريجي
  // =========================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.intro-box, .section-title, .account-item');
    elementsToAnimate.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // =========================
  // إنشاء قسم روابط الحسابات
  // =========================
  function createAccountsSection() {
    const accountsSection = document.createElement('section');
    accountsSection.className = 'accounts-section';
    accountsSection.innerHTML = `
      <div class="accounts-container">
        <h2 class="section-title">روابط حسابات الأبطال</h2>
        <div class="accounts-grid" id="accountsGrid"></div>
      </div>
    `;

    const footer = document.querySelector('.footer');
    document.body.insertBefore(accountsSection, footer);

    const accountsGrid = document.getElementById('accountsGrid');
    heroes.forEach(hero => {
      const accountItem = document.createElement('div');
      accountItem.className = 'account-item fade-in';
      accountItem.innerHTML = `
        <div class="account-name">${hero.name}</div>
        <a href="${hero.link}" target="_blank" class="account-link" rel="noopener">
          <i class="fab fa-tiktok"></i>
          ${hero.idText}
        </a>
      `;
      accountsGrid.appendChild(accountItem);
    });
  }

  // =========================
  // تحسين أداء الصور
  // =========================
  function optimizeImages() {
    const images = document.querySelectorAll('.card-img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.onerror = function() {
        this.style.display = 'none';
        const parentCard = this.closest('.card-front');
        if (parentCard) {
          parentCard.style.background = 'linear-gradient(135deg, var(--accent), #8a3dff)';
        }
      };
    });
  }

  // =========================
  // تهيئة جميع التحسينات
  // =========================
  function initEnhancements() {
    initProgressBar();
    initScrollAnimations();
    createAccountsSection();
    optimizeImages();
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          if (starsCanvas && !usingSmoke) {
            starsCanvas.style.opacity = '1';
          }
        }, 100);
      }
    });
  }

  // استدعاء التحسينات بعد تحميل الصفحة
  setTimeout(initEnhancements, 100);

}); // ✅ هذا هو الإغلاق الصحيح الوحيد