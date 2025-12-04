// script.js - تفاعلات بسيطة
document.addEventListener('DOMContentLoaded', function(){
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.querySelector('.main-nav');
  menuBtn && menuBtn.addEventListener('click', ()=> {
    mainNav.classList.toggle('open');
    if(mainNav.classList.contains('open')){
      mainNav.style.display = 'block';
    } else {
      mainNav.style.display = '';
    }
  });

  // بحث بسيط (عرض ترشيحات)
  const searchInput = document.getElementById('searchInput');
  searchInput && searchInput.addEventListener('input', (e)=>{
    const q = e.target.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card=>{
      const title = card.querySelector('h4').textContent.toLowerCase();
      if(!q || title.includes(q)) card.style.display = '';
      else card.style.display = 'none';
    });
  });
});
