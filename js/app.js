const config = window.MAYTEA_CONFIG;
let activeCategory = 'all';
let searchTerm = '';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

function formatPrice(price) {
  return Object.entries(price).map(([size, amount]) => `${size}: ${money(amount)}`).join(' / ');
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || '';
}

function setLinks() {
  const phoneHref = `tel:${config.store.phone}`;
  ['phoneLinkTop', 'phoneLink', 'mobileCall'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = phoneHref;
  });
  ['directionLinkTop', 'directionLink', 'mobileDirection'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = config.store.mapUrl;
  });
}

function applyTheme(mode) {
  document.body.classList.remove('dark-mode', 'sunset-mode');
  if (mode === 'dark') document.body.classList.add('dark-mode');
  if (mode === 'sunset') document.body.classList.add('sunset-mode');

  const icon = $('#themeToggle i');
  if (icon) icon.className = mode === 'dark' ? 'fa-solid fa-moon' : mode === 'sunset' ? 'fa-solid fa-cloud-sun' : 'fa-solid fa-sun';

  const logo = mode === 'dark' ? 'assets/logo-light.png' : mode === 'sunset' ? 'assets/logo-sunset.png' : 'assets/logo-dark.png';
  $$('.dynamic-logo').forEach(img => { img.src = logo; });
  localStorage.setItem('maytea-theme', mode);
}

function initTheme() {
  const saved = localStorage.getItem('maytea-theme') || config.theme.defaultMode;
  applyTheme(saved);
  if (config.theme.allowThemeSwitch) {
    $('#themeToggle').addEventListener('click', () => {
      const current = document.body.classList.contains('dark-mode') ? 'dark' : document.body.classList.contains('sunset-mode') ? 'sunset' : 'light';
      const next = current === 'light' ? 'sunset' : current === 'sunset' ? 'dark' : 'light';
      applyTheme(next);
    });
  } else {
    $('#themeToggle').hidden = true;
  }
}

function renderHero() {
  setText('heroEyebrow', config.hero.eyebrow);
  setText('heroTitle', config.hero.title);
  setText('heroDescription', config.hero.description);
  $('#heroPrimary').textContent = config.hero.primaryButton.text;
  $('#heroPrimary').href = config.hero.primaryButton.link;
  $('#heroSecondary').textContent = config.hero.secondaryButton.text;
  $('#heroSecondary').href = config.hero.secondaryButton.link;
  $('#heroImage').src = config.hero.image;

  $('#storeHours').innerHTML = config.store.hours.map(hour => `<span class="hours-pill"><strong>${hour.day}</strong> · ${hour.time}</span>`).join('');
}

function renderPromotions() {
  const promos = config.promotions.filter(p => p.enabled);
  const grid = $('#promoGrid');
  if (!promos.length) {
    grid.innerHTML = `<div class="promo-card"><div class="promo-card-body"><span class="promo-label">No public promotion</span><h3>Promotions are hidden</h3><p>Turn a promotion on in js/config.js when you are ready to show it.</p></div></div>`;
    return;
  }
  grid.innerHTML = promos.map(p => `
    <article class="promo-card reveal">
      <img src="${p.image}" alt="${p.title}">
      <div class="promo-card-body">
        <span class="promo-label">${p.label}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a class="btn soft" href="${p.link}">${p.cta}</a>
      </div>
    </article>
  `).join('');
}

function renderCards() {
  if (config.cards.loyalty.enabled) {
    setText('loyaltyTitle', config.cards.loyalty.title);
    setText('loyaltyDescription', config.cards.loyalty.description);
    $('#loyaltyImage').src = config.cards.loyalty.image;
    const stamps = Array.from({ length: config.cards.loyalty.stampGoal }, (_, index) => `<div class="stamp" aria-label="Stamp ${index + 1}"><i class="fa-solid fa-cloud"></i></div>`).join('');
    $('#stampCard').innerHTML = `${stamps}<div class="stamp-note"><strong>10th cup free</strong><span>Ask for a cloud stamp at checkout.</span></div>`;
  }
  if (config.cards.gift.enabled) {
    setText('giftCardTitle', config.cards.gift.title);
    setText('giftCardDescription', config.cards.gift.description);
    $('#giftCardImage').src = config.cards.gift.image;
  }
}

function renderTabs() {
  const tabs = [{ id: 'all', title: 'All' }, ...config.menu.map(c => ({ id: c.id, title: c.title }))];
  $('#categoryTabs').innerHTML = tabs.map(t => `<button class="tab-button ${t.id === activeCategory ? 'active' : ''}" data-category="${t.id}">${t.title}</button>`).join('');
  $$('.tab-button').forEach(btn => btn.addEventListener('click', () => {
    activeCategory = btn.dataset.category;
    renderTabs();
    renderMenu();
  }));
}

function renderFeatured() {
  $('#featuredStrip').innerHTML = config.featuredDrinks.map(name => `<span class="featured-chip"><i class="fa-solid fa-star"></i> ${name}</span>`).join('');
}

function itemMatches(item, category) {
  const text = `${item.name} ${item.desc || ''} ${category.title} ${(item.tags || []).join(' ')}`.toLowerCase();
  return text.includes(searchTerm.toLowerCase());
}

function renderMenu() {
  const categories = config.menu
    .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
    .map(cat => ({ ...cat, items: cat.items.filter(item => itemMatches(item, cat)) }))
    .filter(cat => cat.items.length);

  $('#menuGrid').innerHTML = categories.length ? categories.map(cat => `
    <section class="menu-category reveal" id="${cat.id}">
      <div class="menu-category-header">
        <div>
          <h3>${cat.title}</h3>
          <p>${cat.description}</p>
        </div>
        ${cat.note ? `<div class="menu-note">${cat.note}</div>` : ''}
      </div>
      <div class="drink-list">
        ${cat.items.map(item => `
          <article class="drink-card ${item.image ? 'has-image' : ''}">
            ${item.image ? `<div class="drink-photo"><img src="${item.image}" alt="${item.name}"></div>` : `<div class="drink-photo placeholder-drink"><i class="fa-solid fa-mug-hot"></i></div>`}
            <div class="drink-content">
              <div class="drink-top">
                <h4>${item.name}</h4>
                <div class="price">${formatPrice(item.price)}</div>
              </div>
              <p>${item.desc || 'Handcrafted drink.'}</p>
              <div class="badges">${(item.tags || []).map(tag => `<span class="badge">${tag}</span>`).join('')}</div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('') : `<div class="menu-category"><h3>No matching drinks</h3><p>Try another keyword or category.</p></div>`;
  observeReveals();
}

function renderCustomization() {
  const custom = config.customization;
  $('#customizationCards').innerHTML = [
    { icon: 'fa-snowflake', title: 'Ice Level', text: custom.ice.join(' • ') },
    { icon: 'fa-cubes-stacked', title: 'Sugar Level', text: custom.sugar.join(' • ') },
    { icon: 'fa-leaf', title: 'Milk Options', text: custom.milk.join(' • ') }
  ].map(card => `
    <div class="option-card"><i class="fa-solid ${card.icon}"></i><div><h3>${card.title}</h3><p>${card.text}</p></div></div>
  `).join('');

  $('#toppingGrid').innerHTML = config.toppings.map(t => `
    <article class="topping-card ${t.tag === 'new' ? 'new' : ''}">
      ${t.image ? `<img src="${t.image}" alt="${t.name}">` : `<div class="topping-icon"><i class="fa-solid fa-circle"></i></div>`}
      <div><strong>${t.name}</strong><span>+${money(t.price)}</span></div>
    </article>
  `).join('');
  $('#syrupGrid').innerHTML = config.syrups.map(s => `<span class="pill">${s} +$0.50</span>`).join('');
  $('#sauceGrid').innerHTML = config.sauces.map(s => `<span class="pill">${s} +$0.75</span>`).join('');
}

function renderGallery() {
  $('#galleryGrid').innerHTML = config.gallery.map(g => `
    <figure class="gallery-item reveal">
      <img src="${g.src}" alt="${g.alt}">
      <figcaption class="gallery-caption">${g.alt}</figcaption>
    </figure>
  `).join('');
}

function renderVisit() {
  setText('visitName', config.store.name);
  setText('visitAddress', config.store.address);
  $('#visitHours').innerHTML = config.store.hours.map(hour => `<div class="hour-row"><span>${hour.day}</span><span>${hour.time}</span></div>`).join('');
}

function renderSocial() {
  const socials = [
    ['instagram', 'fa-instagram'],
    ['tiktok', 'fa-tiktok'],
    ['facebook', 'fa-facebook-f'],
    ['googleReview', 'fa-google']
  ];
  $('#socialLinks').innerHTML = socials
    .filter(([key]) => config.social[key])
    .map(([key, icon]) => `<a href="${config.social[key]}" target="_blank" rel="noreferrer" aria-label="${key}"><i class="fa-brands ${icon}"></i></a>`).join('');
}

function initAnnouncement() {
  const a = config.announcement;
  if (!a.enabled) return;
  if (a.showOncePerVisit && sessionStorage.getItem('maytea-announcement-seen')) return;

  $('#announcementTitle').textContent = a.title;
  $('#announcementHeadline').textContent = a.headline;
  $('#announcementMessage').textContent = a.message;
  $('#announcementButton').textContent = a.buttonText;
  $('#announcementButton').href = a.buttonLink;
  $('#announcementImage').src = a.image;

  setTimeout(() => {
    $('#announcementModal').hidden = false;
    document.body.classList.add('modal-open');
    sessionStorage.setItem('maytea-announcement-seen', '1');
  }, 1150);

  const closeAnnouncement = () => {
    $('#announcementModal').hidden = true;
    document.body.classList.remove('modal-open');
  };

  $$('[data-close-announcement]').forEach(el => el.addEventListener('click', closeAnnouncement));
  $('#announcementButton').addEventListener('click', () => {
    closeAnnouncement();
    const target = document.querySelector(a.buttonLink);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  });
}

function initMobileMenu() {
  const drawer = $('#mobileDrawer');
  $('#mobileMenuButton').addEventListener('click', () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
  });
  $('#closeMobileDrawer').addEventListener('click', closeDrawer);
  $$('#mobileDrawer a').forEach(a => a.addEventListener('click', closeDrawer));
  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }
}

function initSearch() {
  $('#menuSearch').addEventListener('input', (event) => {
    searchTerm = event.target.value.trim();
    renderMenu();
  });
}

let revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
  }
  $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

function init() {
  initTheme();
  setLinks();
  renderHero();
  renderPromotions();
  renderCards();
  renderTabs();
  renderFeatured();
  renderMenu();
  renderCustomization();
  renderGallery();
  renderVisit();
  renderSocial();
  initAnnouncement();
  initMobileMenu();
  initSearch();
  setText('year', new Date().getFullYear());
  observeReveals();

  window.addEventListener('load', () => {
    setTimeout(() => $('#siteLoader').classList.add('hide'), 450);
  });
}

document.addEventListener('DOMContentLoaded', init);

