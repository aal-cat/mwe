const heroes = [
  { name: "عبدالله", title: "😺E=mc²😺", img: "2.jpg", link: "https://www.tiktok.com/@124hht?_r=1&_t=ZS-91HcIekKG8N" },
  { name: "عبيدة", title: "كاريزما إلى الحد الأقصى", img: "1.jpg", link: "https://www.tiktok.com/@level.201?_r=1&_t=ZS-91HcKadGoS7" },
  { name: "جاسم", title: "مازوخي", img: "2.jpg", id: "bachira_402" },
  { name: "محمد", title: "", img: "4.jpg", link: "https://www.tiktok.com/@.999qaa?_r=1&_t=ZS-91HcOmodbtv" },
  { name: "غير مهم", title: "", img: "5.jpg", link: "https://www.tiktok.com/@red908287?_r=1&_t=ZS-91GZ2JWmj4x" },
  { name: "غير مهم", title: "", img: "6.jpg", link: "https://www.tiktok.com/@zxaspo?_r=1&_t=ZS-91GZ5U0JZGp" },
  { name: "غير مهم", title: "", img: "2.jpg", link: "https://www.tiktok.com/@zorogaming369?_r=1&_t=ZS-91GZ6I3gJPE" },
  { name: "غير مهم", title: "", img: "8.jpg", id: "llo.ll2" },
  { name: "غير مهم", title: "", img: "9.jpg", id: "nabaa7065" },
  { name: "غير مهم", title: "", img: "10.jpg", id: "en18s" },
  { name: "غير مهم", title: "", img: "11.jpg", id: "memeoyah" }
];

const grid = document.getElementById("heroesGrid");
heroes.forEach(h => {
  const card = document.createElement("div");
  card.className = "card";
  
  const backContent = h.link 
    ? `<a href="${h.link}" target="_blank" rel="noopener noreferrer" class="link-button">زيارة تيك توك</a>`
    : h.id 
    ? `<div class="discord-id-container">
         <span class="discord-label">Discord ID:</span>
         <button class="copy-id-btn" data-id="${h.id}">
           <span class="id-text">${h.id}</span>
           <span class="copy-icon">📋</span>
         </button>
       </div>`
    : '<p>لا يوجد رابط</p>';
  
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${h.img}" alt="${h.name}">
        <div class="card-content">
          <h2>${h.name}</h2>
          ${h.title ? `<p class="title">${h.title}</p>` : ''}
        </div>
      </div>
      <div class="card-back">
        <h3>${h.name}</h3>
        ${h.title ? `<p class="subtitle">${h.title}</p>` : ''}
        ${backContent}
      </div>
    </div>
  `;
  
  card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('copy-id-btn') && !e.target.closest('.copy-id-btn')) {
      card.classList.toggle('flipped');
    }
  });
  
  grid.appendChild(card);
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-id-btn') || e.target.closest('.copy-id-btn')) {
    const btn = e.target.classList.contains('copy-id-btn') ? e.target : e.target.closest('.copy-id-btn');
    const discordId = btn.dataset.id;
    
    navigator.clipboard.writeText(discordId).then(() => {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span class="id-text">تم النسخ! ✓</span>';
      btn.style.backgroundColor = 'rgba(0, 255, 136, 0.2)';
      btn.style.borderColor = 'rgba(0, 255, 136, 0.5)';
      
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('فشل نسخ المعرف');
    });
  }
});

const bgToggle = document.getElementById("bgToggle");
bgToggle.addEventListener("click", () => {
  document.body.classList.toggle("smoke-bg");
  const isActive = document.body.classList.contains("smoke-bg");
  bgToggle.textContent = isActive ? "إيقاف الخلفية المتحركة" : "تبديل الخلفية";
  bgToggle.style.boxShadow = isActive ? '0 0 20px rgba(0, 255, 255, 0.5)' : '';
});

const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.textContent = "تشغيل الموسيقى";
    musicToggle.style.boxShadow = '';
  } else {
    bgMusic.play().catch(err => console.error("Audio play failed:", err));
    musicToggle.textContent = "إيقاف الموسيقى";
    musicToggle.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
  }
  isPlaying = !isPlaying;
});

const supportForm = document.getElementById('supportForm');
supportForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = supportForm.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'جاري الإرسال...';
  submitBtn.disabled = true;
  
  const formData = {
    name: document.getElementById('supportName').value,
    email: document.getElementById('supportEmail').value,
    message: document.getElementById('supportMessage').value
  };
  
  try {
    const response = await fetch('/send-support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message || 'تم إرسال الرسالة بنجاح!');
      supportForm.reset();
    } else {
      alert(result.error || 'حدث خطأ في إرسال الرسالة');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});
