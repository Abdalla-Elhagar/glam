const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let cart={};try{cart=JSON.parse(localStorage.getItem("glamcart")||"{}")}catch(e){}
Object.keys(cart).forEach(i=>{if(!PRODUCTS[i])delete cart[i]});
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const priceOf=p=>p.sale>0&&p.sale<p.p?p.sale:p.p;
const onSale=p=>p.sale>0&&p.sale<p.p;
const total=()=>Object.entries(cart).reduce((s,[i,q])=>s+priceOf(PRODUCTS[i])*q,0);
const cn=id=>CATS.find(c=>c.id==id).n;
const fb=i=>{i.outerHTML=`<span class="fe">${i.dataset.e}</span>`};
const im=(p,w)=>`<img loading="lazy" src="${img(p,w)}" alt="${p.n}" data-e="${p.e}" onerror="fb(this)">`;
function badge(bump){const b=$("#cnt");b.textContent=count();if(bump){b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}}
function save(bump){try{localStorage.setItem("glamcart",JSON.stringify(cart))}catch(e){}badge(bump)}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)}
function add(id,n=1){cart[id]=(cart[id]||0)+n;if(cart[id]<=0)delete cart[id];save(true);if(n>0)toast("✅ اتضاف للسلة: "+PRODUCTS[id].n)}

const PAGES=[["index","الرئيسية"],["products","المنتجات"],["offers","العروض"],["categories","الأقسام"],["contact","تواصل معنا"]];
function layout(){
  const pg=document.body.dataset.page;
  document.body.insertAdjacentHTML("afterbegin",`<div id="loader"><div class="lw"><div class="ring"></div><div class="lg">Glam</div></div><p>GLAM STORE</p></div>
  <nav class="nav"><div class="wrap"><a class="brand" href="index.html">Glam Store</a>
    <div class="links" id="links">${PAGES.map(p=>`<a href="${p[0]}.html" class="${pg==p[0]?"on":""}">${p[1]}</a>`).join("")}</div>
    <div class="acts"><a class="cartb ${pg=="cart"?"on":""}" href="cart.html" aria-label="السلة">🛒<span id="cnt">0</span></a><button class="burger" id="bg" aria-label="القائمة">☰</button></div></div></nav>`);
  document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap footer-wrap">
    <div class="footer-main">
      <div class="footer-about"><a class="brand" href="index.html">Glam Store</a><p>كل اللي بتحبيه في مكان واحد.<br>اختاري جمالك وسيبي الباقي علينا.</p></div>
      <div class="footer-nav"><h3>روابط سريعة</h3><a href="index.html">الرئيسية</a><a href="products.html">المنتجات</a><a href="offers.html">العروض</a><a href="categories.html">الأقسام</a><a href="contact.html">تواصل معنا</a></div>
      <div class="footer-contact"><h3>محتاجه مساعدة؟</h3><p>إحنا هنا عشان نساعدك ونرد على استفساراتك.</p><a class="footer-wa" href="https://wa.me/${WA}" target="_blank" rel="noopener">💬 كلمينا على واتساب</a></div>
    </div>
    <div class="footer-bottom"><small>© 2026 Glam Store. جميع الحقوق محفوظة</small><span>صُنع بكل حب <b>♥</b></span></div>
  </div></footer>
  <a class="wafab" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="تواصلي معنا على واتساب"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt=""><i>تواصلي معنا</i></a><div id="toast"></div>`);
  $("#bg").onclick=()=>$("#links").classList.toggle("open");
  badge();
  const L=$("#loader"),hide=()=>L.classList.add("hide");
  addEventListener("load",()=>setTimeout(hide,700));addEventListener("pageshow",e=>{if(e.persisted)hide()});
  document.addEventListener("click",e=>{
    const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||a.target||e.ctrlKey||e.metaKey)return;
    const h=a.getAttribute("href");if(!h||h[0]=="#"||/^(https?:|tel:|mailto:)/.test(h))return;
    e.preventDefault();L.classList.remove("hide");setTimeout(()=>location.href=h,450)});
}
function reveal(){const o=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}}),{threshold:.12});
  $$(".rv:not(.in)").forEach((e,i)=>{e.style.transitionDelay=(i%6)*70+"ms";o.observe(e)})}
function tilt(el,m=14){el.onpointermove=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateY(${x*m}deg) rotateX(${-y*m}deg)`};el.onpointerleave=()=>el.style.transform=""}
const card=p=>`<a class="pc rv ${onSale(p)?"sale-card":""}" href="product.html?id=${p.id}"><div class="pi">${onSale(p)?'<span class="sale-tag">عرض</span>':""}${im(p)}</div><div class="pb"><small>${cn(p.c)}</small><h3>${p.n}</h3><div class="pr"><div class="price-set"><b>${priceOf(p)} ج.م</b>${onSale(p)?`<del>${p.p} ج.م</del>`:""}</div><button class="add" aria-label="أضيفي للسلة" onclick="event.preventDefault();add(${p.id})">+</button></div></div></a>`;
const catCard=c=>`<a class="cc rv" href="products.html?c=${c.id}"><img loading="lazy" src="${catImg(c)}" alt="${c.n}" data-e="${c.e}" onerror="fb(this)"><span>${c.e} ${c.n}</span></a>`;
const empty=(t,l)=>`<div class="empty"><div>💗</div><p>${t}</p>${l?`<a class="btn" href="products.html">تسوقي الآن</a>`:""}</div>`;

const P={
  index(){
    $("#stage").innerHTML=CATS.map((c,i)=>{
      const a=2*Math.PI*i/CATS.length-Math.PI/2,x=Math.round(Math.sin(a)*210),y=Math.round(Math.cos(a)*135),
        z=Math.round(Math.cos(a*2)*70),r=Math.round(-Math.sin(a)*16);
      return `<div class="c3" style="--x:${x}px;--y:${y}px;--z:${z}px;--r:${r}deg;--delay:${i*.12}s"><div class="f" style="animation-delay:${i*-1.3}s"><img loading="eager" decoding="async" src="${catImg(c)}" alt="${c.n}" data-e="${c.e}" onerror="fb(this)"></div></div>`;
    }).join("");
    const sc=$("#scene"),st=$("#stage");
    sc.onpointermove=e=>{const r=sc.getBoundingClientRect();st.classList.remove("idle");st.style.setProperty("--ry",((e.clientX-r.left)/r.width-.5)*24+"deg");st.style.setProperty("--rx",-((e.clientY-r.top)/r.height-.5)*14+"deg")};
    sc.onpointerleave=()=>st.classList.add("idle");
    $("#catg").innerHTML=CATS.map(catCard).join("");$("#feat").innerHTML=PRODUCTS.slice(0,8).map(card).join("");
  },
  categories(){$("#catg").innerHTML=CATS.map(catCard).join("")},
  offers(){
    const offers=PRODUCTS.filter(onSale);
    $("#offerGrid").innerHTML=offers.length?offers.map(card).join(""):empty("مفيش عروض متاحة حاليًا",1);
  },
  products(){
    let cur=new URLSearchParams(location.search).get("c")||"all",s="";
    const draw=()=>{$("#chips").innerHTML=[{id:"all",n:"الكل",e:"🛒"},...CATS].map(c=>`<button class="chip ${cur==c.id?"on":""}" data-c="${c.id}">${c.e} ${c.n}</button>`).join("");
      const l=PRODUCTS.filter(p=>(cur=="all"||p.c==cur)&&p.n.toLowerCase().includes(s));
      $("#grid").innerHTML=l.length?l.map(card).join(""):empty("مفيش منتجات بالاسم ده");reveal()};
    $("#chips").onclick=e=>{const b=e.target.closest("[data-c]");if(b){cur=b.dataset.c;draw()}};
    $("#srch").oninput=e=>{s=e.target.value.trim().toLowerCase();draw()};draw();
  },
  product(){
    const id=+new URLSearchParams(location.search).get("id"),p=PRODUCTS[id];
    if(!p){$("#pd").innerHTML=empty("المنتج مش موجود",1);return}
    document.title=p.n+" | Glam Store";let q=1;
    $("#pd").innerHTML=`<div class="pdimg rv" id="pdi">${im(p,800)}</div><div class="pdinfo rv"><small>${cn(p.c)}</small><h1>${p.n}</h1><p>${p.d}</p><div class="pp">${priceOf(p)} ج.م ${onSale(p)?`<del>${p.p} ج.م</del>`:""}</div>
      <div class="qty"><button id="mn">−</button><span id="qv">1</span><button id="pl">+</button></div>
      <div class="bt"><button class="btn" id="ad">🛍️ أضيفي للسلة</button><a class="btn out" href="cart.html">اذهبي للسلة</a></div></div>`;
    tilt($("#pdi"),10);
    $("#mn").onclick=()=>$("#qv").textContent=q=Math.max(1,q-1);$("#pl").onclick=()=>$("#qv").textContent=++q;$("#ad").onclick=()=>add(id,q);
    $("#rel").innerHTML=PRODUCTS.filter(x=>x.c==p.c&&x.id!=id).concat(PRODUCTS.filter(x=>x.c!=p.c)).slice(0,4).map(card).join("");
  },
  cart(){
    const draw=()=>{const k=Object.keys(cart),has=k.length>0;
      $("#cl").innerHTML=has?k.map(i=>{const p=PRODUCTS[i];return `<div class="cr"><a class="ci" href="product.html?id=${i}">${im(p,200)}</a><div class="ct"><h3>${p.n}</h3><b>${priceOf(p)} ج.م</b>${onSale(p)?`<del>${p.p} ج.م</del>`:""}</div>
        <div class="qty"><button data-a="${i}" data-n="-1">−</button><span>${cart[i]}</span><button data-a="${i}" data-n="1">+</button></div><b class="ls">${priceOf(p)*cart[i]} ج.م</b><button class="x" data-r="${i}" aria-label="حذف">✕</button></div>`}).join(""):empty("السلة فاضية، ابدئي اختاري منتجاتك",1);
      $("#side").style.display=has?"":"none";$("#tot").textContent=total()+" ج.م"};
    $("#cl").onclick=e=>{const a=e.target.closest("[data-a]"),r=e.target.closest("[data-r]");
      if(a)add(+a.dataset.a,+a.dataset.n);else if(r){delete cart[r.dataset.r];save(true)}else return;draw()};
    $("#send").onclick=()=>{
      const v=i=>$("#"+i).value.trim(),n=v("fn"),ph=v("fp").replace(/[\s-]/g,""),c=v("fc"),a=v("fa"),nt=v("fnote");
      if(!n||!a||!c){toast("⚠️ املئي الاسم والمحافظة والعنوان");return}
      if(!/^(\+?20|0)?1[0125]\d{8}$/.test(ph)){toast("⚠️ رقم الموبايل غير صحيح");return}
      let m=`🛍️ *طلب جديد من Glam Store*\n🧾 رقم الطلب: GL-${Date.now().toString().slice(-6)}\n\n👤 الاسم: ${n}\n📞 الموبايل: ${ph}\n📍 المحافظة: ${c}\n🏠 العنوان: ${a}\n\n*المنتجات:*\n`;
      Object.entries(cart).forEach(([i,q])=>m+=`• ${PRODUCTS[i].n} × ${q} = ${priceOf(PRODUCTS[i])*q} ج.م\n`);
      m+=`\n💰 *الإجمالي: ${total()} ج.م*`+(nt?`\n📝 ملاحظات: ${nt}`:"");
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(m)}`,"_blank");toast("💬 اتفتح الواتساب، ابعتي الرسالة لتأكيد الطلب");
    };draw();
  },
  contact(){
    $("#cs").onclick=()=>{const n=$("#cn").value.trim(),m=$("#cm").value.trim();if(!n||!m){toast("⚠️ اكتبي اسمك ورسالتك");return}
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent("👤 "+n+"\n"+m)}`,"_blank")};
    $("#wn").textContent=PHONE;
  }
};
layout();(P[document.body.dataset.page]||(()=>{}))();reveal();
