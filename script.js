const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

document.documentElement.dataset.theme = localStorage.getItem("portfolio-theme") || "dark";
$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
});

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width = `${(scrollY / h) * 100}%`;
  $("#nav").classList.toggle("scrolled", scrollY > 30);
}, {passive:true});

const observer = new IntersectionObserver(entries => entries.forEach(e => {
  if(e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
}), {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

const skills = {
  mobile: {title:"Mobile engineering", desc:"My strongest area — building maintainable React Native experiences and solving production UI/performance problems.", items:[["React Native","Core"],["TypeScript","Core"],["Redux Toolkit","State"],["REST APIs","Data"],["Deep Linking","Platform"],["Push Notifications","Platform"],["Performance Optimization","Focus"],["Native Modules","Learning"]]},
  frontend: {title:"Frontend", desc:"I care about component architecture, responsive UI and interactions that make an interface feel fast.", items:[["JavaScript","Core"],["React","Core"],["HTML / CSS","Core"],["Bootstrap","Used"],["Responsive UI","Focus"],["Animations","Focus"]]},
  backend: {title:"Backend & data", desc:"Comfortable working across APIs and backend systems when the product needs more than the client.", items:[["Node.js","Used"],["Express","Used"],["MongoDB","Used"],["Python","Learning"],["FastAPI","Learning"],["REST APIs","Core"]]},
  ai: {title:"AI / currently learning", desc:"Exploring how LLMs can become useful product features rather than just demos.", items:[["LLMs","Learning"],["RAG","Learning"],["Vector Search","Learning"],["FastAPI","Learning"],["LangChain","Learning"],["Transformers","Learning"],["Docker","Learning"],["AWS","Learning"]]}
};
function renderSkills(key="mobile"){
  const s=skills[key];
  $("#skillPanel").innerHTML=`<h3>${s.title}</h3><p>${s.desc}</p><div class="skill-list">${s.items.map(x=>`<span class="skill-pill">${x[0]} <small>${x[1]}</small></span>`).join("")}</div>`;
}
renderSkills();
$$(".skill-tab").forEach(b=>b.addEventListener("click",()=>{$$(".skill-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderSkills(b.dataset.skill)}));

$$(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  $$(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
  const f=btn.dataset.filter;
  $$(".project-card").forEach(card=>card.classList.toggle("hide-card", f!=="all" && card.dataset.type!==f));
}));

const projects = {
  vi:{type:"Enterprise · Mobile",title:"Vodafone Idea (Vi)",desc:"Production React Native work focused on customer-facing mobile experiences, API-driven screens and smooth interaction flows. The project involved state management, deep linking, push notifications, performance optimization and production debugging.",tags:["React Native","Redux Toolkit","REST APIs","Performance","Deep Linking","Push Notifications"]},
  ai:{type:"Learning project",title:"AI Recharge Assistant",desc:"An AI-focused project exploring how natural-language intent can be converted into useful recharge actions. The learning stack includes FastAPI, LLMs, RAG and vector search.",tags:["FastAPI","OpenAI","LLM","Intent Detection","RAG","Vector Search"]},
  meet:{type:"Web · Realtime",title:"Google Meet Clone",desc:"A video-conferencing experiment built around realtime communication. WebRTC handles media and Socket.IO supports realtime signaling/events, with a Python backend experiment.",tags:["WebRTC","Socket.IO","Python","JavaScript"],images:["Desktop View.jpg","meetdemo.jpg"]},
  sorting:{type:"Web · JavaScript",title:"Sorting Visualizer",desc:"An interactive learning project that visualizes sorting algorithms and compares their execution time. JavaScript powers the algorithm animation and UI effects.",tags:["JavaScript","Algorithms","Animation","HTML","CSS"],images:["sorting.jpeg"]},
  audio:{type:"Full Stack",title:"Audio Book Platform",desc:"An audio-book application where I worked on backend functionality and APIs. The project uses a React client with Node.js, Express and MongoDB.",tags:["React","Redux","Node.js","Express","MongoDB"],images:["audio.jpeg"]}
};

$$(".project-card").forEach(card=>card.addEventListener("click",()=>{
  const p=projects[card.dataset.project];
  $("#modalContent").innerHTML=`<div class="modal-body"><span class="project-type">${p.type}</span><h2>${p.title}</h2><p>${p.desc}</p><div class="modal-pills">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div>${(p.images||[]).map(i=>`<img src="${i}" alt="${p.title} preview">`).join("")}</div>`;
  $("#projectModal").classList.add("open"); $("#projectModal").setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}));
$$("[data-close]").forEach(x=>x.addEventListener("click",closeModal));
function closeModal(){ $("#projectModal").classList.remove("open");$("#projectModal").setAttribute("aria-hidden","true");document.body.style.overflow=""; }
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

$$(".magnetic").forEach(el=>el.addEventListener("mousemove",e=>{
  const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
  el.style.transform=`translate(${x*.08}px,${y*.08}px)`;
}));
$$(".magnetic").forEach(el=>el.addEventListener("mouseleave",()=>el.style.transform=""));

$("#year").textContent=new Date().getFullYear();
