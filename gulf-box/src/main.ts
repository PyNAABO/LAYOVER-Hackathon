import './style.css';
import { registerSW } from 'virtual:pwa-register';
import { AIRLINES, demoGifts, suggest, makeGift } from './data';
import type { Gift } from './data';
import { pack, planForceIn } from './knapsack';

registerSW({ immediate: true });

// Downscale to a thumbnail: booth photos come from phone cameras (3–5 MB),
// which would choke the page. 320px on the long edge keeps tiles crisp.
async function thumbnail(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('image decode failed'));
      i.src = url;
    });
    const scale = Math.min(1, 320 / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(img.width * scale));
    c.height = Math.max(1, Math.round(img.height * scale));
    c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.82);
  } catch {
    return url; // unreadable file: fall back to the original object URL
  }
}

let gifts: Gift[] = demoGifts();
let airlineIdx = 5; // Air India Express 20 kg — demo default with tension
let customKg: number | null = null;
let order: string[] = []; // visual tile order override
let pendingPhoto = ''; // staged photo for the next add

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
  const { packed, leftOut, totalKg, overLimit } = pack(gifts, limit);
  const ordered = [...packed].sort(
    (a, b) => orderIndex(a.id) - orderIndex(b.id),
  );
  const pct = limit > 0 ? Math.min(100, (totalKg / limit) * 100) : 0;
  const leftKg = gifts.reduce((s, g) => s + g.weightKg, 0) - totalKg;
  // Which gift would have to leave if this left-out one is forced in?
  const forcedIn = new Map<string, string[]>();
  if (!overLimit) {
    for (const g of leftOut) {
      if (g.excluded) continue;
      const { evicts } = planForceIn(packed, g, limit);
      if (evicts.length) {
        forcedIn.set(g.id, evicts.map((e) => e.name));
      }
    }
  }

  const packedIds = new Set(ordered.map((g) => g.id));

  app.innerHTML = `
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
        ${AIRLINES.map(
          (a, i) =>
            `<option value="${i}" ${i === airlineIdx && customKg === null ? 'selected' : ''}>${esc(a.name)} — ${a.allowanceKg} kg</option>`,
        ).join('')}
      </select>
      </label>
      <label class="fld"><span>Or your own limit</span>
      <span class="kgwrap"><input id="customKg" type="number" min="0" step="0.5" placeholder="e.g. 23" aria-label="Custom baggage limit in kilograms" value="${customKg ?? ''}"> kg</span>
      </label>
    </div>
    <div class="bar ${overLimit ? 'over' : ''}" role="img" aria-label="${pct.toFixed(0)} percent of the allowance packed"><div class="fill" style="width:${pct}%"></div></div>
    <p class="total ${overLimit ? 'bad' : ''}">${totalKg.toFixed(1)} / ${limit.toFixed(1)} kg packed${overLimit ? ` · ${(totalKg - limit).toFixed(1)} kg over the limit` : ` · ${pct.toFixed(0)}%`}
    ${!overLimit && (leftOut.length ? `· ${leftKg.toFixed(1)} kg left out` : gifts.length ? `· ${(limit - totalKg).toFixed(1)} kg to spare <span class="stamp ok">All packed</span>` : '')}</p>
    <p class="fine">Typical economy allowances — confirm against your e-ticket.</p>
  </section>

  <section class="case">
    <div class="handle"></div>
    <div class="case-body">
    <h2>Suitcase (${ordered.length})</h2>
    <div class="grid" id="grid">
      ${ordered.map((g) => `<div class="tile ${g.forced ? 'forced' : ''}" draggable="true" tabindex="0" role="button" title="Drag to rearrange, or focus and press ← →" aria-label="${esc(g.name)}, ${g.weightKg.toFixed(1)} kilograms, importance ${g.priority} of 5${g.forced ? ', pinned in bag' : ''}. Use arrow keys to rearrange." data-id="${g.id}"><span class="grip" aria-hidden="true">⠿</span>${g.forced ? '<span class="pin" aria-hidden="true">📌</span>' : ''}${tileArt(g)}<b>${esc(g.name)}</b><span>${g.weightKg.toFixed(1)} kg · ★${g.priority}</span></div>`).join('') || `<p class="empty">${gifts.length ? 'Nothing fits — raise the limit or drop an item.' : 'No gifts yet — add one below to start packing.'}</p>`}
    </div>
    <p class="hint">Drag a tag to rearrange — the list only affects how it looks.</p>
    </div>
  </section>

  ${leftOut.length ? `<section class="card warn">
    <div class="stamp">Not packed</div>
    <h2>Left out (${leftOut.length})</h2>
    <p class="fine">${overLimit ? `Pinned gifts are over the limit by ${(totalKg - limit).toFixed(1)} kg — unpin the lightest pinned gift below to free space.` : 'The packer left these out. If one matters more than what is in the bag, put it in anyway.'}</p>
    <ul class="leftout">
      ${leftOut.map((g) => {
        const evicts = forcedIn.get(g.id);
        const label = g.excluded ? 'Put in back' : 'Put in bag';
        const cls = g.excluded ? 'put back' : 'put';
        return `<li class="${g.excluded ? 'excluded-row' : ''}">
        <span class="thumb">${tileArt(g)}</span>
        <div class="lobody">
          <b>${esc(g.name)}</b> — ${g.weightKg.toFixed(1)} kg
          <span class="sug">${esc(suggest(g))}</span>
          ${evicts ? `<span class="trade">Takes out: ${esc(evicts.join(', '))}</span>` : ''}
        </div>
        <button class="${cls}" data-id="${g.id}" ${overLimit && !g.excluded ? 'disabled' : ''}>${label}</button>
      </li>`;
      }).join('')}
    </ul>
  </section>` : ''}

  <section class="card">
    <h2 class="rowhead">Gifts (${gifts.length}) <button id="demoBtn" class="ghost">Reset demo</button></h2>
    <div class="addrow">
      <button type="button" class="pick ${pendingPhoto ? 'has' : ''}" id="pickBtn">
        ${pendingPhoto ? `<img src="${pendingPhoto}" alt=""><b>Change</b>` : '<span class="cam">📷</span><b>Photo</b>'}
      </button>
      <input id="photo" type="file" accept="image/*" hidden>
      <input id="gname" placeholder="Gift name" maxlength="40" aria-label="Gift name">
      <input id="gweight" type="number" min="0.1" step="0.1" placeholder="kg" aria-label="Gift weight in kilograms">
      <label title="Importance, 1 to 5">★<input id="gprio" type="range" min="1" max="5" value="3" aria-label="New gift importance, 1 to 5"><span id="gprioVal">3</span></label>
      <button id="addBtn">Add</button>
    </div>
    <p class="fine">Importance decides what stays in the bag when it gets tight — ★5 is "can't leave without it".</p>
    <ul class="gifts">
      ${gifts.map((g) => `<li data-id="${g.id}" class="${packedIds.has(g.id) ? '' : 'cut'}${g.forced ? ' forced-row' : ''}${g.excluded ? ' excluded-row' : ''}">
        <span class="thumb">${tileArt(g)}</span>
        <input class="nm" value="${esc(g.name)}" maxlength="40" aria-label="Gift name">
        <input class="wt" type="number" min="0.1" step="0.1" value="${g.weightKg}" aria-label="Weight in kilograms">
        <label title="Importance, 1 to 5">★<input class="pr" type="range" min="1" max="5" value="${g.priority}" aria-label="Importance of ${esc(g.name)}, 1 to 5"><span class="prv">${g.priority}</span></label>
        <span class="status">${g.excluded ? 'Taken out' : packedIds.has(g.id) ? (g.forced ? 'Pinned' : 'In bag') : 'Left out'}</span>
        ${g.forced ? `<button class="unpin" data-id="${g.id}" title="Unpin ${esc(g.name)} — let the packer decide again">Unpin</button>` : ''}
        ${packedIds.has(g.id) && !g.forced ? `<button class="takeout" data-id="${g.id}" title="Keep ${esc(g.name)} out of the bag">Take out</button>` : ''}
        ${g.excluded ? `<button class="unpin" data-id="${g.id}" title="Put ${esc(g.name)} back into consideration">Put back</button>` : ''}
        <button class="rm" title="Remove ${esc(g.name)}" aria-label="Remove ${esc(g.name)}">✕</button>
      </li>`).join('')}
    </ul>
  </section>

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

  const photo = document.getElementById('photo') as HTMLInputElement;
  photo.onchange = async () => {
    const f = photo.files?.[0];
    if (!f) {
      // chooser cancelled: drop any staged photo so state can't drift
      if (pendingPhoto) {
        pendingPhoto = '';
        render();
      }
      return;
    }
    if (pendingPhoto.startsWith('blob:')) URL.revokeObjectURL(pendingPhoto);
    pendingPhoto = await thumbnail(f);
    render();
  };
  (document.getElementById('pickBtn') as HTMLButtonElement).onclick = () => photo.click();

  (document.getElementById('addBtn') as HTMLButtonElement).onclick = () => {
    const name = (document.getElementById('gname') as HTMLInputElement).value.trim();
    const wt = parseFloat((document.getElementById('gweight') as HTMLInputElement).value);
    if (!name || !(wt > 0)) return;
    const g = makeGift(name, wt, Number(gprio.value));
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
    pendingPhoto = '';
    render();
  };

  // "Put in bag": pin a left-out gift. The packer already evicted whatever
  // had to go, so this is one tap — the app decides, the user overrides.
  document.querySelectorAll<HTMLButtonElement>('.put').forEach((b) => {
    b.onclick = () => {
      const g = gifts.find((x) => x.id === b.dataset.id);
      if (g) {
        g.forced = true;
        render();
      }
    };
  });
  document.querySelectorAll<HTMLButtonElement>('.takeout, .put.back').forEach((b) => {
    b.onclick = () => {
      const g = gifts.find((x) => x.id === b.dataset.id);
      if (!g) return;
      if (b.classList.contains('takeout')) {
        g.excluded = true;
        g.forced = false;
      } else {
        g.excluded = false;
      }
      render();
    };
  });
  // Unpin / Put back: either way the gift returns to algorithmic control.
  document.querySelectorAll<HTMLButtonElement>('.unpin').forEach((b) => {
    b.onclick = () => {
      const g = gifts.find((x) => x.id === b.dataset.id);
      if (g) {
        g.forced = false;
        g.excluded = false;
        render();
      }
    };
  });

  document.querySelectorAll<HTMLLIElement>('ul.gifts li').forEach((li) => {
    const id = li.dataset.id!;
    const g = gifts.find((x) => x.id === id)!;
    (li.querySelector('.nm') as HTMLInputElement).onchange = (e) => {
      g.name = (e.target as HTMLInputElement).value.trim() || g.name;
      render();
    };
    (li.querySelector('.wt') as HTMLInputElement).onchange = (e) => {
      const v = parseFloat((e.target as HTMLInputElement).value);
      if (v > 0) g.weightKg = Math.max(0.1, Math.round(v * 10) / 10);
      render();
    };
    (li.querySelector('.pr') as HTMLInputElement).oninput = (e) => {
      g.priority = Number((e.target as HTMLInputElement).value);
      render();
    };
    // A slider nudged by keyboard fires input then change; input already
    // repacks, so change only needs to cover engines that skip input.
    (li.querySelector('.pr') as HTMLInputElement).onchange = (e) => {
      g.priority = Number((e.target as HTMLInputElement).value);
      render();
    };
    (li.querySelector('.rm') as HTMLButtonElement).onclick = () => {
      gifts = gifts.filter((x) => x.id !== id);
      render();
    };
  });

  // Visual-only reorder inside the packed grid: mouse drag, or ←/→ when focused.
  const grid = document.getElementById('grid')!;
  let dragId = '';
  const move = (id: string, dir: -1 | 1) => {
    const ids = ordered.map((g) => g.id);
    const at = ids.indexOf(id);
    const to = at + dir;
    if (at < 0 || to < 0 || to >= ids.length) return;
    [ids[at], ids[to]] = [ids[to], ids[at]];
    order = ids;
    render();
    // render() replaces the DOM, so the old `grid` node is stale — re-query.
    // Focus synchronously: an async restore lets the next keypress land on
    // <body> and be lost.
    document
      .getElementById('grid')
      ?.querySelector<HTMLElement>(`[data-id="${id}"]`)
      ?.focus();
  };
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
    t.onkeydown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        move(t.dataset.id!, e.key === 'ArrowLeft' ? -1 : 1);
      }
    };
  });

  const installBtn = document.getElementById('installBtn') as HTMLButtonElement;
  const w = window as unknown as {
    __deferredInstall?: { prompt: () => void };
  };
  installBtn.hidden = !w.__deferredInstall;
  installBtn.onclick = () => w.__deferredInstall?.prompt();
}

// Test hook: lets automated feature tests inspect state.
(window as unknown as { __gb: unknown }).__gb = { gifts: () => gifts, limit: limitKg };

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (window as unknown as { __deferredInstall?: unknown }).__deferredInstall = e;
  const b = document.getElementById('installBtn');
  if (b) b.hidden = false;
});

render();
