(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e){return`/`+e},n={},r=function(e){return e.pathname.endsWith(`.css`)},i=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},a=function(a,o,s){let c=Promise.resolve();if(o&&o.length>0){let a,l=document.querySelector(`meta[property=csp-nonce]`),u=l?.nonce||l?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}c=d(o.map(o=>{o=t(o,s);let c=f(o),l=r(c);return i(n,c.href,()=>{if(a===void 0){a={all:new Set,styles:new Set};let e=document.getElementsByTagName(`link`);for(let t=e.length-1;t>=0;t--){let n=e[t];a.all.add(n.href),n.rel===`stylesheet`&&a.styles.add(n.href)}}if((l?a.styles:a.all).has(c.href))return;let t=document.createElement(`link`);if(t.rel=l?`stylesheet`:e,l||(t.as=`script`),t.crossOrigin=``,t.href=c.href,u&&t.setAttribute(`nonce`,u),document.head.appendChild(t),l)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${c}`)))})})}).filter(e=>e!==void 0))}function l(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(e=>{for(let t of e||[])t.status===`rejected`&&l(t.reason);return a().catch(l)})},o=`true`,s=`false`,c=o===`true`,l=s===`true`;function u(e={}){let{immediate:t=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:i,onRegistered:o,onRegisteredSW:s,onRegisterError:u}=e,d,f,p,m=async(e=!0)=>{await f,c||p?.()};async function h(){if(`serviceWorker`in navigator){if(d=await a(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[]).then(({Workbox:e})=>new e(`/sw.js`,{scope:`/`,type:`classic`})).catch(e=>{u?.(e)}),!d)return;if(p=()=>{d?.messageSkipWaiting()},!l){if(c)d.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(n?n():window.location.reload())}),d.addEventListener(`installed`,e=>{e.isUpdate||i?.()});else{let e=!1,t=()=>{e=!0,d?.addEventListener(`controlling`,e=>{e.isUpdate&&(n?n():window.location.reload())}),r?.()};d.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&i?.():n.isExternal?t():!e&&i?.():n.isUpdate||i?.()}),d.addEventListener(`waiting`,t)}}d.register({immediate:t}).then(e=>{s?s(`/sw.js`,e):o?.(e)}).catch(e=>{u?.(e)})}}return f=h(),m}var d=[{name:`Emirates — Saver`,allowanceKg:30,note:`typical`},{name:`Qatar Airways`,allowanceKg:25,note:`typical`},{name:`Etihad`,allowanceKg:23,note:`typical`},{name:`Oman Air`,allowanceKg:30,note:`typical`},{name:`Air India`,allowanceKg:25,note:`typical`},{name:`Air India Express`,allowanceKg:20,note:`typical`},{name:`IndiGo Intl`,allowanceKg:20,note:`typical`},{name:`SpiceJet Intl`,allowanceKg:20,note:`typical`}],f=0;function p(e,t,n,r){let i=Math.max(.1,Math.round(t*10)/10);return{id:`${Date.now()}-${f++}`,name:e,weightKg:i,priority:n,emoji:r}}function m(){return[p(`Medjool dates`,2,5,`🌴`),p(`Spice box`,1.5,5,`🌶️`),p(`Perfume`,.5,4,`🧴`),p(`Chocolates`,1,4,`🍫`),p(`Dry fruits`,1,4,`🥜`),p(`Abaya`,1.2,3,`🥻`),p(`Mixer grinder`,5,3,`🔌`),p(`Kids toys`,.8,3,`🧸`),p(`Rice cooker`,4,2,`🍚`),p(`Steel dinner set`,6,2,`🍽️`)]}function h(e){return e.weightKg<=2?`Light enough for carry-on?`:e.weightKg<=5?`Ship separately or gift on arrival?`:`Buy this in Kerala instead?`}function g(e,t){let n=Math.max(0,Math.round(t*10)),r=e.length,i=e.map(e=>Math.max(0,Math.round(e.weightKg*10))),a=e.map((e,t)=>e.priority*1e5-i[t]),o=Array.from({length:r+1},()=>Array(n+1).fill(0));for(let e=1;e<=r;e++)for(let t=0;t<=n;t++)if(o[e][t]=o[e-1][t],i[e-1]<=t){let n=o[e-1][t-i[e-1]]+a[e-1];n>o[e][t]&&(o[e][t]=n)}let s=[],c=[],l=n;for(let t=r;t>=1;t--)o[t][l]===o[t-1][l]?c.unshift(e[t-1]):(s.unshift(e[t-1]),l-=i[t-1]);return{packed:s,leftOut:c}}function _(e,t){let n=e.filter(e=>e.forced),r=e.filter(e=>!e.forced),i=n.reduce((e,t)=>e+t.weightKg,0);if(i>=t)return{packed:n,leftOut:r,totalKg:i,overLimit:i>t};let{packed:a,leftOut:o}=g(r,t-i),s=[...n,...a];return{packed:s,leftOut:o,totalKg:s.reduce((e,t)=>e+t.weightKg,0),overLimit:!1}}function v(e,t,n){let r=e.reduce((e,t)=>e+t.weightKg,0)+t.weightKg-n;if(r<=0)return{evicts:[]};let i=e.filter(e=>!e.forced).sort((e,t)=>e.priority-t.priority||t.weightKg-e.weightKg),a=[];for(let e of i){if(r<=0)break;a.push(e),r-=e.weightKg}return{evicts:a}}u({immediate:!0});async function y(e){let t=URL.createObjectURL(e);try{let e=await new Promise((e,n)=>{let r=new Image;r.onload=()=>e(r),r.onerror=()=>n(Error(`image decode failed`)),r.src=t}),n=Math.min(1,320/Math.max(e.width,e.height)),r=document.createElement(`canvas`);return r.width=Math.max(1,Math.round(e.width*n)),r.height=Math.max(1,Math.round(e.height*n)),r.getContext(`2d`).drawImage(e,0,0,r.width,r.height),r.toDataURL(`image/jpeg`,.82)}catch{return t}}var b=m(),x=5,S=null,C=[],w=``,T=document.getElementById(`app`);function E(){return S??d[x].allowanceKg}function D(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function O(e){return e.photo?`<img src="${e.photo}" alt="">`:`<span class="emoji">${e.emoji??`🎁`}</span>`}function k(){let e=E(),{packed:t,leftOut:n,totalKg:r,overLimit:i}=_(b,e),a=[...t].sort((e,t)=>A(e.id)-A(t.id)),o=e>0?Math.min(100,r/e*100):0,s=b.reduce((e,t)=>e+t.weightKg,0)-r,c=new Map;if(!i)for(let r of n){let{evicts:n}=v(t,r,e);n.length&&c.set(r.id,n.map(e=>e.name))}let l=new Set(a.map(e=>e.id));T.innerHTML=`
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
        ${d.map((e,t)=>`<option value="${t}" ${t===x&&S===null?`selected`:``}>${D(e.name)} — ${e.allowanceKg} kg</option>`).join(``)}
      </select>
      </label>
      <label class="fld"><span>Or your own limit</span>
      <span class="kgwrap"><input id="customKg" type="number" min="0" step="0.5" placeholder="e.g. 23" aria-label="Custom baggage limit in kilograms" value="${S??``}"> kg</span>
      </label>
    </div>
    <div class="bar ${i?`over`:``}" role="img" aria-label="${o.toFixed(0)} percent of the allowance packed"><div class="fill" style="width:${o}%"></div></div>
    <p class="total ${i?`bad`:``}">${r.toFixed(1)} / ${e.toFixed(1)} kg packed${i?` · ${(r-e).toFixed(1)} kg over the limit`:` · ${o.toFixed(0)}%`}
    ${!i&&(n.length?`· ${s.toFixed(1)} kg left out`:`· ${(e-r).toFixed(1)} kg to spare <span class="stamp ok">All packed</span>`)}</p>
    <p class="fine">Typical economy allowances — confirm against your e-ticket.</p>
  </section>

  <section class="case">
    <div class="handle"></div>
    <div class="case-body">
    <h2>Suitcase (${a.length})</h2>
    <div class="grid" id="grid">
      ${a.map(e=>`<div class="tile ${e.forced?`forced`:``}" draggable="true" tabindex="0" role="button" title="Drag to rearrange, or focus and press ← →" aria-label="${D(e.name)}, ${e.weightKg.toFixed(1)} kilograms, importance ${e.priority} of 5${e.forced?`, pinned in bag`:``}. Use arrow keys to rearrange." data-id="${e.id}"><span class="grip" aria-hidden="true">⠿</span>${e.forced?`<span class="pin" aria-hidden="true">📌</span>`:``}${O(e)}<b>${D(e.name)}</b><span>${e.weightKg.toFixed(1)} kg · ★${e.priority}</span></div>`).join(``)||`<p class="empty">Nothing fits — raise the limit or drop an item.</p>`}
    </div>
    <p class="hint">Drag a tag to rearrange — the list only affects how it looks.</p>
    </div>
  </section>

  ${n.length?`<section class="card warn">
    <div class="stamp">Not packed</div>
    <h2>Left out (${n.length})</h2>
    <p class="fine">${i?`Your pinned gifts are over the limit — unpin something to free space.`:`The packer left these out. If one matters more than what is in the bag, put it in anyway.`}</p>
    <ul class="leftout">
      ${n.map(e=>{let t=c.get(e.id);return`<li>
        <span class="thumb">${O(e)}</span>
        <div class="lobody">
          <b>${D(e.name)}</b> — ${e.weightKg.toFixed(1)} kg
          <span class="sug">${D(h(e))}</span>
          ${t?`<span class="trade">Takes out: ${D(t.join(`, `))}</span>`:``}
        </div>
        <button class="put" data-id="${e.id}" ${i?`disabled`:``}>Put in bag</button>
      </li>`}).join(``)}
    </ul>
  </section>`:``}

  <section class="card">
    <h2 class="rowhead">Gifts (${b.length}) <button id="demoBtn" class="ghost">Reset demo</button></h2>
    <div class="addrow">
      <button type="button" class="pick ${w?`has`:``}" id="pickBtn">
        ${w?`<img src="${w}" alt=""><b>Change</b>`:`<span class="cam">📷</span><b>Photo</b>`}
      </button>
      <input id="photo" type="file" accept="image/*" hidden>
      <input id="gname" placeholder="Gift name" maxlength="40" aria-label="Gift name">
      <input id="gweight" type="number" min="0.1" step="0.1" placeholder="kg" aria-label="Gift weight in kilograms">
      <label title="Importance, 1 to 5">★<input id="gprio" type="range" min="1" max="5" value="3" aria-label="New gift importance, 1 to 5"><span id="gprioVal">3</span></label>
      <button id="addBtn">Add</button>
    </div>
    <p class="fine">Importance decides what stays in the bag when it gets tight — ★5 is "can't leave without it".</p>
    <ul class="gifts">
      ${b.map(e=>`<li data-id="${e.id}" class="${l.has(e.id)?``:`cut`}${e.forced?` forced-row`:``}">
        <span class="thumb">${O(e)}</span>
        <input class="nm" value="${D(e.name)}" maxlength="40" aria-label="Gift name">
        <input class="wt" type="number" min="0.1" step="0.1" value="${e.weightKg}" aria-label="Weight in kilograms">
        <label title="Importance, 1 to 5">★<input class="pr" type="range" min="1" max="5" value="${e.priority}" aria-label="Importance of ${D(e.name)}, 1 to 5"><span class="prv">${e.priority}</span></label>
        <span class="status">${l.has(e.id)?e.forced?`Pinned`:`In bag`:`Left out`}</span>
        ${e.forced?`<button class="unpin" data-id="${e.id}" title="Unpin ${D(e.name)} — let the packer decide again">Unpin</button>`:``}
        <button class="rm" title="Remove ${D(e.name)}" aria-label="Remove ${D(e.name)}">✕</button>
      </li>`).join(``)}
    </ul>
  </section>

  <footer>Offline-first · your photos never leave this device.</footer>`,j(a)}function A(e){let t=C.indexOf(e);return t===-1?C.length+e.charCodeAt(0):t}function j(e){let t=document.getElementById(`airline`);t.onchange=()=>{x=Number(t.value),S=null,k()};let n=document.getElementById(`customKg`);n.onchange=()=>{let e=parseFloat(n.value);S=Number.isFinite(e)&&e>0?e:null,k()};let r=document.getElementById(`gprio`);r.oninput=()=>document.getElementById(`gprioVal`).textContent=r.value;let i=document.getElementById(`photo`);i.onchange=async()=>{let e=i.files?.[0];e?(w.startsWith(`blob:`)&&URL.revokeObjectURL(w),w=await y(e),k()):w&&(w=``,k())},document.getElementById(`pickBtn`).onclick=()=>i.click(),document.getElementById(`addBtn`).onclick=()=>{let e=document.getElementById(`gname`).value.trim(),t=parseFloat(document.getElementById(`gweight`).value);if(!e||!(t>0))return;let n=p(e,t,Number(r.value));w?(n.photo=w,w=``,i.value=``):n.emoji=`🎁`,b.push(n),document.getElementById(`gname`).value=``,document.getElementById(`gweight`).value=``,k()},document.getElementById(`demoBtn`).onclick=()=>{b=m(),C=[],S=null,x=5,w=``,k()},document.querySelectorAll(`.put`).forEach(e=>{e.onclick=()=>{let t=b.find(t=>t.id===e.dataset.id);t&&(t.forced=!0,k())}}),document.querySelectorAll(`.unpin`).forEach(e=>{e.onclick=()=>{let t=b.find(t=>t.id===e.dataset.id);t&&(t.forced=!1,k())}}),document.querySelectorAll(`ul.gifts li`).forEach(e=>{let t=e.dataset.id,n=b.find(e=>e.id===t);e.querySelector(`.nm`).onchange=e=>{n.name=e.target.value.trim()||n.name,k()},e.querySelector(`.wt`).onchange=e=>{let t=parseFloat(e.target.value);t>0&&(n.weightKg=Math.max(.1,Math.round(t*10)/10)),k()},e.querySelector(`.pr`).oninput=e=>{n.priority=Number(e.target.value),k()},e.querySelector(`.pr`).onchange=e=>{n.priority=Number(e.target.value),k()},e.querySelector(`.rm`).onclick=()=>{b=b.filter(e=>e.id!==t),k()}});let a=document.getElementById(`grid`),o=``,s=(t,n)=>{let r=e.map(e=>e.id),i=r.indexOf(t),a=i+n;i<0||a<0||a>=r.length||([r[i],r[a]]=[r[a],r[i]],C=r,k(),document.getElementById(`grid`)?.querySelector(`[data-id="${t}"]`)?.focus())};a.querySelectorAll(`.tile`).forEach(t=>{t.ondragstart=()=>o=t.dataset.id,t.ondragover=e=>e.preventDefault(),t.ondrop=n=>{n.preventDefault();let r=e.map(e=>e.id).filter(e=>e!==o),i=e.findIndex(e=>e.id===t.dataset.id);r.splice(i<0?r.length:i,0,o),C=r,k()},t.onkeydown=e=>{(e.key===`ArrowLeft`||e.key===`ArrowRight`)&&(e.preventDefault(),s(t.dataset.id,e.key===`ArrowLeft`?-1:1))}});let c=document.getElementById(`installBtn`),l=window;c.hidden=!l.__deferredInstall,c.onclick=()=>l.__deferredInstall?.prompt()}window.__gb={gifts:()=>b,limit:E},window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),window.__deferredInstall=e;let t=document.getElementById(`installBtn`);t&&(t.hidden=!1)}),k();