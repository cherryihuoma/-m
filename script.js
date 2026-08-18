// ─── CURSOR ───────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .product-card, .journal-card, .jf-card, .at-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
    ring.style.width    = '48px';
    ring.style.height   = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '8px';
    cursor.style.height = '8px';
    ring.style.width    = '32px';
    ring.style.height   = '32px';
  });
});

// ─── NAVIGATION ───────────────────────────────────────────
function showPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById('page-' + n);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── THEME ────────────────────────────────────────────────
(function () {
  const saved = localStorage.getItem('iaem-theme') || 'night';
  document.documentElement.dataset.theme = saved;

  const label  = document.getElementById('themeLabel');
  const labelM = document.getElementById('themeLabelMobile');
  if (label)  label.textContent  = saved === 'night' ? 'Night' : 'Day';
  if (labelM) labelM.textContent = saved === 'night' ? 'Night' : 'Day';

  const thumb = document.querySelector('.toggle-thumb');
  if (thumb && saved === 'day') thumb.style.transform = 'translateX(14px)';
})();

function toggleTheme() {
  const h      = document.documentElement;
  const label  = document.getElementById('themeLabel');
  const labelM = document.getElementById('themeLabelMobile');
  const isNight = h.dataset.theme === 'night';

  h.dataset.theme = isNight ? 'day' : 'night';
  localStorage.setItem('iaem-theme', h.dataset.theme);

  if (label)  label.textContent  = isNight ? 'Day' : 'Night';
  if (labelM) labelM.textContent = isNight ? 'Day' : 'Night';

  const thumb = document.querySelector('.toggle-thumb');
  if (thumb) thumb.style.transform = isNight ? 'translateX(14px)' : 'translateX(0)';
}

// ─── HAMBURGER / MOBILE MENU ──────────────────────────────
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

function navTo(page) {
  showPage(page);
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

document.addEventListener('click', function (e) {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    btn.classList.remove('open');
    menu.classList.remove('open');
  }
});

// ─── SPLASH SCREEN ────────────────────────────────────────
function initSplash() {
  const bar     = document.getElementById('splashBar');
  const percent = document.getElementById('splashPercent');
  const splash  = document.getElementById('splash');

  if (!bar || !percent || !splash) return;

  document.body.classList.add('splash-active');

  let progress = 0;

  const interval = setInterval(() => {
    const step = progress < 70 ? 2.2 : progress < 90 ? 0.8 : 0.3;
    progress = Math.min(progress + step, 99);
    bar.style.width     = progress + '%';
    percent.textContent = Math.floor(progress) + '%';
  }, 40);

  setTimeout(() => {
    clearInterval(interval);
    progress = 100;
    bar.style.width     = '100%';
    percent.textContent = '100%';

    setTimeout(() => {
      splash.classList.add('exit');
      document.body.classList.remove('splash-active');
      setTimeout(() => splash.remove(), 1000);
    }, 400);
  }, 2800);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSplash);
} else {
  initSplash();
}

// ─── JOURNAL ARTICLES ─────────────────────────────────────
const articles = [
  // ... (keep your existing articles array here)
];

// ─── OPEN ARTICLE ─────────────────────────────────────────
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;

  document.getElementById('articleDate').textContent     = article.date;
  document.getElementById('articleTag').textContent      = article.tag;
  document.getElementById('articleTitle').textContent    = article.title;
  document.getElementById('articleSubtitle').textContent = article.subtitle;
  document.getElementById('articleBody').innerHTML       = article.body;

  const heroImg = document.getElementById('articleHeroImg');
  heroImg.innerHTML = article.img
    ? `<img src="${article.img}" alt="${article.title}" loading="lazy"/>`
    : `<div class="article-img-placeholder">${article.imgPlaceholder}</div>`;

  const others = articles.filter(a => a.id !== id).slice(0, 2);
  document.getElementById('articleNextGrid').innerHTML = others.map(a => `
    <a href="#" class="article-next-card" onclick="openArticle(${a.id}); return false;">
      <span class="anc-tag">${a.tag}</span>
      <div class="anc-title">${a.title}</div>
    </a>
  `).join('');

  showPage('article');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── PRODUCTS — loaded from products.js (array) ───────────
const productMap = {};
products.forEach(p => { 
  // Ensure all products have required fields
  p.status = p.status || 'available';
  p.season = p.season || 'ss2026';
  p.featured = p.featured || false;
  p.colours = p.colours || [];
  productMap[p.id] = p; 
});

// ─── SHOP — pagination state ──────────────────────────────
const SHOP_PER_PAGE = 6;
let shopPage        = 1;
let shopFiltered    = [...products];

const activeFilters = {
  category: 'all',
  season:   'all',
  status:   'all'
};

// Build one card element
function buildProductCard(p) {
  const hasColours  = Array.isArray(p.colours) && p.colours.length >= 2;
  const coloursAttr = hasColours
    ? `data-colours='${JSON.stringify(p.colours).replace(/'/g, "&#39;")}'`
    : '';
  const tagHTML  = p.tag ? `<div class="product-tag-overlay">${p.tag}</div>` : '';
  const imgInner = hasColours
    ? `<img class="pi-layer pi-layer-a" src="${p.colours[0].img}" alt="${p.name}" loading="lazy" />
       <img class="pi-layer pi-layer-b" src="${p.colours[1].img}" alt="${p.name}" loading="lazy" />
       ${tagHTML}
       <div class="pi-swatches"></div>`
    : `<img src="${p.img}" alt="${p.name}" loading="lazy" />${tagHTML}`;

  const card = document.createElement('div');
  card.className = 'product-card shop-product-card';
  card.dataset.category = p.filter;
  card.dataset.season   = p.season;
  card.dataset.status   = p.status;
  card.setAttribute('onclick', `openProduct('${p.id}')`);
  card.innerHTML = `
    <div class="product-img ${hasColours ? 'pi-swatch-host' : ''}" ${hasColours ? 'data-auto="true"' : ''} ${coloursAttr}>
      ${imgInner}
    </div>
    <div class="product-info">
      <div class="product-category">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <button type="button" class="btn-view">View Details</button>
    </div>`;
  return card;
}

// Render current page of filtered products into the grid
function renderShopPage() {
  const grid      = document.querySelector('#page-shop .shop-grid');
  const loadMoreBtn = document.getElementById('shopLoadMore');
  const countEl   = document.getElementById('shopCount');
  const noResults = document.getElementById('shopNoResults');
  if (!grid) return;

  const total   = shopFiltered.length;
  const visible = shopPage * SHOP_PER_PAGE;

  // Clear and re-render all visible cards
  grid.innerHTML = '';
  shopFiltered.slice(0, visible).forEach(p => {
    const card = buildProductCard(p);
    grid.appendChild(card);
  });

  // Init swatches on new cards
  grid.querySelectorAll('.pi-swatch-host').forEach(initSwatchHost);

  // Load More button
  if (loadMoreBtn) {
    if (visible < total) {
      loadMoreBtn.style.display = 'flex';
      const remaining = total - visible;
      loadMoreBtn.textContent = `Load More — ${Math.min(SHOP_PER_PAGE, remaining)} more`;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Count label
  if (countEl) {
    countEl.textContent = `Showing ${Math.min(visible, total)} of ${total} piece${total !== 1 ? 's' : ''}`;
  }

  // No results
  if (noResults) {
    noResults.style.display = total === 0 ? 'block' : 'none';
  }
}

// Apply filters and reset to page 1
function applyShopFilters() {
  shopPage = 1;
  shopFiltered = products.filter(p => {
    const catMatch    = activeFilters.category === 'all' || activeFilters.category === p.filter;
    const seasonMatch = activeFilters.season   === 'all' || activeFilters.season   === p.season;
    const statusMatch = activeFilters.status   === 'all' || activeFilters.status   === p.status;
    return catMatch && seasonMatch && statusMatch;
  });
  renderShopPage();
}

// Load more — increment page and re-render
function shopLoadMore() {
  shopPage++;
  renderShopPage();
  // Scroll to first new card smoothly
  const grid  = document.querySelector('#page-shop .shop-grid');
  const cards = grid.querySelectorAll('.product-card');
  const firstNew = cards[(shopPage - 1) * SHOP_PER_PAGE];
  if (firstNew) firstNew.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Build the full shop section (grid + controls)
function buildShopGrid() {
  const gridWrap = document.querySelector('.shop-grid-wrap');
  if (!gridWrap) return;

  // Inject load-more controls if not already present
  if (!document.getElementById('shopLoadMore')) {
    const controls = document.createElement('div');
    controls.className = 'shop-controls';
    controls.innerHTML = `
      <p class="shop-count" id="shopCount"></p>
      <div class="shop-no-results" id="shopNoResults" style="display:none;">No products match these filters.</div>
      <button type="button" class="btn-load-more" id="shopLoadMore" onclick="shopLoadMore()" style="display:none;">
        Load More
      </button>`;
    gridWrap.appendChild(controls);
  }

  // Wire up filter links
  document.querySelectorAll('.shop-sidebar .filter-item').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const group  = this.dataset.group;
      const filter = this.dataset.filter;
      if (!group || !filter) return;

      activeFilters[group] = filter;

      document.querySelectorAll(`.shop-sidebar [data-group="${group}"]`).forEach(l => {
        l.classList.remove('active');
      });
      this.classList.add('active');
      applyShopFilters();
    });
  });

  // Initial render
  applyShopFilters();
}

// ─── RENDER HOME FEATURED FROM products.js ────────────────
function buildFeaturedGrid() {
  const grid = document.querySelector('.featured-grid');
  if (!grid) return;

  const featured = products.filter(p => p.featured);
  grid.innerHTML = '';

  featured.forEach(p => {
    const hasColours = Array.isArray(p.colours) && p.colours.length >= 2;
    const coloursAttr = hasColours
      ? `data-colours='${JSON.stringify(p.colours).replace(/'/g, "&#39;")}'`
      : '';

    const tagHTML = p.tag
      ? `<div class="product-tag-overlay">${p.tag}</div>` : '';

    const imgInner = hasColours
      ? `<img class="pi-layer pi-layer-a" src="${p.colours[0].img}" alt="${p.name}" loading="lazy" />
         <img class="pi-layer pi-layer-b" src="${p.colours[1].img}" alt="${p.name}" loading="lazy" />
         ${tagHTML}
         <div class="pi-swatches"></div>`
      : `<img src="${p.img}" alt="${p.name}" loading="lazy" />${tagHTML}`;

    const swatchClass = hasColours ? 'pi-swatch-host' : '';
    const autoAttr    = hasColours ? 'data-auto="true"' : '';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('onclick', `openProduct('${p.id}')`);

    card.innerHTML = `
      <div class="product-img ${swatchClass}" ${autoAttr} ${coloursAttr}>
        ${imgInner}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <button type="button" class="btn-view">View Details</button>
      </div>`;

    grid.appendChild(card);
  });

  // Re-init swatches for newly rendered cards
  document.querySelectorAll('.featured-grid .pi-swatch-host').forEach(initSwatchHost);
}

// ─── OPEN PRODUCT MODAL ────────────────────────────────────
function openProduct(id) {
  const p = productMap[id];
  if (!p) return;

  document.getElementById('modalImg').src              = p.img;
  document.getElementById('modalImg').alt              = p.name;
  document.getElementById('modalTag').textContent      = p.tag || '';
  document.getElementById('modalTag').style.display    = p.tag ? 'block' : 'none';
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalName').textContent     = p.name;
  document.getElementById('modalDesc').textContent     = p.desc;
  document.getElementById('modalType').textContent     = p.type;
  document.getElementById('modalPrice').textContent    = p.price;

  const coloursEl  = document.getElementById('modalColours');
  const coloursRow = document.getElementById('modalColoursRow');
  const colours    = Array.isArray(p.colours) ? p.colours : [];

  if (colours.length > 0) {
    coloursEl.innerHTML = colours.map((c, i) => `
      <div
        class="colour-swatch${i === 0 ? ' selected' : ''}"
        style="background:${c.hex};"
        title="${c.name}"
        role="button"
        aria-label="Select ${c.name} colour"
        tabindex="0"
        onclick="selectModalColour(this, '${id}', ${i})"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectModalColour(this,'${id}',${i});}"
      ></div>
    `).join('');
    coloursRow.style.display = 'flex';
  } else {
    coloursEl.innerHTML      = '';
    coloursRow.style.display = 'none';
  }

  document.getElementById('modalWhatsapp').href =
    `https://wa.me/2348078970306?text=${p.whatsapp}`;

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  
  // Focus the modal for accessibility
  document.querySelector('.modal-box').focus();
}

// ─── COLOUR SELECTION IN MODAL ─────────────────────────────
function selectModalColour(el, productId, colourIndex) {
  // Update selected swatch highlight
  const container = document.getElementById('modalColours');
  container.querySelectorAll('.colour-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');

  // Also swap modal image to match chosen colour
  const p = productMap[productId];
  if (p && p.colours && p.colours[colourIndex]) {
    const img = document.getElementById('modalImg');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = p.colours[colourIndex].img;
      img.style.opacity = '1';
    }, 200);
  }
}

// ─── CLOSE PRODUCT MODAL ──────────────────────────────────
function closeModalBtn() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('productModal')) closeModalBtn();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalBtn();
});

// ─── PRODUCT IMAGE SWATCH SYSTEM ──────────────────────────
function crossfadeTo(host, imgSrc) {
  const a = host.querySelector('.pi-layer-a');
  const b = host.querySelector('.pi-layer-b');
  if (!a || !b) return;
  const showingB = host.classList.contains('pi-show-b');

  if (showingB) {
    a.src = imgSrc;
    const flip = () => host.classList.remove('pi-show-b');
    a.onload = flip;
    if (a.complete) flip();
  } else {
    b.src = imgSrc;
    const flip = () => host.classList.add('pi-show-b');
    b.onload = flip;
    if (b.complete) flip();
  }
}

function setActiveSwatch(host, index) {
  host.querySelectorAll('.pi-swatch').forEach((s, i) => {
    s.classList.toggle('pi-active', i === index);
  });
}

function initSwatchHost(host) {
  let colours;
  try {
    colours = JSON.parse(host.dataset.colours);
  } catch (e) {
    return;
  }
  if (!colours || colours.length < 2) return;

  const swatchContainer = host.querySelector('.pi-swatches');
  if (!swatchContainer) return;

  let currentIndex = 0;
  let autoTimer    = null;
  let isAuto       = true;

  colours.forEach((colour, i) => {
    const dot = document.createElement('div');
    dot.className        = 'pi-swatch' + (i === 0 ? ' pi-active' : '');
    dot.style.background = colour.hex;
    dot.dataset.name     = colour.name;
    dot.setAttribute('title', colour.name);
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Switch to ${colour.name}`);

    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAuto();
      switchTo(i);
    });

    swatchContainer.appendChild(dot);
  });

  function switchTo(index) {
    if (index === currentIndex) return;
    currentIndex = index;
    setActiveSwatch(host, currentIndex);
    crossfadeTo(host, colours[currentIndex].img);
  }

  function startAuto() {
    isAuto = true;
    host.dataset.auto = 'true';
    autoTimer = setInterval(() => {
      const next = (currentIndex + 1) % colours.length;
      currentIndex = next;
      setActiveSwatch(host, currentIndex);
      crossfadeTo(host, colours[currentIndex].img);
    }, 3500);
  }

  function stopAuto() {
    isAuto = false;
    host.dataset.auto = 'false';
    clearInterval(autoTimer);
  }

  host.addEventListener('mouseenter', () => { if (isAuto) clearInterval(autoTimer); });
  host.addEventListener('mouseleave', () => { if (isAuto) startAuto(); });

  startAuto();
}

document.querySelectorAll('.pi-swatch-host').forEach(initSwatchHost);

// ─── BOOT — render grids from products.js ─────────────────
document.addEventListener('DOMContentLoaded', function () {
  buildFeaturedGrid();
  buildShopGrid();
});
