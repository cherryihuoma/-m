 // CURSOR
const cursor = document.getElementById('cursor'), ring = document.getElementById('cursorRing');
      
let mx = 0, my = 0, rx = 0, ry = 0;
      
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
      
(function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); })();
     
document.querySelectorAll('a, button, .product-card, .journal-card, .jf-card, .at-card').forEach(el => {el.addEventListener('mouseenter', () => { cursor.style.width = '16px'; cursor.style.height = '16px'; ring.style.width = '48px'; ring.style.height = '48px'; });

el.addEventListener('mouseleave', () => { cursor.style.width = '8px'; cursor.style.height = '8px'; ring.style.width = '32px'; ring.style.height = '32px'; });
});

// NAVIGATION
function showPage(n) {
document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
document.getElementById('page-' + n).classList.add('active');
window.scrollTo({ top: 0, behavior: 'smooth' });
}

// THEME
function toggleTheme() {
const h = document.documentElement, l = document.getElementById('themeLabel');
if (h.dataset.theme === 'night') { h.dataset.theme = 'day'; l.textContent = 'Day'; }
else { h.dataset.theme = 'night'; l.textContent = 'Night'; }
}
 
// SHOP FILTERS
document.querySelectorAll('.filter-item').forEach(f => {f.addEventListener('click', function(e) {e.preventDefault();
this.closest('.shop-sidebar').querySelectorAll('.filter-item').forEach(x => x.classList.remove('active'));
this.classList.add('active');
});
});
 
// HAMBURGER
function toggleMenu() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
}

// close menu when a nav link is tapped
function navTo(page) {
  showPage(page);
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

// close menu if user taps outside
document.addEventListener('click', function(e) {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    btn.classList.remove('open');
    menu.classList.remove('open');
  }
});
// SPLASH SCREEN
(function() {
  document.body.classList.add('splash-active');

  const bar     = document.getElementById('splashBar');
  const percent = document.getElementById('splashPercent');
  const splash  = document.getElementById('splash');

  let progress = 0;

  // loading bar fills over ~2 seconds
  const interval = setInterval(() => {
    // slows down near the end for effect
    const step = progress < 70 ? 2.2 : progress < 90 ? 0.8 : 0.3;
    progress = Math.min(progress + step, 99);
    bar.style.width = progress + '%';
    percent.textContent = Math.floor(progress) + '%';
  }, 40);

  // after 2.8s — jump to 100% and exit
  setTimeout(() => {
    clearInterval(interval);
    progress = 100;
    bar.style.width = '100%';
    percent.textContent = '100%';

    // short pause at 100% then split
    setTimeout(() => {
      splash.classList.add('exit');
      document.body.classList.remove('splash-active');

      // remove from DOM after animation completes
      setTimeout(() => {
        splash.remove();
      }, 1000);
    }, 400);

  }, 2800);
})();

// JOURNAL DATA — add your articles here
const articles = [
  {
    id: 1,
    date: 'Apr 28, 2026',
    tag: 'Tech × Fashion',
    title: 'Why the most stylish people I know all think like engineers',
    subtitle: 'There\'s a pattern I keep noticing. The people with the sharpest aesthetic instincts are the same ones who obsess over systems.',
    imgPlaceholder: 'Tech',
    img:'images/fashiontech.jpg',
    body: `
      <p>There's a pattern I keep noticing. The people with the sharpest aesthetic instincts are the same ones who obsess over systems, efficiency, and elegant solutions. It's not a coincidence.</p>
      <p>When you think about it, <strong>design and engineering are solving the same problem</strong> — how do you take something complex and make it feel inevitable? A well-written function and a perfectly tailored jacket both do this. They both look easy from the outside. They're not.</p>
      <blockquote>The best designers I know think in systems. The best engineers I know think in aesthetics.</blockquote>
      <h2>The overlap nobody talks about</h2>
      <p>Fashion people talk about proportion, weight, tension, and balance. Engineers talk about load, stress, tolerance, and equilibrium. Different words. Same conversation.</p>
      <p>I started noticing this when I began building Îæm. Every decision I made about the brand — the color palette, the typography, the way the logo sits on the page — followed the same logic I use when I write code. <em>Does this earn its place? What does this remove? What does this add?</em></p>
      <div class="article-divider"></div>
      <p>The most powerful thing you can do as a creative person in 2026 is refuse the false choice between thinking and feeling, between logic and taste. The people who own rooms are the ones who show up with both.</p>
      <p><strong>That's what Îæm is built on.</strong> Not fashion. Not tech. The refusal to choose.</p>
    `
  },
  {
    id: 2,
    date: 'Apr 14, 2026',
    tag: 'Brand',
    title: 'Building in public before the doors open',
    subtitle: 'Why I started Îæm before I had a single product, a team, or an office.',
    imgPlaceholder: 'Brand',
    img:'images/brandtech.jpg',
    body: `
      <p>Most people wait until everything is ready before they show the world what they're building. I think that's the wrong move.</p>
      <p>I started Îæm with nothing but a name, a color palette, and a point of view. No products. No team. No funding. Just a clear idea of what this brand stands for and the discipline to document it from day one.</p>
      <blockquote>The process is the brand. The work is the proof.</blockquote>
      <h2>Why building in public works</h2>
      <p>When you build in public, you're not just marketing — you're <strong>creating the origin story in real time</strong>. Every journal post, every design decision shared, every honest reflection becomes part of the mythology of the brand.</p>
      <p>By the time the first product drops, the audience already knows who you are. They've watched you think. They've seen you wrestle with decisions. They trust you — not because you told them to, but because they watched you earn it.</p>
      <div class="article-divider"></div>
      <p>Stuffs hasn't started yet. The products don't exist yet. But Îæm is already real — because the thinking is real, and the thinking is public.</p>
      <p><strong>Start before you're ready. Document everything.</strong> That's the whole strategy.</p>
    `
  },
  {
    id: 3,
    date: 'Mar 30, 2026',
    tag: 'Empire',
    title: 'The campus is the first market',
    subtitle: 'University isn\'t just where you learn. It\'s your first audience, your first collaborators, your first real test of brand.',
    imgPlaceholder: 'Empire',
    img:'images/empiretech.jpg',
    body: `
      <p>Every empire needs a first territory. For Îæm, that territory is campus.</p>
      <p>Think about what a university actually is — hundreds of people with opinions, taste, and the desire to be seen. They're early adopters by nature. They take risks. They talk. <strong>If your brand works on campus, it works.</strong></p>
      <h2>The campus advantage</h2>
      <p>On campus you have direct access to your audience every single day. You can test ideas in real time. You can see what resonates and what doesn't — not through analytics, but through actual human reactions.</p>
      <p>The person who shows up dressed sharply and carries themselves with intention gets noticed. Not because they're loud, but because <em>consistency is its own kind of authority.</em></p>
      <blockquote>You don't need a store. You need a presence.</blockquote>
      <div class="article-divider"></div>
      <p>By the time I finish my first year, Îæm will have been tested in the most honest market there is — a campus full of people with good eyes and no patience for anything that isn't real.</p>
      <p><strong>The campus is the first market. And I intend to own it.</strong></p>
    `
  },
  {
    id: 4,
    date: 'Mar 15, 2026',
    tag: 'Fashion',
    title: 'Coffee brown and why warm colours own the room',
    subtitle: 'Colour psychology, brand identity, and why I chose a shade that most brands are afraid of.',
    imgPlaceholder: 'Fashion',
    img:'images/colortech.jpg',
    body: `
      <p>Most brands default to black, white, or navy when they want to signal premium. It's safe. It's familiar. It's also completely forgettable.</p>
      <p>I chose coffee brown — <strong>#4B2E2B</strong> — as the main colour of Îæm. People thought I was making a mistake. I knew I wasn't.</p>
      <h2>What warm colours actually do</h2>
      <p>Warm colours create psychological safety. They signal approachability without sacrificing authority. Brown in particular carries connotations of <em>craft, earth, reliability, and richness</em> — everything a brand built on quality should feel like.</p>
      <blockquote>The most powerful colour choice is the one nobody else was brave enough to make.</blockquote>
      <p>When everyone else zigs to black, you zag to brown. You become the only one. And being the only one is the entire point.</p>
      <div class="article-divider"></div>
      <p>The cream background, the soft black text, the rare cherry red and controlled gold — every colour in the Îæm system was chosen to work together as a feeling, not just a palette.</p>
      <p><strong>Colour is the first thing people feel before they read a single word.</strong> Make it count.</p>
    `
  },
  {
    id: 5,
    date: 'Mar 01, 2026',
    tag: 'Tech',
    title: 'What wearable tech gets wrong about fashion people',
    subtitle: 'Tech companies keep making wearables for engineers. Nobody asked them to.',
    imgPlaceholder: 'Tech',
    img:'images/fashiontech2.jpg',
    body: `
      <p>Every major tech company has tried to crack wearables. Most of them have failed — not technically, but culturally. The reason is simple: <strong>they design for engineers, not for people who care how they look.</strong></p>
      <p>The Apple Watch is a remarkable piece of engineering. It is also, depending on the band, either aggressively sporty or aggressively corporate. There is no in-between. There is no elegance.</p>
      <h2>What fashion people actually want</h2>
      <p>Fashion people want technology that disappears into the garment. They want function that doesn't announce itself. They want <em>the power without the billboard.</em></p>
      <blockquote>The best technology is invisible. The best fashion is unforgettable. The intersection is where Îæm lives.</blockquote>
      <div class="article-divider"></div>
      <p>The gap in the market isn't a smarter watch. It's a wearable that understands that how something looks is not separate from how it works — it <em>is</em> how it works, for the person wearing it.</p>
      <p><strong>That's the product Îæm is moving toward.</strong> Tech that a fashion person would actually choose.</p>
    `
  },
  {
    id: 6,
    date: 'Feb 20, 2026',
    tag: 'Empire',
    title: 'The name: why Îæm means what it means',
    subtitle: 'A breakdown of the thinking behind the characters, the pronunciation, and the intention.',
    imgPlaceholder: 'Empire',
    img:'images/brandtech2.jpg',
    body: `
      <p>People always ask about the name. The characters. The spelling. What it means, how you say it, why it looks like that.</p>
      <p>The answer is intentional on every level.</p>
      <h2>The characters</h2>
      <p>The <strong>Î</strong> — a capital I with a circumflex — signals that this is not standard English. It belongs to multiple languages and to none of them completely. That's deliberate. The brand doesn't belong to one culture or one context.</p>
      <p>The <strong>æ</strong> — an ash ligature — is one of the oldest characters in the Latin alphabet. It's ancient and modern simultaneously. It looks right in a medieval manuscript and in a sans-serif logo. Again, deliberate.</p>
      <blockquote>Identity doesn't have to be legible to everyone. It has to be unmistakable to the right ones.</blockquote>
      <h2>The pronunciation</h2>
      <p>There isn't one correct pronunciation. Say it however feels right to you. <em>That's part of the point.</em> A brand that makes you decide something about it before you've bought anything — that's a brand that's already working.</p>
      <div class="article-divider"></div>
      <p>The name is a mirror. What you see in it says something about you. And the people who get it — who feel it without needing it explained — those are exactly the people Îæm is for.</p>
      <p><strong>The name was always right. We just needed to exist to prove it.</strong></p>
    `
  }
];

// OPEN ARTICLE
function openArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;

  // populate fields
  document.getElementById('articleDate').textContent     = article.date;
  document.getElementById('articleTag').textContent      = article.tag;
  document.getElementById('articleTitle').textContent    = article.title;
  document.getElementById('articleSubtitle').textContent = article.subtitle;
  document.getElementById('articleBody').innerHTML       = article.body;

  // hero image or placeholder
  const heroImg = document.getElementById('articleHeroImg');
  heroImg.innerHTML = article.img
    ? `<img src="${article.img}" alt="${article.title}"/>`
    : `<div class="article-img-placeholder">${article.imgPlaceholder}</div>`;

  // next articles — show 2 others
  const others = articles.filter(a => a.id !== id).slice(0, 2);
  document.getElementById('articleNextGrid').innerHTML = others.map(a => `
    <a href="#" class="article-next-card" onclick="openArticle(${a.id});return false;">
      <span class="anc-tag">${a.tag}</span>
      <div class="anc-title">${a.title}</div>
    </a>
  `).join('');

  showPage('article');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}