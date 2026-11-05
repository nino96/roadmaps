const SOURCES = window.ROADMAP_DATA.sources;
const SIGNALS = window.ROADMAP_DATA.signals;
const MONTHS = window.ROADMAP_DATA.months;
const REPO_TREE = window.ROADMAP_DATA.repoTree;

const memoryStore = {};
function storageGet(k){try{return localStorage.getItem(k)}catch(e){return memoryStore[k] ?? null}}
function storageSet(k,v){try{localStorage.setItem(k,v)}catch(e){memoryStore[k]=v}}
function storageRemove(k){try{localStorage.removeItem(k)}catch(e){delete memoryStore[k]}}
function doneKey(id){return "aiRoadmapDone:"+id}
function isDone(id){return storageGet(doneKey(id))==="1"}

function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function srcLink(k,label="Source"){
  const s=SOURCES[k]; if(!s) return "";
  return `<a href="${s.url}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
}
document.getElementById("tree").textContent=REPO_TREE;

function renderSignals(){
  document.getElementById("signals").innerHTML=SIGNALS.map(x=>`
    <article class="card signal">
      <div><span class="date">${esc(x.date)}</span> <span class="tag">${esc(x.kind)}</span></div>
      <h3>${esc(x.title)}</h3><p>${esc(x.why)}</p>
      <p class="consequence"><b>Roadmap consequence:</b> ${esc(x.consequence)}</p>
      <div class="sourceLink">${srcLink(x.source, SOURCES[x.source].org)}</div>
    </article>`).join("");
}

let activeTrack="All";
function matchMonth(m){
  const q=document.getElementById("search").value.trim().toLowerCase();
  const trackOk=activeTrack==="All" || m.tracks.includes(activeTrack);
  const hay=[m.month,m.title,m.phase,m.objective,...m.tracks,...m.ideas.flat(),...m.skip].join(" ").toLowerCase();
  return trackOk && (!q || hay.includes(q));
}
function renderNodes(){
  const root=document.getElementById("nodes");
  root.innerHTML=MONTHS.map((m,i)=>{
    const hidden=!matchMonth(m);
    return `<div class="monthrow" data-id="${m.id}" style="${hidden?"display:none":""}">
      <span class="num">${String(i+1).padStart(2,"0")}</span>
      <span class="dot"></span>
      <article class="node ${isDone(m.id)?"done":""}" tabindex="0" role="button" aria-label="${esc(m.month+" "+m.title)}" data-open="${m.id}">
        <div class="month">${esc(m.month)} • ${esc(m.phase)}</div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.objective)}</p>
        <div class="meta"><span class="tag">${esc(m.hours)}</span>${m.tracks.slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
      </article>
    </div>`}).join("");
  document.querySelectorAll("[data-open]").forEach(el=>{
    el.onclick=()=>openMonth(el.dataset.open);
    el.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openMonth(el.dataset.open)}};
  });
  updateProgress();
}
function itemPair(x,cls="idea"){return `<div class="${cls}"><b>${esc(x[0])}</b><br><span>${esc(x[1])}</span></div>`}
function renderReading(x){
  const [name,time,take,source]=x; const s=SOURCES[source];
  return `<div class="readitem"><div><b><a href="${s.url}" target="_blank" rel="noopener">${esc(name)} ↗</a></b><div class="take">${esc(take)}</div></div><span class="time">${esc(time)}</span></div>`
}
function renderProject(p){
  return `<div class="project"><div class="phead"><b>${esc(p.name)}</b><span><span class="value">${esc(p.value)}</span> · <span class="time">${esc(p.time)}</span></span></div>
    <ol>${p.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div>`;
}
function openMonth(id){
  const m=MONTHS.find(x=>x.id===id); if(!m)return;
  document.getElementById("drawerMonth").textContent=m.month+" • "+m.phase+" • "+m.hours;
  document.getElementById("drawerTitle").textContent=m.title;
  const practice=m.practitioner.map(x=>`<div class="practice"><b>${esc(x[0])}</b><p>${esc(x[1])}</p>${srcLink(x[2],SOURCES[x[2]].org)}</div>`).join("");
  document.getElementById("drawerBody").innerHTML=`
    <div class="objective"><b>Objective</b><br>${esc(m.objective)}</div>
    <section class="dsection"><h3>1 · Important ideas</h3>${m.ideas.map(x=>itemPair(x)).join("")}</section>
    <section class="dsection"><h3>2 · Practitioner evidence</h3>${practice}</section>
    <section class="dsection"><h3>3 · Prioritized reading / watch list</h3>${m.reading.map(renderReading).join("")}</section>
    <section class="dsection"><h3>4 · Hands-on work — in value order</h3>${m.projects.map(renderProject).join("")}</section>
    <section class="dsection"><h3>5–8 · Monthly focus</h3><div class="focusgrid">
      <div class="focus"><b>Agentic-coding skill</b><br><span>${esc(m.coding_skill[0])}: ${esc(m.coding_skill[1])}</span></div>
      <div class="focus"><b>General agent pattern</b><br><span>${esc(m.agent_pattern[0])}: ${esc(m.agent_pattern[1])}</span></div>
      <div class="focus"><b>DevOps improvement</b><br><span>${esc(m.devops[0])}: ${esc(m.devops[1])}</span></div>
      <div class="focus"><b>Homelab increment</b><br><span>${esc(m.homelab[0])}: ${esc(m.homelab[1])}</span></div>
    </div></section>
    <section class="dsection"><h3>9 · Skip this month</h3><div class="skip">${m.skip.map(x=>`<span>${esc(x)}</span>`).join("")}</div></section>
    <section class="dsection"><h3>10 · Suggested 4–6 hour schedule</h3><div class="schedule">${m.schedule.map(x=>`<b>${esc(x[0])}</b><span>${esc(x[1])}</span>`).join("")}</div></section>
    <section class="dsection"><div class="stretch"><b>Optional stretch:</b> ${esc(m.stretch)}</div></section>
    <section class="dsection"><div class="checkpoint"><b>Exit checkpoint:</b> ${esc(m.checkpoint)}</div></section>
    <div class="drawerActions"><button class="btn primary" id="markDone">${isDone(id)?"Mark incomplete":"Mark month complete"}</button><button class="btn" id="printMonth">Print / save PDF</button></div>`;
  document.getElementById("markDone").onclick=()=>{
    storageSet(doneKey(id),isDone(id)?"0":"1"); renderNodes(); openMonth(id);
  };
  document.getElementById("printMonth").onclick=()=>window.print();
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
}
function closeDrawer(){document.getElementById("drawer").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
function updateProgress(){
  const n=MONTHS.filter(m=>isDone(m.id)).length;
  document.getElementById("progressText").textContent=`${n} / ${MONTHS.length} complete`;
  document.getElementById("progressFill").style.width=(100*n/MONTHS.length)+"%";
}
document.getElementById("close").onclick=closeDrawer;
document.getElementById("overlay").onclick=closeDrawer;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer()});
document.getElementById("search").addEventListener("input",renderNodes);
document.querySelectorAll(".track").forEach(b=>b.onclick=()=>{
  activeTrack=b.dataset.track;document.querySelectorAll(".track").forEach(x=>x.classList.toggle("active",x===b));renderNodes();
});
document.getElementById("resetProgress").onclick=()=>{MONTHS.forEach(m=>storageRemove(doneKey(m.id)));renderNodes()};
renderSignals();renderNodes();
