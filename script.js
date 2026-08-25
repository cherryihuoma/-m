/*
 * Îæm — Tech · Fashion · Empire
 * © 2026 Îæm. All rights reserved.
 * contact: iaemhq@gmail.com
 */

// ─── CURSOR ───────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .product-card, .journal-card, .jf-card, .at-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    ring.style.width = '48px';
    ring.style.height = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    ring.style.width = '32px';
    ring.style.height = '32px';
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

  const label = document.getElementById('themeLabel');
  const labelM = document.getElementById('themeLabelMobile');
  if (label) label.textContent = saved === 'night' ? 'Night' : 'Day';
  if (labelM) labelM.textContent = saved === 'night' ? 'Night' : 'Day';

  const thumb = document.querySelector('.toggle-thumb');
  if (thumb && saved === 'day') thumb.style.transform = 'translateX(14px)';
})();

function toggleTheme() {
  const h = document.documentElement;
  const label = document.getElementById('themeLabel');
  const labelM = document.getElementById('themeLabelMobile');
  const isNight = h.dataset.theme === 'night';

  h.dataset.theme = isNight ? 'day' : 'night';
  localStorage.setItem('iaem-theme', h.dataset.theme);

  if (label) label.textContent = isNight ? 'Day' : 'Night';
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
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    btn.classList.remove('open');
    menu.classList.remove('open');
  }
});

// ─── SPLASH SCREEN ────────────────────────────────────────
function initSplash() {
  const bar = document.getElementById('splashBar');
  const percent = document.getElementById('splashPercent');
  const splash = document.getElementById('splash');

  if (!bar || !percent || !splash) return;

  document.body.classList.add('splash-active');

  let progress = 0;

  const interval = setInterval(() => {
    const step = progress < 70 ? 2.2 : progress < 90 ? 0.8 : 0.3;
    progress = Math.min(progress + step, 99);
    bar.style.width = progress + '%';
    percent.textContent = Math.floor(progress) + '%';
  }, 40);

  setTimeout(() => {
    clearInterval(interval);
    progress = 100;
    bar.style.width = '100%';
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
  {
    id: 1,
    date: 'Apr 28, 2026',
    tag: 'Tech × Fashion',
    title: 'Why the most stylish people I know all think like engineers',
    subtitle: 'There\'s a pattern I keep noticing. The people with the sharpest aesthetic instincts are the same ones who obsess over systems.',
    img: 'images/fashiontech.jpg',
    imgPlaceholder: 'Tech',
    body: `
      <p>There's a pattern I keep noticing. The people with the sharpest aesthetic instincts are the same ones who obsess over systems, efficiency, and elegant solutions. It's not a coincidence.</p>
      <p>When you think about it, <strong>design and engineering are solving the same problem</strong> — how do you take something complex and make it feel inevitable? A well-written function and a perfectly tailored jacket both do this. They both look easy from the outside. They're not.</p>
      <blockquote>The best designers I know think in systems. The best engineers I know think in aesthetics.</blockquote>
      <h2>The overlap nobody talks about</h2>
      <p>Fashion people talk about proportion, weight, tension, and balance. Engineers talk about load, stress, tolerance, and equilibrium. Different words. Same conversation.</p>
      <div class="article-divider"></div>
      <p><strong>That's what Îæm is built on.</strong> Not fashion. Not tech. The refusal to choose.</p>
    `
  },
  {
    id: 2,
    date: 'Apr 14, 2026',
    tag: 'Brand',
    title: 'Building in public before the doors open',
    subtitle: 'Why I started Îæm before I had a single product, a team, or an office.',
    img: 'images/brandtech.jpg',
    imgPlaceholder: 'Brand',
    body: `
      <p>Most people wait until everything is ready before they show the world what they're building. I think that's the wrong move.</p>
      <p>I started Îæm with nothing but a name, a color palette, and a point of view. No products. No team. No funding. Just a clear idea of what this brand stands for and the discipline to document it from day one.</p>
      <blockquote>The process is the brand. The work is the proof.</blockquote>
      <h2>Why building in public works</h2>
      <p>When you build in public, you're not just marketing — you're <strong>creating the origin story in real time</strong>.</p>
      <div class="article-divider"></div>
      <p><strong>Start before you're ready. Document everything.</strong> That's the whole strategy.</p>
    `
  },
  {
    id: 3,
    date: 'Mar 30, 2026',
    tag: 'Empire',
    title: 'The campus is the first market',
    subtitle: 'University isn\'t just where you learn. It\'s your first audience and first real test of brand.',
    img: 'images/empiretech.jpg',
    imgPlaceholder: 'Empire',
    body: `
      <p>Every empire needs a first territory. For Îæm, that territory is campus.</p>
      <p>Think about what a university actually is — hundreds of people with opinions, taste, and the desire to be seen. They're early adopters by nature. They take risks. They talk. <strong>If your brand works on campus, it works.</strong></p>
      <h2>The campus advantage</h2>
      <p>On campus you have direct access to your audience every single day. You can test ideas in real time.</p>
      <blockquote>You don't need a store. You need a presence.</blockquote>
      <div class="article-divider"></div>
      <p><strong>The campus is the first market. And I intend to own it.</strong></p>
    `
  },
  {
    id: 4,
    date: 'Mar 15, 2026',
    tag: 'Fashion',
    title: 'Coffee brown and why warm colours own the room',
    subtitle: 'Colour psychology, brand identity, and why I chose a shade most brands are afraid of.',
    img: 'images/colortech.jpg',
    imgPlaceholder: 'Fashion',
    body: `
      <p>Most brands default to black, white, or navy when they want to signal premium. It's safe. It's familiar. It's also completely forgettable.</p>
      <p>I chose coffee brown — <strong>#4B2E2B</strong> — as the main colour of Îæm. People thought I was making a mistake. I knew I wasn't.</p>
      <h2>What warm colours actually do</h2>
      <p>Warm colours create psychological safety. They signal approachability without sacrificing authority. Brown in particular carries connotations of <em>craft, earth, reliability, and richness</em>.</p>
      <blockquote>The most powerful colour choice is the one nobody else was brave enough to make.</blockquote>
      <div class="article-divider"></div>
      <p><strong>Colour is the first thing people feel before they read a single word.</strong> Make it count.</p>
    `
  },
  {
    id: 5,
    date: 'Mar 01, 2026',
    tag: 'Tech',
    title: 'What wearable tech gets wrong about fashion people',
    subtitle: 'Tech companies keep making wearables for engineers. Nobody asked them to.',
    img: 'images/fashiontech2.jpg',
    imgPlaceholder: 'Tech',
    body: `
      <p>Every major tech company has tried to crack wearables. Most of them have failed — not technically, but culturally. The reason is simple: <strong>they design for engineers, not for people who care how they look.</strong></p>
      <p>The Apple Watch is a remarkable piece of engineering. It is also, depending on the band, either aggressively sporty or aggressively corporate. There is no in-between. There is no elegance.</p>
      <h2>What fashion people actually want</h2>
      <p>Fashion people want technology that disappears into the garment. They want function that doesn't announce itself.</p>
      <blockquote>The best technology is invisible. The best fashion is unforgettable.</blockquote>
      <div class="article-divider"></div>
      <p><strong>That's the product Îæm is moving toward.</strong> Tech that a fashion person would actually choose.</p>
    `
  },
  {
    id: 6,
    date: 'Feb 20, 2026',
    tag: 'Empire',
    title: 'The name: why Îæm means what it means',
    subtitle: 'A breakdown of the thinking behind the characters, the pronunciation, and the intention.',
    img: 'images/brandtech2.jpg',
    imgPlaceholder: 'Empire',
    body: `
      <p>People always ask about the name. The characters. The spelling. What it means, how you say it, why it looks like that.</p>
      <p>The answer is intentional on every level.</p>
      <h2>The characters</h2>
      <p>The <strong>Î</strong> — a capital I with a circumflex — signals that this is not standard English. It belongs to multiple languages and to none of them completely.</p>
      <p>The <strong>æ</strong> — an ash ligature — is one of the oldest characters in the Latin alphabet. It's ancient and modern simultaneously.</p>
      <blockquote>Identity doesn't have to be legible to everyone. It has to be unmistakable to the right ones.</blockquote>
      <div class="article-divider"></div>
      <p><strong>The name was always right. We just needed to exist to prove it.</strong></p>
    `
  }
];

// ─── OPEN ARTICLE ─────────────────────────────────────────
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;

  document.getElementById('articleDate').textContent = article.date;
  document.getElementById('articleTag').textContent = article.tag;
  document.getElementById('articleTitle').textContent = article.title;
  document.getElementById('articleSubtitle').textContent = article.subtitle;
  document.getElementById('articleBody').innerHTML = article.body;

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

// ─── PRODUCTS — loaded from products.js ───────────────────
const productMap = {};
products.forEach(p => {
  p.status = p.status || 'available';
  p.season = p.season || 'ss2026';
  p.featured = p.featured || false;
  p.colours = p.colours || [];
  productMap[p.id] = p;
});

// ─── SHOP PAGINATION ──────────────────────────────────────
const SHOP_PER_PAGE = 6;
let shopPage = 1;
let shopFiltered = [...products];

const activeFilters = {
  category: 'all',
  season: 'all',
  status: 'all'
};

function buildProductCard(p) {
  const hasColours = Array.isArray(p.colours) && p.colours.length >= 2;
  const coloursAttr = hasColours
    ? `data-colours='${JSON.stringify(p.colours).replace(/'/g, "&#39;")}'`
    : '';
  const tagHTML = p.tag ? `<div class="product-tag-overlay">${p.tag}</div>` : '';
  const imgInner = hasColours
    ? `<img class="pi-layer pi-layer-a" src="${p.colours[0].img}" alt="${p.name}" loading="lazy" />
       <img class="pi-layer pi-layer-b" src="${p.colours[1].img}" alt="${p.name}" loading="lazy" />
       ${tagHTML}
       <div class="pi-swatches"></div>`
    : `<img src="${p.img}" alt="${p.name}" loading="lazy" />${tagHTML}`;

  const card = document.createElement('div');
  card.className = 'product-card shop-product-card';
  card.dataset.category = p.filter;
  card.dataset.season = p.season;
  card.dataset.status = p.status;
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

function renderShopPage() {
  const grid = document.querySelector('#page-shop .shop-grid');
  const loadMoreBtn = document.getElementById('shopLoadMore');
  const countEl = document.getElementById('shopCount');
  const noResults = document.getElementById('shopNoResults');
  if (!grid) return;

  const total = shopFiltered.length;
  const visible = shopPage * SHOP_PER_PAGE;

  grid.innerHTML = '';
  shopFiltered.slice(0, visible).forEach(p => {
    grid.appendChild(buildProductCard(p));
  });

  grid.querySelectorAll('.pi-swatch-host').forEach(initSwatchHost);

  if (loadMoreBtn) {
    if (visible < total) {
      loadMoreBtn.style.display = 'flex';
      const remaining = total - visible;
      loadMoreBtn.textContent = `Load More — ${Math.min(SHOP_PER_PAGE, remaining)} more`;
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  if (countEl) {
    countEl.textContent = `Showing ${Math.min(visible, total)} of ${total} piece${total !== 1 ? 's' : ''}`;
  }

  if (noResults) {
    noResults.style.display = total === 0 ? 'block' : 'none';
  }
}

function applyShopFilters() {
  shopPage = 1;
  shopFiltered = products.filter(p => {
    const catMatch = activeFilters.category === 'all' || activeFilters.category === p.filter;
    const seasonMatch = activeFilters.season === 'all' || activeFilters.season === p.season;
    const statusMatch = activeFilters.status === 'all' || activeFilters.status === p.status;
    return catMatch && seasonMatch && statusMatch;
  });
  renderShopPage();
}

function shopLoadMore() {
  shopPage++;
  renderShopPage();
  const grid = document.querySelector('#page-shop .shop-grid');
  const cards = grid.querySelectorAll('.product-card');
  const firstNew = cards[(shopPage - 1) * SHOP_PER_PAGE];
  if (firstNew) firstNew.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function buildShopGrid() {
  const gridWrap = document.querySelector('.shop-grid-wrap');
  if (!gridWrap) return;

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

  document.querySelectorAll('.shop-sidebar .filter-item').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const group = this.dataset.group;
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

  applyShopFilters();
}

// ─── RENDER HOME FEATURED ─────────────────────────────────
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
    const tagHTML = p.tag ? `<div class="product-tag-overlay">${p.tag}</div>` : '';
    const imgInner = hasColours
      ? `<img class="pi-layer pi-layer-a" src="${p.colours[0].img}" alt="${p.name}" loading="lazy" />
         <img class="pi-layer pi-layer-b" src="${p.colours[1].img}" alt="${p.name}" loading="lazy" />
         ${tagHTML}
         <div class="pi-swatches"></div>`
      : `<img src="${p.img}" alt="${p.name}" loading="lazy" />${tagHTML}`;

    const card = document.createElement('div');
    card.className = 'product-card';
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
    grid.appendChild(card);
  });

  document.querySelectorAll('.featured-grid .pi-swatch-host').forEach(initSwatchHost);
}

// ─── OPEN PRODUCT MODAL ───────────────────────────────────
function openProduct(id) {
  const p = productMap[id];
  if (!p) return;

  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').alt = p.name;
  document.getElementById('modalTag').textContent = p.tag || '';
  document.getElementById('modalTag').style.display = p.tag ? 'block' : 'none';
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalType').textContent = p.type;
  document.getElementById('modalPrice').textContent = p.price;

  const coloursEl = document.getElementById('modalColours');
  const coloursRow = document.getElementById('modalColoursRow');
  const colours = Array.isArray(p.colours) ? p.colours : [];

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
    coloursEl.innerHTML = '';
    coloursRow.style.display = 'none';
  }

  document.getElementById('modalWhatsapp').href =
    `https://wa.me/2348078970306?text=${p.whatsapp}`;

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.querySelector('.modal-box').focus();
}

// ─── COLOUR SELECTION IN MODAL ────────────────────────────
function selectModalColour(el, productId, colourIndex) {
  const container = document.getElementById('modalColours');
  container.querySelectorAll('.colour-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');

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
  let autoTimer = null;
  let isAuto = true;

  colours.forEach((colour, i) => {
    const dot = document.createElement('div');
    dot.className = 'pi-swatch' + (i === 0 ? ' pi-active' : '');
    dot.style.background = colour.hex;
    dot.dataset.name = colour.name;
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

// ─── ORDER FORM COLOUR SELECTION ──────────────────────────
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('colour-option')) {
    document.querySelectorAll('.colour-option').forEach(el => {
      el.classList.remove('selected');
    });
    e.target.classList.add('selected');
    const selectedColour = e.target.dataset.colour;
    document.getElementById('selectedColour').value = selectedColour;
  }
});

// ─── ORDER FORM SUBMISSION HANDLING ───────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
      console.log('Order enquiry submitted:', {
        name: document.getElementById('fullName').value,
        whatsapp: document.getElementById('whatsapp').value,
        product: document.getElementById('productInterest').value,
        colour: document.getElementById('selectedColour').value,
        source: document.getElementById('source').value,
        notes: document.getElementById('notes').value
      });
    });
  }
});

// ─── ORDER STATUS SYSTEM (Google Sheets Powered) ────────
const ORDER_API_URL = 'https://script.google.com/macros/s/AKfycbzaPpUIhBFVou4dHQsom3bn2_bM45a_h9u91PFh0OFWPyHvOOV_XqseczNEHJGayBE-hA/exec?key=iaem-2026-secret';

async function checkOrderStatus(event) {
  event.preventDefault();
  
  const orderId = document.getElementById('orderId').value.trim().toUpperCase();
  const result = document.getElementById('orderResult');
  const button = event.target.querySelector('button');
  
  button.textContent = 'Checking...';
  button.disabled = true;
  
  try {
    const response = await fetch(`${ORDER_API_URL}&id=${orderId}`);
    const data = await response.json();
    
    if (data.error) {
      document.getElementById('resultOrderId').textContent = 'Order not found';
      document.getElementById('resultStatus').textContent = 'Please check your Order ID';
      document.getElementById('resultStatus').className = 'order-status-badge status-enquiry';
      document.getElementById('resultDetails').textContent = 'If you believe this is an error, contact us on WhatsApp.';
    } else {
      document.getElementById('resultOrderId').textContent = 'Order ' + data.orderId;
      document.getElementById('resultStatus').textContent = data.status;
      
      // Show customer name
      const customerNameEl = document.getElementById('resultCustomerName');
      if (customerNameEl && data.customerName) {
        const firstName = data.customerName.trim().split(' ')[0];
        customerNameEl.textContent = 'Hi, ' + firstName + '!';
        customerNameEl.style.display = 'block';
      }
      
      // Set status class
      let statusClass = 'status-enquiry';
      const statusLower = (data.status || '').toLowerCase();
      switch(statusLower) {
        case 'confirmed': statusClass = 'status-confirmed'; break;
        case 'in production': statusClass = 'status-production'; break;
        case 'complete': statusClass = 'status-complete'; break;
        case 'shipped': statusClass = 'status-shipped'; break;
        case 'out for delivery': statusClass = 'status-out-for-delivery'; break;
        case 'delivered': statusClass = 'status-delivered'; break;
        case 'enquiry': statusClass = 'status-enquiry'; break;
      }
      document.getElementById('resultStatus').className = 'order-status-badge ' + statusClass;
      
      // Show product image
      const productDisplay = document.getElementById('orderProductDisplay');
      const productImg = document.getElementById('orderProductImg');
      const productName = document.getElementById('orderProductName');
      const productColour = document.getElementById('orderProductColour');
      
      if (productDisplay && data.product) {
        const matchedProduct = Object.values(productMap).find(p => 
          p.name.toLowerCase().includes(data.product.toLowerCase())
        );
        if (matchedProduct) {
          let colourImage = matchedProduct.img;
          const customerColour = data.colour || '';
          
          if (customerColour && matchedProduct.colours && matchedProduct.colours.length > 0) {
            const matchedColour = matchedProduct.colours.find(c => 
              c.name.toLowerCase().includes(customerColour.toLowerCase())
            );
            if (matchedColour) {
              colourImage = matchedColour.img;
            }
          }
          
          productImg.src = colourImage;
          productName.textContent = matchedProduct.name;
          productColour.textContent = 'Colour: ' + (data.colour || 'Not specified');
          productDisplay.style.display = 'flex';
        } else {
          productDisplay.style.display = 'none';
        }
      }
      
      // Build details text with clean date
      let detailsText = data.details || 'No details available.';
      if (data.dateUpdated) {
        const rawDate = data.dateUpdated;
        const cleanDate = new Date(rawDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        detailsText += `\n\nLast updated: ${cleanDate}`;
      }
      document.getElementById('resultDetails').textContent = detailsText;
    }
    
    result.classList.add('visible');
  } catch (error) {
    console.error('Error checking order:', error);
    document.getElementById('resultOrderId').textContent = 'Error';
    document.getElementById('resultStatus').textContent = 'Something went wrong';
    document.getElementById('resultStatus').className = 'order-status-badge status-enquiry';
    document.getElementById('resultDetails').textContent = 'Please try again or contact us on WhatsApp.';
    result.classList.add('visible');
  } finally {
    button.textContent = 'Check Status';
    button.disabled = false;
  }
}
// ─── INSTALL PROMPT ──────────────────────────────────────
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted install');
        const installBtn = document.getElementById('installBtn');
        if (installBtn) installBtn.style.display = 'none';
      }
      deferredPrompt = null;
    });
  } else {
    alert('Install option not available yet. Use your browser menu → Install app.');
  }
}
// ─── BOOT — render grids from products.js ─────────────────
document.addEventListener('DOMContentLoaded', function () {
  buildFeaturedGrid();
  buildShopGrid();
});
