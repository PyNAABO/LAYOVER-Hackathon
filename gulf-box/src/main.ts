import './style.css';
import { registerSW } from 'virtual:pwa-register';
import { AIRLINES, demoGifts, suggest, makeGift } from './data';
import type { Gift } from './data';
import { pack } from './knapsack';

registerSW({ immediate: true });

let gifts: Gift[] = demoGifts();
let airlineIdx = 5; // Air India Express 20 kg — demo default with tension
let customKg: number | null = null;
let order: string[] = []; // visual tile order override

const app = document.getElementById('app')!;

function limitKg(): number {
  return customKg ?? AIRLINES[airlineIdx].allowanceKg;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function tileArt(g: Gift): string {
  if (g.photo) return `<img src="${g.photo}" alt="">`;
  return `<span class="emoji">${g.emoji ?? '🎁'}</span>`;
}

function render(): void {
  const limit = limitKg();
  const { packed, leftOut, totalKg } = pack(gifts, limit);
  const ordered = [...packed].sort(
    (a, b) => orderIndex(a.id) - orderIndex(b.id),
  );
  const pct = limit > 0 ? Math.min(100, (totalKg / limit) * 100) : 0;
  const leftKg = gifts.reduce((s, g) => s + g.weightKg, 0) - totalKg;

  app.innerHTML = `
  <header>
    <div>
      <h1>🧳 Gulf Box</h1>
      <p>Fit every gift into one baggage allowance.</p>
    </div>
    <button id="installBtn" hidden>Install app</button>
  </header>

  <section class="card">
    <h2>Allowance</h2>
    <div class="row">
      <select id="airline">
        ${AIRLINES.map(
          (a, i) =>
            `<option value="${i}" ${i === airlineIdx && customKg === null ? 'selected' : ''}>${esc(a.name)} — ${a.allowanceKg} kg</option>`,
        ).join('')}
      </select>
      <label>Custom <input id="customKg" type="number" min="0" step="0.5" placeholder="kg" value="${customKg ?? ''}"></label>
    </div>
    <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
    <p class="total">${totalKg.toFixed(1)} / ${limit.toFixed(1)} kg packed
    ${leftOut.length ? `· ${leftKg.toFixed(1)} kg left out` : '· everything fits ✓'}</p>
    <p class="fine">Typical economy allowances — confirm against your e-ticket.</p>
  </section>

  <section class="card">
    <h2>Suitcase (${ordered.length})</h2>
    <div class="grid" id="grid">
      ${ordered.map((g) => `<div class="tile" draggable="true" data-id="${g.id}">${tileArt(g)}<b>${esc(g.name)}</b><span>${g.weightKg.toFixed(1)} kg · ★${g.priority}</span></div>`).join('') || '<p class="empty">Nothing fits — raise the limit or drop an item.</p>'}
    </div>
  </section>

  <section class="card">
    <h2>Gifts (${gifts.length})</h2>
    <div class="addrow">
      <label class="file">📷 Photo<input id="photo" type="file" accept="image/*" hidden></label>
      <input id="gname" placeholder="Gift name" maxlength="40">
      <input id="gweight" type="number" min="0.1" step="0.1" placeholder="kg">
      <label>★<input id="gprio" type="range" min="1" max="5" value="3"><span id="gprioVal">3</span></label>
      <button id="addBtn">Add</button>
      <button id="demoBtn" class="ghost">Reset demo</button>
    </div>
    <ul class="gifts">
      ${gifts.map((g) => `<li data-id="${g.id}">
        <span class="thumb">${tileArt(g)}</span>
        <input class="nm" value="${esc(g.name)}" maxlength="40">
        <input class="wt" type="number" min="0.1" step="0.1" value="${g.weightKg}">
        <label>★<input class="pr" type="range" min="1" max="5" value="${g.priority}"></label>
        <button class="rm" title="Remove">✕</button>
      </li>`).join('')}
    </ul>
  </section>

  ${leftOut.length ? `<section class="card warn">
    <h2>Left out (${leftOut.length})</h2>
    <ul class="leftout">
      ${leftOut.map((g) => `<li><span class="thumb">${tileArt(g)}</span><div><b>${esc(g.name)}</b> — ${g.weightKg.toFixed(1)} kg<span class="sug">${esc(suggest(g))}</span></div></li>`).join('')}
    </ul>
  </section>` : ''}

  <footer>Offline-first · your photos never leave this device.</footer>`;

  wire(ordered);
}

function orderIndex(id: string): number {
  const i = order.indexOf(id);
  return i === -1 ? order.length + id.charCodeAt(0) : i;
}

function wire(ordered: Gift[]): void {
  const airline = document.getElementById('airline') as HTMLSelectElement;
  airline.onchange = () => {
    airlineIdx = Number(airline.value);
    customKg = null;
    render();
  };
  const custom = document.getElementById('customKg') as HTMLInputElement;
  custom.onchange = () => {
    const v = parseFloat(custom.value);
    customKg = Number.isFinite(v) && v > 0 ? v : null;
    render();
  };

  const gprio = document.getElementById('gprio') as HTMLInputElement;
  gprio.oninput = () =>
    ((document.getElementById('gprioVal') as HTMLElement).textContent = gprio.value);

  let pendingPhoto = '';
  const photo = document.getElementById('photo') as HTMLInputElement;
  photo.onchange = () => {
    const f = photo.files?.[0];
    if (f) {
      if (pendingPhoto.startsWith('blob:')) URL.revokeObjectURL(pendingPhoto);
      pendingPhoto = URL.createObjectURL(f);
    }
  };

  (document.getElementById('addBtn') as HTMLButtonElement).onclick = () => {
    const name = (document.getElementById('gname') as HTMLInputElement).value.trim();
    const wt = parseFloat((document.getElementById('gweight') as HTMLInputElement).value);
    if (!name || !(wt > 0)) return;
    const g = makeGift(name, Math.round(wt * 10) / 10, Number(gprio.value));
    if (pendingPhoto) {
      g.photo = pendingPhoto;
      pendingPhoto = '';
      photo.value = '';
    } else {
      g.emoji = '🎁';
    }
    gifts.push(g);
    (document.getElementById('gname') as HTMLInputElement).value = '';
    (document.getElementById('gweight') as HTMLInputElement).value = '';
    render();
  };

  (document.getElementById('demoBtn') as HTMLButtonElement).onclick = () => {
    gifts = demoGifts();
    order = [];
    customKg = null;
    airlineIdx = 5;
    render();
  };

  document.querySelectorAll<HTMLLIElement>('ul.gifts li').forEach((li) => {
    const id = li.dataset.id!;
    const g = gifts.find((x) => x.id === id)!;
    (li.querySelector('.nm') as HTMLInputElement).onchange = (e) => {
      g.name = (e.target as HTMLInputElement).value.trim() || g.name;
      render();
    };
    (li.querySelector('.wt') as HTMLInputElement).onchange = (e) => {
      const v = parseFloat((e.target as HTMLInputElement).value);
      if (v > 0) g.weightKg = Math.round(v * 10) / 10;
      render();
    };
    (li.querySelector('.pr') as HTMLInputElement).oninput = (e) => {
      g.priority = Number((e.target as HTMLInputElement).value);
      render();
    };
    (li.querySelector('.rm') as HTMLButtonElement).onclick = () => {
      gifts = gifts.filter((x) => x.id !== id);
      render();
    };
  });

  // Visual-only drag reorder inside the packed grid.
  const grid = document.getElementById('grid')!;
  let dragId = '';
  grid.querySelectorAll<HTMLElement>('.tile').forEach((t) => {
    t.ondragstart = () => (dragId = t.dataset.id!);
    t.ondragover = (e) => e.preventDefault();
    t.ondrop = (e) => {
      e.preventDefault();
      const ids = ordered.map((g) => g.id).filter((x) => x !== dragId);
      const at = ordered.findIndex((g) => g.id === t.dataset.id);
      ids.splice(at < 0 ? ids.length : at, 0, dragId);
      order = ids;
      render();
    };
  });

  const installBtn = document.getElementById('installBtn') as HTMLButtonElement;
  const w = window as unknown as {
    __deferredInstall?: { prompt: () => void };
  };
  installBtn.hidden = !w.__deferredInstall;
  installBtn.onclick = () => w.__deferredInstall?.prompt();
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (window as unknown as { __deferredInstall?: unknown }).__deferredInstall = e;
  const b = document.getElementById('installBtn');
  if (b) b.hidden = false;
});

render();
