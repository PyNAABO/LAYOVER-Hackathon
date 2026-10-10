(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e){return`/`+e},n={},r=function(e){return e.pathname.endsWith(`.css`)},i=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},a=function(a,o,s){let c=Promise.resolve();if(o&&o.length>0){let a,l=document.querySelector(`meta[property=csp-nonce]`),u=l?.nonce||l?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}c=d(o.map(o=>{o=t(o,s);let c=f(o),l=r(c);return i(n,c.href,()=>{if(a===void 0){a={all:new Set,styles:new Set};let e=document.getElementsByTagName(`link`);for(let t=e.length-1;t>=0;t--){let n=e[t];a.all.add(n.href),n.rel===`stylesheet`&&a.styles.add(n.href)}}if((l?a.styles:a.all).has(c.href))return;let t=document.createElement(`link`);if(t.rel=l?`stylesheet`:e,l||(t.as=`script`),t.crossOrigin=``,t.href=c.href,u&&t.setAttribute(`nonce`,u),document.head.appendChild(t),l)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${c}`)))})})}).filter(e=>e!==void 0))}function l(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(e=>{for(let t of e||[])t.status===`rejected`&&l(t.reason);return a().catch(l)})},o=`true`,s=`false`,c=o===`true`,l=s===`true`;function u(e={}){let{immediate:t=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:i,onRegistered:o,onRegisteredSW:s,onRegisterError:u}=e,d,f,p,m=async(e=!0)=>{await f,c||p?.()};async function h(){if(`serviceWorker`in navigator){if(d=await a(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[]).then(({Workbox:e})=>new e(`/sw.js`,{scope:`/`,type:`classic`})).catch(e=>{u?.(e)}),!d)return;if(p=()=>{d?.messageSkipWaiting()},!l){if(c)d.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(n?n():window.location.reload())}),d.addEventListener(`installed`,e=>{e.isUpdate||i?.()});else{let e=!1,t=()=>{e=!0,d?.addEventListener(`controlling`,e=>{e.isUpdate&&(n?n():window.location.reload())}),r?.()};d.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&i?.():n.isExternal?t():!e&&i?.():n.isUpdate||i?.()}),d.addEventListener(`waiting`,t)}}d.register({immediate:t}).then(e=>{s?s(`/sw.js`,e):o?.(e)}).catch(e=>{u?.(e)})}}return f=h(),m}var d=[{name:`Emirates — Saver`,allowanceKg:30,note:`typical`},{name:`Qatar Airways`,allowanceKg:25,note:`typical`},{name:`Etihad`,allowanceKg:23,note:`typical`},{name:`Oman Air`,allowanceKg:30,note:`typical`},{name:`Air India`,allowanceKg:25,note:`typical`},{name:`Air India Express`,allowanceKg:20,note:`typical`},{name:`IndiGo Intl`,allowanceKg:20,note:`typical`},{name:`SpiceJet Intl`,allowanceKg:20,note:`typical`}],f=0;function p(e,t,n,r){return{id:`g${Date.now()}-${f++}`,name:e,weightKg:t,priority:n,emoji:r}}function m(){return[p(`Medjool dates`,2,5,`🌴`),p(`Spice box`,1.5,5,`🌶️`),p(`Perfume`,.5,4,`🧴`),p(`Chocolates`,1,4,`🍫`),p(`Dry fruits`,1,4,`🥜`),p(`Abaya`,1.2,3,`🥻`),p(`Mixer grinder`,5,3,`🔌`),p(`Kids toys`,.8,3,`🧸`),p(`Rice cooker`,4,2,`🍚`),p(`Steel dinner set`,6,2,`🍽️`)]}function h(e){return e.weightKg<=2?`Light enough for carry-on?`:e.weightKg<=5?`Ship separately or gift on arrival?`:`Buy this in Kerala instead?`}function g(e,t){let n=Math.max(0,Math.round(t*10)),r=e.length,i=e.map(e=>Math.max(0,Math.round(e.weightKg*10))),a=e.map((e,t)=>e.priority*1e5-i[t]),o=Array.from({length:r+1},()=>Array(n+1).fill(0));for(let e=1;e<=r;e++)for(let t=0;t<=n;t++)if(o[e][t]=o[e-1][t],i[e-1]<=t){let n=o[e-1][t-i[e-1]]+a[e-1];n>o[e][t]&&(o[e][t]=n)}let s=[],c=[],l=n;for(let t=r;t>=1;t--)o[t][l]===o[t-1][l]?c.unshift(e[t-1]):(s.unshift(e[t-1]),l-=i[t-1]);return{packed:s,leftOut:c,totalKg:s.reduce((e,t)=>e+t.weightKg,0)}}u({immediate:!0});async function _(e){let t=URL.createObjectURL(e);try{let e=await new Promise((e,n)=>{let r=new Image;r.onload=()=>e(r),r.onerror=()=>n(Error(`image decode failed`)),r.src=t}),n=Math.min(1,320/Math.max(e.width,e.height)),r=document.createElement(`canvas`);return r.width=Math.max(1,Math.round(e.width*n)),r.height=Math.max(1,Math.round(e.height*n)),r.getContext(`2d`).drawImage(e,0,0,r.width,r.height),r.toDataURL(`image/jpeg`,.82)}catch{return t}}var v=m(),y=5,b=null,x=[],S=``,C=document.getElementById(`app`);function w(){return b??d[y].allowanceKg}function T(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function E(e){return e.photo?`<img src="${e.photo}" alt="">`:`<span class="emoji">${e.emoji??`🎁`}</span>`}function D(){let e=w(),{packed:t,leftOut:n,totalKg:r}=g(v,e),i=[...t].sort((e,t)=>O(e.id)-O(t.id)),a=e>0?Math.min(100,r/e*100):0,o=v.reduce((e,t)=>e+t.weightKg,0)-r;C.innerHTML=`
  <header>
    <div>
      <div class="route">DXB → CCJ · one bag</div>
      <h1>Gulf Box</h1>
      <p>Fit every gift into one baggage allowance.</p>
    </div>
    <button id="installBtn" hidden>Install app</button>
  </header>

  <section class="card">
    <h2>Allowance</h2>
    <div class="allow-grid">
      <label class="fld"><span>Airline allowance</span>
      <select id="airline">
        ${d.map((e,t)=>`<option value="${t}" ${t===y&&b===null?`selected`:``}>${T(e.name)} — ${e.allowanceKg} kg</option>`).join(``)}
      </select>
      </label>
      <label class="fld"><span>Or your own limit</span>
      <span class="kgwrap"><input id="customKg" type="number" min="0" step="0.5" placeholder="kg" value="${b??``}"> kg</span>
      </label>
    </div>
    <div class="bar"><div class="fill" style="width:${a}%"></div></div>
    <p class="total">${r.toFixed(1)} / ${e.toFixed(1)} kg packed
    ${n.length?`· ${o.toFixed(1)} kg left out`:`· ${(e-r).toFixed(1)} kg to spare <span class="stamp ok">All packed</span>`}</p>
    <p class="fine">Typical economy allowances — confirm against your e-ticket.</p>
  </section>

  <section class="case">
    <div class="handle"></div>
    <div class="case-body">
    <h2>Suitcase (${i.length})</h2>
    <div class="grid" id="grid">
      ${i.map(e=>`<div class="tile" draggable="true" data-id="${e.id}">${E(e)}<b>${T(e.name)}</b><span>${e.weightKg.toFixed(1)} kg · ★${e.priority}</span></div>`).join(``)||`<p class="empty">Nothing fits — raise the limit or drop an item.</p>`}
    </div>
    </div>
  </section>

  <section class="card">
    <h2>Gifts (${v.length})</h2>
    <div class="addrow">
      <button type="button" class="pick ${S?`has`:``}" id="pickBtn">
        ${S?`<img src="${S}" alt=""><b>Change</b>`:`<span class="cam">📷</span><b>Photo</b>`}
      </button>
      <input id="photo" type="file" accept="image/*" hidden>
      <input id="gname" placeholder="Gift name" maxlength="40">
      <input id="gweight" type="number" min="0.1" step="0.1" placeholder="kg">
      <label>★<input id="gprio" type="range" min="1" max="5" value="3"><span id="gprioVal">3</span></label>
      <button id="addBtn">Add</button>
      <button id="demoBtn" class="ghost">Reset demo</button>
    </div>
    <ul class="gifts">
      ${v.map(e=>`<li data-id="${e.id}">
        <span class="thumb">${E(e)}</span>
        <input class="nm" value="${T(e.name)}" maxlength="40">
        <input class="wt" type="number" min="0.1" step="0.1" value="${e.weightKg}">
        <label>★<input class="pr" type="range" min="1" max="5" value="${e.priority}"><span class="prv">${e.priority}</span></label>
        <button class="rm" title="Remove">✕</button>
      </li>`).join(``)}
    </ul>
  </section>

  ${n.length?`<section class="card warn">
    <div class="stamp">Not packed</div>
    <h2>Left out (${n.length})</h2>
    <ul class="leftout">
      ${n.map(e=>`<li><span class="thumb">${E(e)}</span><div><b>${T(e.name)}</b> — ${e.weightKg.toFixed(1)} kg<span class="sug">${T(h(e))}</span></div></li>`).join(``)}
    </ul>
  </section>`:``}

  <footer>Offline-first · your photos never leave this device.</footer>`,k(i)}function O(e){let t=x.indexOf(e);return t===-1?x.length+e.charCodeAt(0):t}function k(e){let t=document.getElementById(`airline`);t.onchange=()=>{y=Number(t.value),b=null,D()};let n=document.getElementById(`customKg`);n.onchange=()=>{let e=parseFloat(n.value);b=Number.isFinite(e)&&e>0?e:null,D()};let r=document.getElementById(`gprio`);r.oninput=()=>document.getElementById(`gprioVal`).textContent=r.value;let i=document.getElementById(`photo`);i.onchange=async()=>{let e=i.files?.[0];e?(S.startsWith(`blob:`)&&URL.revokeObjectURL(S),S=await _(e),D()):S&&(S=``,D())},document.getElementById(`pickBtn`).onclick=()=>i.click(),document.getElementById(`addBtn`).onclick=()=>{let e=document.getElementById(`gname`).value.trim(),t=parseFloat(document.getElementById(`gweight`).value);if(!e||!(t>0))return;let n=p(e,Math.round(t*10)/10,Number(r.value));S?(n.photo=S,S=``,i.value=``):n.emoji=`🎁`,v.push(n),document.getElementById(`gname`).value=``,document.getElementById(`gweight`).value=``,D()},document.getElementById(`demoBtn`).onclick=()=>{v=m(),x=[],b=null,y=5,S=``,D()},document.querySelectorAll(`ul.gifts li`).forEach(e=>{let t=e.dataset.id,n=v.find(e=>e.id===t);e.querySelector(`.nm`).onchange=e=>{n.name=e.target.value.trim()||n.name,D()},e.querySelector(`.wt`).onchange=e=>{let t=parseFloat(e.target.value);t>0&&(n.weightKg=Math.round(t*10)/10),D()},e.querySelector(`.pr`).oninput=e=>{n.priority=Number(e.target.value),D()},e.querySelector(`.pr`).onchange=e=>{n.priority=Number(e.target.value),D()},e.querySelector(`.rm`).onclick=()=>{v=v.filter(e=>e.id!==t),D()}});let a=document.getElementById(`grid`),o=``;a.querySelectorAll(`.tile`).forEach(t=>{t.ondragstart=()=>o=t.dataset.id,t.ondragover=e=>e.preventDefault(),t.ondrop=n=>{n.preventDefault();let r=e.map(e=>e.id).filter(e=>e!==o),i=e.findIndex(e=>e.id===t.dataset.id);r.splice(i<0?r.length:i,0,o),x=r,D()}});let s=document.getElementById(`installBtn`),c=window;s.hidden=!c.__deferredInstall,s.onclick=()=>c.__deferredInstall?.prompt()}window.__gb={gifts:()=>v,limit:w},window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),window.__deferredInstall=e;let t=document.getElementById(`installBtn`);t&&(t.hidden=!1)}),D();