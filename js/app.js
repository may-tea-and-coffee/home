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

  setText('footerAddress', config.store.address);
  setText('footerPhone', config.store.phoneDisplay);
  setText('footerEmail', config.store.email);
}

function applyTheme() {
  document.body.classList.remove('dark-mode', 'sunset-mode');
  $$('.dynamic-logo').forEach(img => {
    img.src = 'assets/logo-dark.png';
  });
}

function initTheme() {
  applyTheme();
  const themeButton = $('#themeToggle');
  if (themeButton) themeButton.remove();
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

  $('#storeHours').innerHTML = config.store.hours
    .map(hour => `<span class="hours-pill"><strong>${hour.day}</strong> · ${hour.time}</span>`)
    .join('');
}

function renderPromotions() {
  const promos = config.promotions.filter(p => p.enabled);
  const grid = $('#promoGrid');
  if (!grid) return;

  if (!promos.length) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = promos.map(p => `
    <article class="promo-card flip-promo-card reveal" tabindex="0" role="button" aria-label="Flip promotion card">
      <div class="promo-inner">
        <div class="promo-face promo-front">
          <img src="${p.image}" alt="${p.title}">
          <div class="promo-card-body">
            <span class="promo-label">${p.label}</span>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <span class="tap-note"><i class="fa-solid fa-hand-pointer"></i> Tap to flip</span>
          </div>
        </div>

        <div class="promo-face promo-back">
          <div class="cloud-stamp-preview">
            ${Array.from({ length: 10 }, (_, i) => `
              <span class="mini-cloud-stamp ${i === 9 ? 'free-stamp' : ''}">
                <i class="fa-solid ${i === 9 ? 'fa-gift' : 'fa-cloud'}"></i>
              </span>
            `).join('')}
          </div>

          <span class="promo-label">${p.backTitle || 'Details'}</span>
          <h3>${p.title}</h3>
          <p>${p.backDescription || p.description}</p>
          <a class="btn primary" href="${p.link}">${p.cta}</a>
        </div>
      </div>
    </article>
  `).join('');

  initFlipCards();
}

function renderCards() {
  if (config.cards.gift.enabled) {
    setText('giftCardTitle', config.cards.gift.title);
    setText('giftCardDescription', config.cards.gift.description);
    const giftImage = $('#giftCardImage');
    if (giftImage) giftImage.src = config.cards.gift.image;
  }
}

function renderTabs() {
  const tabs = [{ id: 'all', title: 'All' }, ...config.menu.map(c => ({ id: c.id, title: c.title }))];
  $('#categoryTabs').innerHTML = tabs
    .map(t => `<button class="tab-button ${t.id === activeCategory ? 'active' : ''}" data-category="${t.id}">${t.title}</button>`)
    .join('');

  $$('.tab-button').forEach(btn => btn.addEventListener('click', () => {
    activeCategory = btn.dataset.category;
    renderTabs();
    renderMenu();
  }));
}

function renderFeatured() {
  $('#featuredStrip').innerHTML = config.featuredDrinks
    .map(name => `<span class="featured-chip"><i class="fa-solid fa-star"></i> ${name}</span>`)
    .join('');
}

function getAllMenuItems() {
  return config.menu.flatMap(category =>
    category.items.map(item => ({
      ...item,
      categoryTitle: category.title
    }))
  );
}

function renderTopDrinks() {
  const grid = $('#topDrinksGrid');
  if (!grid) return;

  const allItems = getAllMenuItems();
  const topItems = config.featuredDrinks
    .map(name => allItems.find(item => item.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean)
    .slice(0, 6);

  grid.innerHTML = topItems.map(item => `
    <article class="top-drink-card reveal">
      <div class="top-drink-image">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}">`
          : `<i class="fa-solid fa-mug-hot"></i>`
        }
      </div>

      <div class="top-drink-copy">
        <span>${item.categoryTitle}</span>
        <h3>${item.name}</h3>
        <p>${item.desc || 'Handcrafted drink.'}</p>
        <strong>${formatPrice(item.price)}</strong>
      </div>
    </article>
  `).join('');
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
  $('#toppingGrid').innerHTML = config.toppings.map(t => `
    <article class="topping-card ${t.tag === 'new' ? 'new' : ''}">
      ${t.image ? `<img src="${t.image}" alt="${t.name}">` : `<div class="topping-icon"><i class="fa-solid fa-circle"></i></div>`}
      <div><strong>${t.name}</strong><span>+${money(t.price)}</span></div>
    </article>
  `).join('');

  $('#syrupGrid').innerHTML = config.syrups.map(s => `<span class="pill">${s} +$0.50</span>`).join('');
  $('#sauceGrid').innerHTML = config.sauces.map(s => `<span class="pill">${s} +$0.75</span>`).join('');
}

function renderSocial() {
  const socialWrap = $('#socialLinks');
  if (!socialWrap) return;

  const socials = [
    ['instagram', 'fa-instagram'],
    ['tiktok', 'fa-tiktok'],
    ['facebook', 'fa-facebook-f'],
    ['googleReview', 'fa-google']
  ];

  socialWrap.innerHTML = socials
    .filter(([key]) => config.social[key])
    .map(([key, icon]) => `<a href="${config.social[key]}" target="_blank" rel="noreferrer" aria-label="${key}"><i class="fa-brands ${icon}"></i></a>`)
    .join('');
}

function openHomePanel(panelName) {
  $$('.home-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.panel === panelName);
  });

  $$('.compact-panel').forEach(section => {
    section.classList.toggle('active', section.dataset.panelSection === panelName);
  });

  const target = document.querySelector(`[data-panel-section="${panelName}"]`);
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  observeReveals();
}

function initHomePanels() {
  $$('.home-tab').forEach(btn => {
    btn.addEventListener('click', () => openHomePanel(btn.dataset.panel));
  });

  $$('[data-open-panel]').forEach(btn => {
    btn.addEventListener('click', () => openHomePanel(btn.dataset.openPanel));
  });
}

function initFlipCards() {
  $$('.flip-promo-card').forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      card.classList.toggle('flipped');
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  $$('.flip-gift-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
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

  const closeAnnouncement = () => {
    $('#announcementModal').hidden = true;
    document.body.classList.remove('modal-open');
    $('#announcementCard')?.classList.remove('flipped');
  };

  const viewAnnouncementTarget = (event) => {
    if (event) event.preventDefault();
    closeAnnouncement();
    const panelName = a.buttonLink.replace('#', '');
    openHomePanel(panelName);
    const target = document.querySelector(a.buttonLink);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  };

  setTimeout(() => {
    $('#announcementModal').hidden = false;
    document.body.classList.add('modal-open');
    sessionStorage.setItem('maytea-announcement-seen', '1');
  }, 800);

  $$('[data-close-announcement]').forEach(el => el.addEventListener('click', closeAnnouncement));
  $('#announcementButton').addEventListener('click', viewAnnouncementTarget);
  $('#announcementViewFromBack').addEventListener('click', viewAnnouncementTarget);
  $('#announcementFlipButton').addEventListener('click', () => $('#announcementCard').classList.toggle('flipped'));
}

function initMobileMenu() {
  const drawer = $('#mobileDrawer');
  const open = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  };

  $('#mobileMenuButton')?.addEventListener('click', open);
  $('#closeMobileDrawer')?.addEventListener('click', close);
  $$('#mobileDrawer a').forEach(link => link.addEventListener('click', close));
}

function initSearch() {
  const search = $('#menuSearch');
  if (!search) return;

  search.addEventListener('input', event => {
    searchTerm = event.target.value.trim();
    renderMenu();
  });
}

function observeReveals() {
  const reveals = $$('.reveal:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach(el => observer.observe(el));
}

function initHeaderScroll() {
  const header = $('#siteHeader');
  const setState = () => header.classList.toggle('scrolled', window.scrollY > 18);
  setState();
  window.addEventListener('scroll', setState, { passive: true });
}

function init() {
  initTheme();
  setLinks();
  renderHero();
  renderPromotions();
  renderCards();
  renderTopDrinks();
  renderTabs();
  renderFeatured();
  renderMenu();
  renderCustomization();
  renderSocial();
  initHomePanels();
  initAnnouncement();
  initMobileMenu();
  initSearch();
  initFlipCards();
  initHeaderScroll();
  setText('year', new Date().getFullYear());
  observeReveals();

  window.addEventListener('load', () => {
    setTimeout(() => $('#siteLoader').classList.add('hide'), 450);
  });
}

init();
