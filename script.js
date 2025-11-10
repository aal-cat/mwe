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
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${h.img}" alt="${h.name}">
