/* script.js - ديناميكي ومُحسَّن
   ضع صور 1.jpg .. 11.jpg في نفس مجلد index.html أو غيّر المسارات في المصفوفة أدناه.
   البريد المستهدف للدعم: gszgxgxvx@gmail.com
   إذا أردت إرسال تلقائي عبر Formspree ضع رابط endpoint في FORM_ENDPOINT أدناه
*/

document.addEventListener('DOMContentLoaded', () => {
  // CONFIG
  const FORM_ENDPOINT = ''; // لو عندك formspree endpoint ضعها هنا، مثال: 'https://formspree.io/f/xxxxxx'
  const SUPPORT_EMAIL = 'gszgxgxvx@gmail.com';

  // عناصر DOM
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

  // HEROES - من كودك الأصلي مع روابط/آيدي المطلوبة
  const heroes = [
    { img:'1.jpg',  name:'عبدالله',        rank:'😺E=mc²😺',                  desc:'القائد الأعظم والدماغ المدبر.', link:'https://www.tiktok.com/@124hht', idText:'124hht' },
    { img:'2.jpg',  name:'عبيدة',          rank:'كاريزما إلى الحد الأقصى',     desc:'يتمتع بكاريزما طاغية.',       link:'https://www.tiktok.com/@level.201', idText:'level.201' },
    { img:'3.jpg',  name:'جاسم',           rank:'مازوخي',                      desc:'محارب لا يعرف الخوف.',         link:'https://www.tiktok.com/@bachira_402', idText:'bachira_402' },
    { img:'4.jpg',  name:'محمد',           rank:'المحارب الصامت',               desc:'يتحرك في صمت ويضرب بقوة.',    link:'https://www.tiktok.com/@.999qaa', idText:'.999qaa' },
    { img:'5.jpg',  name:'غير مهم',        rank:'@red908287',                  desc:'خبير في التكتيكات الحمراء.',  link:'https://www.tiktok.com/@red908287?_r=1&_t=ZS-91GZ2JWmj4x', idText:'red908287' },
    { img:'6.jpg',  name:'غير مهم',        rank:'@zxaspo',                     desc:'خبير التكنولوجيا والاتصالات.', link:'https://www.tiktok.com/@zxaspo?_r=1&_t=ZS-91GZ5U0JZGp', idText:'zxaspo' },
    { img:'7.jpg',  name:'غير مهم',        rank:'@zorogaming369',              desc:'سيد الألعاب والتكتيكات.',     link:'https://www.tiktok.com/@zorogaming369?_r=1&_t=ZS-91GZ6I3gJPE', idText:'zorogaming369' },
    { img:'8.jpg',  name:'غير مهم',        rank:'@llo.ll2',                    desc:'خبير الشفرات والاتصالات.',    link:'', idText:'llo.ll2' },
    { img:'9.jpg',  name:'غير مهم',        rank:'@nabaa7065',                  desc:'خبيرة الاستخبارات والتخطيط.',  link:'', idText:'nabaa7065' },
    { img:'10.jpg', name:'غير مهم',        rank:'@en18s',                      desc:'متخصص في العمليات الخاصة.',    link:'', idText:'en18s' },
    { img:'11.jpg', name:'غير مهم',        rank:'@memeoyah',                   desc:'سيد الدعاية النفسية.',         link:'', idText:'memeoyah' }
  ];

  // Build cards
  function buildCards(){
    membersGrid.innerHTML = '';
    heroes.forEach((h, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'card-3d';
      wrap.dataset.index = i;
      wrap.innerHTML = `
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
              ${h.link ? `<a class="card-link" href="${h.link}" target="_blank" rel="noopener">تابعني على تيك توك</a>` : `<div class="card-id">ID: <strong>${h.idText}</strong></div>`}
              <button class="copy-btn" data-id="${h.idText}"><i class="fas fa-copy"></i> نسخ الآيدي</button>
            </div>
          </div>
        </div>
      `;
      membersGrid.appendChild(wrap);
      // entrance
      setTimeout(()=>{ wrap.style.opacity = '1'; wrap.style.transform = 'translateY(0)'; }, 120 * i);
    });
  }

  buildCards();

  // Stars canvas
  (function initStars(){
    const canvas = starsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles = [];
    const count = Math.max(80, Math.floor((w*h)/50000));
    for (let i=0;i<count;i++){
      particles.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.5+0.2, vx:(Math.random()-0.5)*0.15, vy:(Math.random()*0.2)+0.02, a: Math.random()*0.9+0.1 });
    }
    function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    function draw(){
      ctx.clearRect(0,0,w,h);
      const g = ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)/1.2);
      g.addColorStop(0,'rgba(2,6,16,0)');
      g.addColorStop(1,'rgba(2,6,10,0.6)');
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
      particles.forEach(p=>{
        p.x += p.vx; p.y += p.vy;
        if (p.y>h){ p.y=0; p.x=Math.random()*w; }
        if (p.x<0) p.x = w; if (p.x>w) p.x=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // Smoke/video background toggle
  let usingSmoke = false;
  if (bgSmoke && bgSmoke.querySelector('source') && bgSmoke.querySelector('source').src) {
    bgSmoke.classList.add('active'); usingSmoke = true;
  } else {
    if (bgSmoke) bgSmoke.classList.remove('active');
    starsCanvas.style.opacity = 1;
    usingSmoke = false;
  }

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

  // bg toggle button
  bgToggle.addEventListener('click', () => {
    setBackground(!usingSmoke);
    showNotice(usingSmoke ? 'النجوم مفعل' : 'دخان مفعل');
  });

  setBackground(usingSmoke);

  // Flip cards logic
  membersGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card-3d');
    if (!card) return;
    // ignore clicks on links or copy buttons
    if (e.target.closest('.card-link') || e.target.closest('.copy-btn')) return;
    card.classList.toggle('flipped');
  });

  // hover image zoom
  membersGrid.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.card-3d');
    if (!card) return;
    const img = card.querySelector('.card-img');
    if (img) img.style.transform = 'scale(1.06)';
  });
  membersGrid.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.card-3d');
    if (!card) return;
    const img = card.querySelector('.card-img');
    if (img) img.style.transform = 'scale(1)';
  });

  // copy ID button (on back face)
  membersGrid.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const text = btn.dataset.id || '';
    if (!text) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      showNotice('تم نسخ الآيدي: ' + text);
    } catch (err) {
      console.error('copy failed', err);
      showNotice('فشل النسخ');
    }
  });

  // Support popup
  function openSupport(){
    overlay.classList.add('show'); popup.classList.add('show');
    overlay.setAttribute('aria-hidden','false'); popup.setAttribute('aria-hidden','false');
  }
  function closeSupport(){
    overlay.classList.remove('show'); popup.classList.remove('show');
    overlay.setAttribute('aria-hidden','true'); popup.setAttribute('aria-hidden','true');
  }
  supportBtn.addEventListener('click', openSupport);
  popupClose && popupClose.addEventListener('click', closeSupport);
  popupCancel && popupCancel.addEventListener('click', closeSupport);
  overlay && overlay.addEventListener('click', closeSupport);

  supportForm && supportForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(supportForm);
    const name = f.get('name') || 'مستخدم';
    const email = f.get('email') || '';
    const message = f.get('message') || '';
    // إذا وضعت FORM_ENDPOINT نرسل عبره (Formspree أو أي خدمة)
    if (FORM_ENDPOINT && FORM_ENDPOINT.trim().length > 10) {
      // إرسال عبر fetch
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new URLSearchParams({ name, email, message })
      }).then(res => {
        if (res.ok) {
          showNotice('تم إرسال الرسالة — شكراً لك');
          supportForm.reset(); closeSupport();
        } else {
          showNotice('فشل الإرسال عبر الخادم، سيتم فتح البريد لارسال يدوي');
          openMailClient(name, email, message);
        }
      }).catch(err => {
        console.error(err);
        showNotice('فشل الإرسال — فتح تطبيق البريد للمحاولة');
        openMailClient(name, email, message);
      });
    } else {
      // fallback: mailto
      openMailClient(name, email, message);
    }
  });

  function openMailClient(name, email, message){
    const subject = encodeURIComponent(`رسالة دعم فني من ${name}`);
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\n${message}`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    showNotice('تم تجهيز الرسالة في تطبيق البريد — اضغط إرسال لإرسالها.');
    closeSupport();
    supportForm.reset();
  }

  // music toggle
  let musicPlaying = false;
  musicBtn.addEventListener('click', () => {
    if (!bgMusic) return;
    if (musicPlaying) {
      bgMusic.pause(); musicPlaying = false; musicBtn.classList.remove('on');
    } else {
      bgMusic.play().catch(()=>{}); musicPlaying = true; musicBtn.classList.add('on');
    }
  });

  // counters animation
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

  // notification util
  let noticeTimer = null;
  function showNotice(text, time = 2500){
    if (!notification) return;
    notification.textContent = text;
    notification.classList.add('show');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(()=> notification.classList.remove('show'), time);
  }

  // initial welcome
  setTimeout(()=> showNotice('مرحباً — الموقع جاهز! اضغط على بطاقة لتقلبها أو زر الخلفية لتبديلها.'), 900);

  // ESC to close popup
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSupport(); });

});