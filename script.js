/* script.js - ديناميكي ومُحسَّن */
/* يعتمد على صور: 1.jpg ... 11.jpg في مجلد الجذر أو images/ حسب تنظيمك */
/* البريد المستهدف للدعم: gszgxgxvx@gmail.com */

document.addEventListener('DOMContentLoaded', () => {
  // عناصر رئيسية
  const starsCanvas = document.getElementById('starsCanvas');
  const bgSmoke = document.getElementById('bgSmoke');
  const bgToggle = document.getElementById('bgToggle');
  const membersGrid = document.getElementById('membersGrid');
  const supportBtn = document.getElementById('supportBtn');
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('supportPopup');
  const popupClose = document.getElementById('popupClose');
  const popupCancel = document.getElementById('popupCancel');
  const supportForm = document.getElementById('supportForm');
  const notification = document.getElementById('notification');
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');
  const scrollIndicator = document.getElementById('scrollIndicator');

  let usingSmoke = true;
  if (!bgSmoke || !bgSmoke.querySelector('source') || !bgSmoke.querySelector('source').src) {
    usingSmoke = false;
    bgSmoke && bgSmoke.classList.remove('active');
  } else {
    bgSmoke.classList.add('active');
  }

  // =========================
  // بيانات الأبطال
  // =========================
  const heroes = [
    { img:'1.jpg', name:'عبيدة', rank:'كاريزما إلى الحد الأقصى', desc:'يتمتع بكاريزما طاغية تجعله محط الأنظار. اليد اليمنى للقائد عبدالله.', link:'https://www.tiktok.com/@level.201' , idText:'level.201' },
    { img:'2.jpg', name:'عبدالله', rank:'😺E=mc²😺', desc:'القائد الأعظم والدماغ المدبر وراء إستراتيجيات المياوز.', link:'https://www.tiktok.com/@124hht', idText:'124hht' },
    { img:'3.jpg', name:'جاسم', rank:'مازوخي', desc:'محارب لا يعرف الخوف.', link:'https://www.tiktok.com/@bachira_402', idText:'bachira_402' },
    { img:'4.jpg', name:'محمد', rank:'المحارب الصامت', desc:'يتحرك في صمت ويضرب بقوة.', link:'https://www.tiktok.com/@.999qaa', idText:'.999qaa' },
    { img:'5.jpg', name:'المحارب الأحمر', rank:'@red908287', desc:'خبير في التكتيكات الحمراء.', link:'https://www.tiktok.com/@red908287', idText:'red908287' },
    { img:'6.jpg', name:'ZX Aspo', rank:'@zxaspo', desc:'خبير التكنولوجيا والاتصالات.', link:'https://www.tiktok.com/@zxaspo', idText:'zxaspo' },
    { img:'7.jpg', name:'Zoro Gaming', rank:'@zorogaming369', desc:'سيد الألعاب والتكتيكات الافتراضية.', link:'https://www.tiktok.com/@zorogaming369', idText:'zorogaming369' },
    { img:'8.jpg', name:'LLO', rank:'@llo.ll2', desc:'خبير الشفرات والاتصالات المشفرة.', link:'https://www.tiktok.com/@llo.ll2', idText:'llo.ll2' },
    { img:'9.jpg', name:'Nabaa', rank:'@nabaa7065', desc:'خبيرة الاستخبارات والتخطيط.', link:'https://www.tiktok.com/@nabaa7065', idText:'nabaa7065' },
    { img:'10.jpg', name:'EN18S', rank:'@en18s', desc:'متخصص في العمليات الخاصة.', link:'https://www.tiktok.com/@en18s', idText:'en18s' },
    { img:'11.jpg', name:'Memeoyah', rank:'@memeoyah', desc:'سيد الدعاية النفسية.', link:'https://www.tiktok.com/@memeoyah', idText:'memeoyah' }
  ];

  // =========================
  // توليد البطاقات ديناميكياً
  // =========================
  function buildCards() {
    membersGrid.innerHTML = '';
    heroes.forEach((h, i) => {
      const cardWrap = document.createElement('div');
      cardWrap.className = 'card-3d';
      cardWrap.dataset.index = i;
      cardWrap.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <img class="card-img" src="${h.img}" alt="${h.name}" onerror="this.style.display='none'">
            <div class="card-overlay">
              <div class="card-name">${h.name}</div>
              <div class="card-rank">${h.rank}</div>
            </div>
          </div>
          <div class="card-back">
            <h3>${h.name}</h3>
            <div class="card-desc">${h.desc}</div>
            <div class="card-actions">
              <a class="card-link" href="${h.link}" target="_blank" rel="noopener">تابعني على تيك توك</a>
              <button class="copy-btn" data-id="${h.idText}"><i class="fas fa-copy"></i> نسخ الآيدي</button>
            </div>
          </div>
        </div>
      `;
      membersGrid.appendChild(cardWrap);

      setTimeout(()=> {
        cardWrap.style.opacity = 1;
        cardWrap.style.transform = 'translateY(0)';
      }, 120 * i);
    });
  }

  buildCards();

  // =========================
  // تأثيرات النجوم (canvas)
  // =========================
  (function initStars(){
    const canvas = starsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = [];
    const count = Math.max(80, Math.floor((w*h)/50000));
    for (let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.5+0.2,
        vx: (Math.random()-0.5)*0.15,
        vy: (Math.random()*0.2)+0.05,
        a: Math.random()*0.9+0.1
      });
    }
    function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);

    function draw(){
      ctx.clearRect(0,0,w,h);
      const g = ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)/1.2);
      g.addColorStop(0,'rgba(2,6,16,0)');
      g.addColorStop(1,'rgba(2,6,10,0.6)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        if (p.y>h){ p.y=0; p.x=Math.random()*w; }
        if (p.x<0) p.x = w;
        if (p.x>w) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
    draw();
  })();

  // =========================
  // تبديل الخلفية (فيديو الدخان أو النجوم)
  // =========================
  function setBackground(useSmoke){
    if (useSmoke && bgSmoke && bgSmoke.querySelector('source') && bgSmoke.querySelector('source').src) {
      bgSmoke.classList.add('active');
      starsCanvas.style.opacity = 0;
    } else {
      bgSmoke && bgSmoke.classList.remove('active');
      starsCanvas.style.opacity = 1;
    }
    usingSmoke = !!useSmoke;
  }

  bgToggle.addEventListener('click', () => {
    setBackground(!usingSmoke);
    showNotice(usingSmoke ? 'النجوم مفعل' : 'دخان مفعل');
  });

  setBackground(usingSmoke);

  // =========================
  // Flip cards عند النقر
  // =========================
  membersGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card-3d');
    if (!card) return;
    if (e.target.closest('.card-link') || e.target.closest('.copy-btn')) return;
    card.classList.toggle('flipped');
  });

  membersGrid.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.card-3d');
    if (!card) return;
    const img = card.querySelector('.card-img');
    img && (img.style.transform = 'scale(1.06)');
  });
  membersGrid.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.card-3d');
    if (!card) return;
    const img = card.querySelector('.card-img');
    img && (img.style.transform = 'scale(1)');
  });

  // =========================
  // نسخ الآيدي
  // =========================
  membersGrid.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const text = btn.dataset.id || '';
    if (!text) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      showNotice('تم نسخ الآيدي: ' + text);
    } catch (err) {
      console.error('copy failed', err);
      showNotice('فشل النسخ');
    }
  });

  // =========================
  // دعم فني — نافذة منبثقة + mailto
  // =========================
  function openSupport(){
    overlay.classList.add('show');
    popup.classList.add('show');
    overlay.setAttribute('aria-hidden','false');
    popup.setAttribute('aria-hidden','false');
  }
  function closeSupport(){
    overlay.classList.remove('show');
    popup.classList.remove('show');
    overlay.setAttribute('aria-hidden','true');
    popup.setAttribute('aria-hidden','true');
  }
  supportBtn.addEventListener('click', openSupport);
  popupClose.addEventListener('click', closeSupport);
  popupCancel.addEventListener('click', closeSupport);
  overlay.addEventListener('click', closeSupport);

  supportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(supportForm);
    const name = f.get('name') || 'مستخدم';
    const email = f.get('email') || '';
    const message = f.get('message') || '';
    const to = 'gszgxgxvx@gmail.com';
    const subject = `رسالة دعم فني من ${encodeURIComponent(name)}`;
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\n${message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    showNotice('تم تجهيز الرسالة في تطبيق البريد — اضغط إرسال لإرسالها.');
    closeSupport();
    supportForm.reset();
  });

  // =========================
  // زر الموسيقى
  // =========================
  let musicPlaying = false;
  musicBtn.addEventListener('click', () => {
    if (!bgMusic) return;
    if (musicPlaying) {
      bgMusic.pause(); musicPlaying = false; musicBtn.classList.remove('on');
    } else {
      bgMusic.play().catch(()=>{}); musicPlaying = true; musicBtn.classList.add('on');
    }
  });

  // =========================
  // Counters عند التمرير
  // =========================
  const statEls = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(entries=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        animateCounter(ent.target);
        statsObserver.unobserve(ent.target);
      }
    });
  }, {threshold:0.5});
  statEls.forEach(el=> statsObserver.observe(el));

  function animateCounter(el){
    const target = parseInt(el.dataset.target || '0',10);
    const duration = 1600;
    let start = 0; const step = Math.max(1, Math.floor(target/(duration/16)));
    const tick = () => {
      start += step;
      if (start < target) {
        el.textContent = start.toLocaleString('ar-EG');
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('ar-EG');
      }
    };
    tick();
  }

  // =========================
  // Scroll indicator hide on scroll
  // =========================
  let scrolledOnce = false;
  window.addEventListener('scroll', () => {
    if (!scrolledOnce && window.pageYOffset > 80) {
      scrolledOnce = true;
      scrollIndicator && (scrollIndicator.style.opacity = '0');
    }
    const progress = document.querySelector('.progress-bar');
    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (window.scrollY / docH) * 100;
      progress.style.width = Math.min(100,Math.max(0,percent)) + '%';
    }
  });

  // =========================
  // Utility: notification
  // =========================
  let noticeTimer = null;
  function showNotice(text, time = 2500){
    if (!notification) return;
    notification.textContent = text;
    notification.classList.add('show');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(()=> notification.classList.remove('show'), time);
  }

  setTimeout(()=> showNotice('مرحباً — الموقع جاهز! اضغط خلفية لتبديلها أو اضغط على بطاقة لعرض الحساب.'), 800);

  // =========================
  // Accessibility: keyboard close popup
  // =========================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (popup.classList.contains('show')) closeSupport();
    }
  });
});