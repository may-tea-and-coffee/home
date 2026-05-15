# May Tea & Coffee Website Redesign

## Folder structure

```text
maytea_redesign/
├── index.html              # Main website page
├── css/
│   └── styles.css          # All styling, responsive layout, animations
├── js/
│   ├── config.js           # Edit menu, banners, promotions, images, store info here
│   └── app.js              # Website rendering logic; usually do not edit
└── assets/                 # Images, logos, PDF loyalty card
```

## How to preview locally

Option 1: open directly

```bash
open index.html
```

Option 2: run a local server from the folder

```bash
cd maytea_redesign
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to upload online

Upload the whole `maytea_redesign` folder contents to your hosting service. Keep this structure:

```text
index.html
css/styles.css
js/config.js
js/app.js
assets/...
```

Do not upload only `index.html`, because the page needs the CSS, JS, and image folders.

## Edit the announcement banner

Open:

```text
js/config.js
```

Find:

```js
announcement: {
  enabled: true,
  title: "Loyalty Card Reward",
  headline: "Free drink on your 10th cup",
  message: "Collect one cloud stamp for every drink...",
  buttonText: "View loyalty card",
  buttonLink: "#loyalty",
  image: "assets/gift-card.png",
  showOncePerVisit: false
}
```

Set `enabled: false` to hide the banner.

## Turn promotions on/off

Open `js/config.js`, find `promotions`, then change:

```js
enabled: true
```

or

```js
enabled: false
```

Current 30% off and social 10% off promotions are already hidden with `enabled: false`.

## Add or edit menu items

Open `js/config.js`, find `menu`, then edit category items:

```js
{ name: "New Drink Name", price: { M: 6.00, L: 6.75 }, desc: "Short description.", tags: ["new"] }
```

Useful tags:

```js
["new"]
["popular"]
["top"]
["fruit"]
```

## Add new toppings

Open `js/config.js`, find `toppings`, then add:

```js
{ name: "New Topping", price: 0.75, group: "Topping", tag: "new" }
```

## Replace photos

Put the new photo in:

```text
assets/
```

Then update the image path in `js/config.js`, for example:

```js
image: "assets/new-photo.png"
```

## Main features included

- One-page website: menu, gift card, loyalty card, gallery, location, hours
- One source menu controlled by `js/config.js`
- Announcement pop-up banner when the website opens
- Promotion switch on/off system
- Gift card section
- Loyalty card section for free 10th drink
- Searchable and category-filtered menu
- New menu items and toppings added
- Open animation / loading cloud
- Scroll reveal animation
- Moving cloud background
- Mobile-friendly bottom action bar
- Light, sunset, and dark theme switch
