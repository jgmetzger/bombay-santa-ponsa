/* BOMBAY — CREAM BODY SCRIPTS */
document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 960;
  const layers = document.querySelectorAll('.depth-layer');
  const hero = document.getElementById('home');

  if (!isMobile) {
    let tx=0,ty=0,cx=0,cy=0;
    document.addEventListener('mousemove',e=>{tx=(e.clientX/window.innerWidth-.5)*2;ty=(e.clientY/window.innerHeight-.5)*2});
    (function p(){
      cx+=(tx-cx)*.05;cy+=(ty-cy)*.05;
      const r=hero.getBoundingClientRect(),sp=Math.max(0,Math.min(1.5,-r.top/r.height));
      layers.forEach(l=>{const ms=parseFloat(l.dataset.mouse)||0,ss=parseFloat(l.dataset.scroll)||0;l.style.transform=`translate3d(${cx*ms*600}px,${cy*ms*600+sp*ss*-400}px,0)`});
      requestAnimationFrame(p);
    })();
  }
  if(isMobile){window.addEventListener('scroll',()=>{const r=hero.getBoundingClientRect(),sp=Math.max(0,Math.min(1.5,-r.top/r.height));layers.forEach(l=>{const ss=parseFloat(l.dataset.scroll)||0;l.style.transform=`translate3d(0,${sp*ss*-250}px,0)`})},{passive:true})}

  const cv=document.getElementById('emberCanvas'),ctx=cv.getContext('2d');let em=[];
  function rs(){cv.width=window.innerWidth;cv.height=window.innerHeight}rs();window.addEventListener('resize',rs);
  class E{constructor(s){this.r(s)}r(s){this.x=Math.random()*cv.width;this.y=s?Math.random()*cv.height:cv.height+10;this.sz=Math.random()*2+.8;this.sy=-(Math.random()*.5+.1);this.sx=(Math.random()-.5)*.3;this.o=Math.random()*.25+.08;this.l=1;this.d=Math.random()*.002+.001;const c=['#D4A853','#C1440E','#E8960C','#B8941F'];this.c=c[Math.floor(Math.random()*c.length)];this.w=Math.random()*Math.PI*2;this.ws=Math.random()*.01+.005}u(){this.y+=this.sy;this.w+=this.ws;this.x+=this.sx+Math.sin(this.w)*.2;this.l-=this.d;if(this.l<=0||this.y<-20)this.r(false)}dr(){ctx.save();ctx.globalAlpha=this.o*this.l;ctx.fillStyle=this.c;ctx.shadowColor=this.c;ctx.shadowBlur=this.sz*2;ctx.beginPath();ctx.arc(this.x,this.y,this.sz,0,Math.PI*2);ctx.fill();ctx.restore()}}
  for(let i=0;i<(isMobile?5:12);i++)em.push(new E(true));
  (function el(){ctx.clearRect(0,0,cv.width,cv.height);em.forEach(e=>{e.u();e.dr()});requestAnimationFrame(el)})();

  const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),parseInt(e.target.dataset.delay)||0);obs.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.anim').forEach(el=>obs.observe(el));

  // Watermark parallax — moves slower than scroll for depth
  const watermarks = document.querySelectorAll('.section-watermark');
  function updateWatermarks() {
    watermarks.forEach(wm => {
      const parent = wm.parentElement;
      const rect = parent.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * -120;
      // Preserve horizontal centering for wm-top-center
      if (wm.classList.contains('wm-top-center')) {
        wm.style.transform = `translateX(-50%) translateY(${offset}px)`;
      } else if (wm.classList.contains('wm-bottom-left')) {
        wm.style.transform = `translateY(${offset}px)`;
      } else {
        wm.style.transform = `translateY(calc(-50% + ${offset}px))`;
      }
    });
    requestAnimationFrame(updateWatermarks);
  }
  updateWatermarks();

  window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60),{passive:true});

  const tg=document.getElementById('navToggle'),lk=document.getElementById('navLinks'),nv=document.getElementById('nav');
  tg.addEventListener('click',()=>{tg.classList.toggle('active');lk.classList.toggle('open');nv.classList.toggle('menu-open');document.body.style.overflow=lk.classList.contains('open')?'hidden':''});
  lk.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{tg.classList.remove('active');lk.classList.remove('open');nv.classList.remove('menu-open');document.body.style.overflow=''}));

  document.querySelectorAll('.filter').forEach(b=>{b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;document.querySelectorAll('.dish').forEach((d,i)=>{if(f==='all'||d.dataset.cat===f){d.classList.remove('hidden');d.style.opacity='0';d.style.transform='translateY(16px)';setTimeout(()=>{d.style.transition='opacity .35s,transform .35s';d.style.opacity='1';d.style.transform='translateY(0)'},i*50)}else d.classList.add('hidden')})})});

  document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}})});

  const di=document.querySelector('input[type="date"]');if(di){const d=new Date().toISOString().split('T')[0];di.value=d;di.min=d}
});

// No reservation form — bookings via phone
