<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JS Tasks — Horangi</title>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ asset('css/tugas.css') }}" />
</head>
<body>

  <!-- ===== HEADER ===== -->
  <header class="site-header">
    <div class="header-inner">
      <div class="logo">
        <svg class="logo-tiger" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="24" cy="27" rx="17" ry="15" stroke="#2B5EA9" stroke-width="2.5"/>
          <circle cx="14" cy="14" r="5" stroke="#2B5EA9" stroke-width="2.5"/>
          <circle cx="34" cy="14" r="5" stroke="#2B5EA9" stroke-width="2.5"/>
          <ellipse cx="18" cy="26" rx="3" ry="4" fill="#2B5EA9"/>
          <ellipse cx="30" cy="26" rx="3" ry="4" fill="#2B5EA9"/>
          <path d="M19 34 Q24 38 29 34" stroke="#2B5EA9" stroke-width="2" stroke-linecap="round"/>
          <rect x="21" y="35" width="2.5" height="4" rx="1" fill="#EBA9B5"/>
          <rect x="24.5" y="35" width="2.5" height="4" rx="1" fill="#EBA9B5"/>
        </svg>
        <span class="logo-text">Horangi<span class="logo-sub">Tasks</span></span>
      </div>

      <nav class="tab-nav" role="tablist">
        <button class="tab-btn active" data-tab="todo" role="tab" aria-selected="true">
          <span class="tab-badge">T8</span>To-Do List
        </button>
        <button class="tab-btn" data-tab="array" role="tab" aria-selected="false">
          <span class="tab-badge">T9</span>Array Methods
        </button>
        <button class="tab-btn" data-tab="fetch" role="tab" aria-selected="false">
          <span class="tab-badge">T10</span>Fetch API
        </button>
      </nav>
    </div>
  </header>

  <!-- ===== DEKORASI ===== -->
  <div class="deco deco-star-tl" aria-hidden="true"></div>
  <div class="deco deco-star-br" aria-hidden="true"></div>
  <div class="deco deco-circle-tr" aria-hidden="true"></div>
  <div class="deco deco-circle-bl" aria-hidden="true"></div>

  <!-- ===== MAIN ===== -->
  <main class="main-content">

    <!-- ======== TUGAS 8: TO-DO LIST ======== -->
    <section class="tab-panel active" id="tab-todo" role="tabpanel">
      <div class="section-header">
        <h2 class="section-title">Interactive To-Do List</h2>
        <p class="section-desc">Tambah, selesaikan, hapus, dan filter tugas berdasarkan status. Data tersimpan di <code>localStorage</code>.</p>
      </div>

      <div class="card todo-card">
        <div class="todo-input-row">
          <input type="text" id="todo-input" class="field-input" placeholder="Tulis tugas baru..." maxlength="120" />
          <select id="todo-priority" class="field-select">
            <option value="low">🟢 Rendah</option>
            <option value="medium" selected>🟡 Sedang</option>
            <option value="high">🔴 Tinggi</option>
          </select>
          <button id="todo-add-btn" class="btn-primary">+ Tambah</button>
        </div>

        <!-- FILTER TASK -->
        <div class="todo-filters">
          <div class="filter-group" aria-label="Filter tugas berdasarkan status">
            <button class="filter-btn active" data-filter="all">
              Semua <span class="filter-count" id="filter-count-all">0</span>
            </button>
            <button class="filter-btn" data-filter="active">
              Aktif <span class="filter-count" id="filter-count-active">0</span>
            </button>
            <button class="filter-btn" data-filter="done">
              Selesai <span class="filter-count" id="filter-count-done">0</span>
            </button>
          </div>
          <span class="todo-count" id="todo-count">0 aktif · 0 selesai</span>
        </div>

        <ul class="todo-list" id="todo-list"></ul>

        <div class="empty-state" id="todo-empty" style="display:none">
          <div class="empty-icon">🐯</div>
          <p id="todo-empty-text">Belum ada tugas nih, yuk tambahkan!</p>
        </div>

        <div class="todo-footer">
          <button id="todo-clear-done" class="btn-ghost">Hapus selesai</button>
          <button id="todo-clear-all" class="btn-danger">Hapus semua</button>
        </div>
      </div>
    </section>

    <!-- ======== TUGAS 9: ARRAY METHODS ======== -->
    <section class="tab-panel" id="tab-array" role="tabpanel">
      <div class="section-header">
        <h2 class="section-title">Data Manipulation — Array Methods</h2>
        <p class="section-desc">Filter, sort, map, reduce, dan find pada data produk menggunakan array methods JavaScript.</p>
      </div>

      <div class="card">
        <div class="arr-controls">
          <div class="control-group">
            <label class="field-label">Cari produk</label>
            <input type="text" id="arr-search" class="field-input" placeholder="Nama produk..." />
          </div>

          <div class="control-group">
            <label class="field-label">Kategori</label>
            <select id="arr-category" class="field-select">
              <option value="all">Semua Kategori</option>
              <option value="Makanan">Makanan</option>
              <option value="Minuman">Minuman</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div class="control-group">
            <label class="field-label">Urutkan</label>
            <select id="arr-sort" class="field-select">
              <option value="default">Default</option>
              <option value="name-asc">Nama A–Z</option>
              <option value="name-desc">Nama Z–A</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="stock-asc">Stok Terendah</option>
            </select>
          </div>

          <div class="control-group">
            <label class="field-label">Harga maks (Rp)</label>
            <input type="number" id="arr-maxprice" class="field-input" placeholder="contoh: 50000" min="0" />
          </div>
        </div>

        <div class="arr-stats" id="arr-stats"></div>
        <div class="method-log" id="arr-method-log"></div>
        <div class="product-grid" id="product-grid"></div>
      </div>
    </section>

    <!-- ======== TUGAS 10: FETCH API ======== -->
    <section class="tab-panel" id="tab-fetch" role="tabpanel">
      <div class="section-header">
        <h2 class="section-title">Fetch API — PokéDex</h2>
        <p class="section-desc">Mengambil data Pokémon dari <a href="https://pokeapi.co" target="_blank" rel="noopener">PokeAPI</a> menggunakan <code>fetch()</code> secara asynchronous.</p>
      </div>

      <div class="card">
        <div class="fetch-controls">
          <div class="fetch-search-group">
            <input type="text" id="poke-search" class="field-input" placeholder="Cari nama/ID Pokémon..." />
            <button id="poke-search-btn" class="btn-primary">Cari</button>
          </div>

          <div class="fetch-load-group">
            <select id="poke-limit" class="field-select">
              <option value="12">12 Pokémon</option>
              <option value="24" selected>24 Pokémon</option>
              <option value="48">48 Pokémon</option>
            </select>
            <button id="poke-load-btn" class="btn-secondary">Muat Daftar</button>
          </div>
        </div>

        <div class="fetch-status" id="fetch-status"></div>
        <div class="poke-grid" id="poke-grid"></div>
      </div>
    </section>

  </main>

  <!-- ===== MODAL POKEMON ===== -->
  <div class="modal-overlay" id="poke-modal-overlay" style="display:none">
    <div class="modal-box" id="poke-modal">
      <button class="modal-close" id="modal-close" aria-label="Tutup">✕</button>
      <div id="modal-body"></div>
    </div>
  </div>

  <footer class="site-footer">
    <p>호랑이 &nbsp;·&nbsp; Halo aku adel &nbsp;·&nbsp; 187241021 &nbsp;·&nbsp; Sistem Informasi UNAIR 2026</p>
  </footer>

  <script src="{{ asset('js/tugas.js') }}"></script>
</body>
</html>