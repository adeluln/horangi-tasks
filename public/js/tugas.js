/* ============================================================
   tugas.js — Horangi Tasks
   Tugas 8 : Interactive To-Do List  (localStorage)
   Tugas 9 : Array Methods           (filter, sort, map, reduce, find)
   Tugas 10: Fetch API               (PokeAPI)
   ============================================================ */

'use strict';

/* ============================================================
   UTILITY: TAB NAVIGATION
   ============================================================ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Deactivate all
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    // Activate clicked
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const target = document.getElementById('tab-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});


/* ============================================================
   TUGAS 8 — INTERACTIVE TO-DO LIST
   Fitur: tambah, hapus, selesaikan, filter, prioritas, localStorage
   ============================================================ */
const TODO_KEY = 'horangi_todos';

let todos       = loadTodos();
let todoFilter  = 'all';

// --- DOM refs ---
const todoInput     = document.getElementById('todo-input');
const todoPriority  = document.getElementById('todo-priority');
const todoAddBtn    = document.getElementById('todo-add-btn');
const todoList      = document.getElementById('todo-list');
const todoCount     = document.getElementById('todo-count');
const todoEmpty     = document.getElementById('todo-empty');
const todoClearDone = document.getElementById('todo-clear-done');
const todoClearAll  = document.getElementById('todo-clear-all');

// --- Load / Save ---
function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(TODO_KEY)) || [];
  } catch {
    return [];
  }
}
function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

// --- Add ---
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    todoInput.style.borderColor = '#d94f4f';
    setTimeout(() => { todoInput.style.borderColor = ''; }, 1200);
    return;
  }
  const todo = {
    id:       Date.now(),
    text:     text,
    priority: todoPriority.value,
    done:     false,
    createdAt: new Date().toLocaleDateString('id-ID')
  };
  todos.unshift(todo);    // array method: unshift (tambah di depan)
  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
}

// --- Toggle done ---
function toggleTodo(id) {
  todos = todos.map(t =>        // array method: map
    t.id === id ? { ...t, done: !t.done } : t
  );
  saveTodos();
  renderTodos();
}

// --- Delete ---
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);  // array method: filter
  saveTodos();
  renderTodos();
}

// --- Render ---
function renderTodos() {
  // filter berdasarkan tab aktif
  let visible;
  if (todoFilter === 'active') {
    visible = todos.filter(t => !t.done);   // array method: filter
  } else if (todoFilter === 'done') {
    visible = todos.filter(t => t.done);    // array method: filter
  } else {
    visible = [...todos];                   // spread / copy
  }

  todoList.innerHTML = '';

  if (visible.length === 0) {
    todoEmpty.style.display = 'block';
  } else {
    todoEmpty.style.display = 'none';
    visible.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (todo.done ? ' done' : '');
      li.dataset.id = todo.id;
      li.innerHTML = `
        <div class="todo-check" title="Tandai selesai" onclick="toggleTodo(${todo.id})">
          ${todo.done ? '✓' : ''}
        </div>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <span class="priority-badge priority-${todo.priority}">
          ${todo.priority === 'high' ? 'Tinggi' : todo.priority === 'medium' ? 'Sedang' : 'Rendah'}
        </span>
        <button class="todo-delete" title="Hapus" onclick="deleteTodo(${todo.id})">✕</button>
      `;
      todoList.appendChild(li);
    });
  }

  // Count — gunakan reduce untuk hitung
  const doneCount   = todos.reduce((acc, t) => acc + (t.done ? 1 : 0), 0);  // array method: reduce
  const activeCount = todos.length - doneCount;
  todoCount.textContent = `${activeCount} aktif · ${doneCount} selesai`;
}

// --- Filter buttons ---
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    todoFilter = btn.dataset.filter;
    renderTodos();
  });
});

// --- Clear ---
todoClearDone.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);  // array method: filter
  saveTodos();
  renderTodos();
});
todoClearAll.addEventListener('click', () => {
  if (!confirm('Hapus semua tugas?')) return;
  todos = [];
  saveTodos();
  renderTodos();
});

// --- Events ---
todoAddBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

// --- Init ---
renderTodos();


/* ============================================================
   TUGAS 9 — DATA MANIPULATION DENGAN ARRAY METHODS
   Data: produk kafetaria (hardcoded)
   Methods: filter, sort, map, reduce, find, forEach, some, every
   ============================================================ */
const PRODUCTS = [
  { id:1,  name:'Nasi Goreng Spesial',  category:'Makanan',  price:35000, stock:15, emoji:'🍳' },
  { id:2,  name:'Mie Ayam Bakso',       category:'Makanan',  price:28000, stock:20, emoji:'🍜' },
  { id:3,  name:'Ayam Geprek',          category:'Makanan',  price:32000, stock:8,  emoji:'🍗' },
  { id:4,  name:'Soto Ayam',            category:'Makanan',  price:25000, stock:12, emoji:'🥣' },
  { id:5,  name:'Gado-Gado',            category:'Makanan',  price:22000, stock:10, emoji:'🥗' },
  { id:6,  name:'Es Teh Manis',         category:'Minuman',  price:8000,  stock:50, emoji:'🧋' },
  { id:7,  name:'Jus Alpukat',          category:'Minuman',  price:18000, stock:25, emoji:'🥑' },
  { id:8,  name:'Kopi Susu',            category:'Minuman',  price:15000, stock:30, emoji:'☕' },
  { id:9,  name:'Es Jeruk',             category:'Minuman',  price:10000, stock:40, emoji:'🍊' },
  { id:10, name:'Cincau Hitam',         category:'Minuman',  price:12000, stock:22, emoji:'🫖' },
  { id:11, name:'Keripik Singkong',     category:'Snack',    price:7000,  stock:60, emoji:'🥔' },
  { id:12, name:'Roti Bakar Coklat',    category:'Snack',    price:14000, stock:18, emoji:'🍞' },
  { id:13, name:'Pisang Goreng',        category:'Snack',    price:10000, stock:35, emoji:'🍌' },
  { id:14, name:'Martabak Mini',        category:'Snack',    price:20000, stock:14, emoji:'🥞' },
  { id:15, name:'Es Krim Vanilla',      category:'Dessert',  price:12000, stock:20, emoji:'🍦' },
  { id:16, name:'Puding Coklat',        category:'Dessert',  price:10000, stock:28, emoji:'🍮' },
  { id:17, name:'Klepon',               category:'Dessert',  price:8000,  stock:40, emoji:'🟢' },
  { id:18, name:'Cenil',                category:'Dessert',  price:8000,  stock:35, emoji:'🫐' },
];

// --- DOM refs ---
const arrSearch   = document.getElementById('arr-search');
const arrCategory = document.getElementById('arr-category');
const arrSort     = document.getElementById('arr-sort');
const arrMaxprice = document.getElementById('arr-maxprice');
const arrStats    = document.getElementById('arr-stats');
const arrLog      = document.getElementById('arr-method-log');
const productGrid = document.getElementById('product-grid');

function applyArrayMethods() {
  let result = [...PRODUCTS];  // spread: copy array
  const logs = [];

  // 1. FILTER — berdasarkan kategori
  const cat = arrCategory.value;
  if (cat !== 'all') {
    result = result.filter(p => p.category === cat);  // array method: filter
    logs.push(`<span class="log-method">.filter()</span> <span class="log-line">kategori === "${cat}"</span> → <span class="log-result">${result.length} produk</span>`);
  }

  // 2. FILTER — berdasarkan harga maks
  const maxPrice = parseFloat(arrMaxprice.value);
  if (!isNaN(maxPrice) && maxPrice > 0) {
    result = result.filter(p => p.price <= maxPrice);  // array method: filter
    logs.push(`<span class="log-method">.filter()</span> <span class="log-line">harga ≤ Rp${maxPrice.toLocaleString('id-ID')}</span> → <span class="log-result">${result.length} produk</span>`);
  }

  // 3. FILTER — berdasarkan nama (search)
  const keyword = arrSearch.value.trim().toLowerCase();
  if (keyword) {
    result = result.filter(p => p.name.toLowerCase().includes(keyword));  // array method: filter
    logs.push(`<span class="log-method">.filter()</span> <span class="log-line">nama includes "${keyword}"</span> → <span class="log-result">${result.length} produk</span>`);
  }

  // 4. SORT — berbagai pilihan
  const sortVal = arrSort.value;
  if (sortVal !== 'default') {
    result = result.sort((a, b) => {              // array method: sort
      if (sortVal === 'name-asc')   return a.name.localeCompare(b.name);
      if (sortVal === 'name-desc')  return b.name.localeCompare(a.name);
      if (sortVal === 'price-asc')  return a.price - b.price;
      if (sortVal === 'price-desc') return b.price - a.price;
      if (sortVal === 'stock-asc')  return a.stock - b.stock;
      return 0;
    });
    logs.push(`<span class="log-method">.sort()</span> <span class="log-line">by "${sortVal}"</span>`);
  }

  // 5. REDUCE — total harga semua produk ditampilkan
  const totalNilai = result.reduce((acc, p) => acc + (p.price * p.stock), 0);  // array method: reduce
  const avgPrice   = result.length ? result.reduce((acc, p) => acc + p.price, 0) / result.length : 0;

  // 6. FIND — produk termahal di hasil
  const termahal = result.reduce((max, p) => p.price > max.price ? p : max, result[0] || {});  // reduce as find-max

  // 7. SOME & EVERY
  const adaStokRendah = result.some(p => p.stock < 10);    // array method: some
  const semuaAda      = result.every(p => p.stock > 0);    // array method: every

  logs.push(`<span class="log-method">.reduce()</span> <span class="log-line">total nilai stok</span> → <span class="log-result">Rp${totalNilai.toLocaleString('id-ID')}</span>`);
  logs.push(`<span class="log-method">.some()</span> <span class="log-line">stok &lt; 10</span> → <span class="log-result">${adaStokRendah}</span>  <span class="log-method">.every()</span> <span class="log-line">stok &gt; 0</span> → <span class="log-result">${semuaAda}</span>`);

  // 8. MAP — ubah ke format tampilan
  const displayItems = result.map(p => ({        // array method: map
    ...p,
    priceFormatted: 'Rp' + p.price.toLocaleString('id-ID'),
    stockLabel:     p.stock < 10 ? `Stok: ${p.stock} ⚠️` : `Stok: ${p.stock}`,
    stockLow:       p.stock < 10
  }));

  // --- Render stats ---
  arrStats.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Tampil</div>
      <div class="stat-value">${result.length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Rata-rata harga</div>
      <div class="stat-value" style="font-size:16px">Rp${Math.round(avgPrice).toLocaleString('id-ID')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Nilai stok</div>
      <div class="stat-value" style="font-size:14px">Rp${totalNilai.toLocaleString('id-ID')}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Termahal</div>
      <div class="stat-value" style="font-size:14px">${termahal ? termahal.name : '-'}</div>
    </div>
  `;

  // --- Render log ---
  if (logs.length === 0) {
    arrLog.innerHTML = `<span class="log-line">// Menampilkan semua ${result.length} produk (belum ada filter)</span>`;
  } else {
    arrLog.innerHTML = logs.map(l => `<div>${l}</div>`).join('');
  }

  // --- Render products ---
  if (displayItems.length === 0) {
    productGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">😿 Tidak ada produk yang cocok</div>`;
    return;
  }
  productGrid.innerHTML = displayItems.map(p => `
    <div class="product-card">
      <div class="product-emoji">${p.emoji}</div>
      <div class="product-name">${escapeHtml(p.name)}</div>
      <span class="product-cat">${p.category}</span>
      <div class="product-price">${p.priceFormatted}</div>
      <div class="product-stock ${p.stockLow ? 'low' : ''}">${p.stockLabel}</div>
    </div>
  `).join('');
}

// --- Events ---
arrSearch.addEventListener('input', applyArrayMethods);
arrCategory.addEventListener('change', applyArrayMethods);
arrSort.addEventListener('change', applyArrayMethods);
arrMaxprice.addEventListener('input', applyArrayMethods);

// --- Init ---
applyArrayMethods();


/* ============================================================
   TUGAS 10 — FETCH DATA DARI PUBLIC API (PokeAPI)
   Endpoint: https://pokeapi.co/api/v2/
   Fitur: muat daftar, cari by nama/ID, tampil detail di modal
   ============================================================ */
const BASE_URL    = 'https://pokeapi.co/api/v2';
const pokeGrid    = document.getElementById('poke-grid');
const fetchStatus = document.getElementById('fetch-status');
const pokeSearch  = document.getElementById('poke-search');
const pokeSearchBtn = document.getElementById('poke-search-btn');
const pokeLoadBtn   = document.getElementById('poke-load-btn');
const pokeLimit     = document.getElementById('poke-limit');
const modalOverlay  = document.getElementById('poke-modal-overlay');
const modalClose    = document.getElementById('modal-close');
const modalBody     = document.getElementById('modal-body');

// --- Status helpers ---
function setStatus(msg, type = '') {
  fetchStatus.className = 'fetch-status' + (type ? ' ' + type : '');
  fetchStatus.innerHTML = msg;
}
function setLoading(msg = 'Memuat data...') {
  setStatus(`<span class="spinner"></span> ${msg}`);
}

// --- Fetch daftar Pokémon ---
async function loadPokeList() {
  const limit = parseInt(pokeLimit.value) || 24;
  setLoading(`Mengambil ${limit} Pokémon dari PokeAPI...`);
  pokeGrid.innerHTML = '';

  try {
    // Fetch daftar nama + url
    const res  = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    setStatus(`Memuat detail ${data.results.length} Pokémon...`);

    // Fetch detail semua secara paralel menggunakan Promise.all
    const details = await Promise.all(
      data.results.map(p => fetch(p.url).then(r => r.json()))
    );

    renderPokeGrid(details);
    setStatus(`✓ Berhasil memuat ${details.length} Pokémon`, 'success');

  } catch (err) {
    setStatus(`✕ Gagal memuat: ${err.message}`, 'error');
    pokeGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--danger)">Gagal mengambil data. Cek koneksi internet.</div>`;
  }
}

// --- Fetch Pokémon by nama/ID ---
async function searchPoke() {
  const query = pokeSearch.value.trim().toLowerCase();
  if (!query) return;
  setLoading(`Mencari "${query}"...`);
  pokeGrid.innerHTML = '';

  try {
    const res  = await fetch(`${BASE_URL}/pokemon/${query}`);
    if (!res.ok) throw new Error(`Pokémon "${query}" tidak ditemukan`);
    const data = await res.json();
    renderPokeGrid([data]);
    setStatus(`✓ Ditemukan: ${data.name}`, 'success');
  } catch (err) {
    setStatus(`✕ ${err.message}`, 'error');
    pokeGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--danger)">Pokémon tidak ditemukan. Coba nama lain.</div>`;
  }
}

// --- Render grid ---
function renderPokeGrid(pokeList) {
  if (!pokeList.length) {
    pokeGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">Tidak ada hasil.</div>`;
    return;
  }
  pokeGrid.innerHTML = pokeList.map(p => {
    const types = p.types.map(t =>
      `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`
    ).join('');
    const img = p.sprites.other?.['official-artwork']?.front_default
              || p.sprites.front_default
              || '';
    return `
      <div class="poke-card" onclick="openPokeModal(${p.id})" title="Klik untuk detail">
        <div class="poke-id">#${String(p.id).padStart(3,'0')}</div>
        ${img ? `<img src="${img}" alt="${p.name}" loading="lazy" />` : '<div style="height:80px"></div>'}
        <div class="poke-name">${p.name}</div>
        <div class="poke-types">${types}</div>
      </div>
    `;
  }).join('');
}

// --- Open modal detail ---
async function openPokeModal(id) {
  modalOverlay.style.display = 'flex';
  modalBody.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)"><span class="spinner" style="width:32px;height:32px;border-width:4px;display:inline-block"></span></div>`;

  try {
    const [pokeRes, speciesRes] = await Promise.all([
      fetch(`${BASE_URL}/pokemon/${id}`),
      fetch(`${BASE_URL}/pokemon-species/${id}`)
    ]);
    const poke    = await pokeRes.json();
    const species = await speciesRes.json();

    const img = poke.sprites.other?.['official-artwork']?.front_default
              || poke.sprites.front_default || '';

    const types = poke.types.map(t =>
      `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`
    ).join('');

    const statNames = { hp:'HP', attack:'Attack', defense:'Defense',
      'special-attack':'Sp. Atk', 'special-defense':'Sp. Def', speed:'Speed' };
    const statBars = poke.stats.map(s => `
      <div class="stat-row">
        <span class="stat-name">${statNames[s.stat.name] || s.stat.name}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar" style="width:${Math.min(100, (s.base_stat/255)*100).toFixed(1)}%"></div>
        </div>
        <span class="stat-num">${s.base_stat}</span>
      </div>
    `).join('');

    const abilities = poke.abilities.map(a =>
      a.ability.name.replace(/-/g,' ')
    ).join(', ');

    const flavorEntry = species.flavor_text_entries?.find(f => f.language.name === 'en');
    const flavor = flavorEntry
      ? flavorEntry.flavor_text.replace(/\f|\n/g, ' ')
      : '';

    modalBody.innerHTML = `
      <div class="modal-poke-header">
        ${img ? `<img class="modal-poke-img" src="${img}" alt="${poke.name}" />` : ''}
        <div class="modal-poke-id">#${String(poke.id).padStart(3,'0')}</div>
        <div class="modal-poke-name">${poke.name}</div>
        <div class="modal-poke-types">${types}</div>
        ${flavor ? `<p style="font-size:13px;color:var(--text-muted);margin-top:10px;font-style:italic">"${flavor}"</p>` : ''}
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Info</div>
        <div class="modal-info-grid">
          <div class="modal-info-item">
            <div class="modal-info-label">Tinggi</div>
            <div class="modal-info-value">${(poke.height/10).toFixed(1)} m</div>
          </div>
          <div class="modal-info-item">
            <div class="modal-info-label">Berat</div>
            <div class="modal-info-value">${(poke.weight/10).toFixed(1)} kg</div>
          </div>
          <div class="modal-info-item" style="grid-column:1/-1">
            <div class="modal-info-label">Abilities</div>
            <div class="modal-info-value" style="font-size:14px;text-transform:capitalize">${abilities}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Base Stats</div>
        <div class="stat-bars">${statBars}</div>
      </div>
    `;
  } catch (err) {
    modalBody.innerHTML = `<div style="text-align:center;padding:40px;color:var(--danger)">Gagal memuat detail: ${err.message}</div>`;
  }
}

// --- Close modal ---
function closeModal() {
  modalOverlay.style.display = 'none';
  modalBody.innerHTML = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// --- Events ---
pokeLoadBtn.addEventListener('click', loadPokeList);
pokeSearchBtn.addEventListener('click', searchPoke);
pokeSearch.addEventListener('keydown', e => { if (e.key === 'Enter') searchPoke(); });

// --- Auto-load saat tab Fetch dibuka ---
document.querySelector('[data-tab="fetch"]').addEventListener('click', () => {
  if (pokeGrid.innerHTML === '') loadPokeList();
});


/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}