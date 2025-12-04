// إعداد Firebase — ضع بيانات مشروعك هنا
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.getAuth();
const db = firebase.getFirestore();
const storage = firebase.getStorage();

async function login(){
  const email=document.getElementById('email').value;
  const pass=document.getElementById('password').value;
  try{
    await firebase.signInWithEmailAndPassword(auth,email,pass);
    alert("تم تسجيل الدخول");
    loadAdmin();
  }catch(e){ alert(e.message); }
}

async function uploadPDF(){
  const user=firebase.getAuth().currentUser;
  if(!user){ alert("سجل دخول"); return;}
  const file=document.getElementById('pdf').files[0];
  const title=document.getElementById('title').value;
  const ref=firebase.ref(storage,"pdfs/"+file.name);
  await firebase.uploadBytes(ref,file);
  const url=await firebase.getDownloadURL(ref);
  await firebase.addDoc(firebase.collection(db,"manhwa"),{title,url});
  alert("تم الرفع");
}

async function loadList(){
  const q=await firebase.getDocs(firebase.collection(db,"manhwa"));
  const box=document.getElementById('list');
  box.innerHTML="";
  q.forEach(d=>{
    box.innerHTML+=`<div><h3>${d.data().title}</h3><a href="${d.data().url}">تحميل PDF</a></div>`;
  });
}
async function loadAdmin(){
  const q=await firebase.getDocs(firebase.collection(db,"manhwa"));
  const box=document.getElementById('adminList');
  box.innerHTML="";
  q.forEach(d=>{
    box.innerHTML+=`<div><h3>${d.data().title}</h3><a href="${d.data().url}">PDF</a></div>`;
  });
}
document.addEventListener("DOMContentLoaded",loadList);