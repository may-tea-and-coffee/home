/*
  MAY TEA & COFFEE WEBSITE CONFIG
  Edit this file to update banners, promotions, menu, images, social links, and store info.
  Set enabled: true/false to show or hide sections without deleting them.
*/

window.MAYTEA_CONFIG = {
  store: {
    name: "May Tea & Coffee",
    shortName: "MAY",
    tagline: "Soft clouds. Real matcha. Crafted daily.",
    phone: "7247188684",
    phoneDisplay: "(724) 718-8684",
    email: "mayteacoffee98@gmail.com",
    address: "1101 N Hermitage Rd, Hermitage, PA 16148",
    mapUrl: "https://www.google.com/maps/dir/?api=1&destination=1101+N+Hermitage+Rd+Hermitage+PA+16148",
    hours: [
      { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
      { day: "Sunday", time: "11:00 AM – 7:00 PM" }
    ]
  },

  theme: {
    defaultMode: "light", // light | dark | sunset
    allowThemeSwitch: true
  },

  announcement: {
    enabled: true,
    title: "Loyalty Card Reward",
    headline: "Free drink on your 10th cup",
    message: "Collect one cloud stamp for every drink. Fill the loyalty card and redeem one free drink on your 10th cup.",
    buttonText: "View loyalty card",
    buttonLink: "#loyalty",
    image: "assets/gift-card.png",
    showOncePerVisit: false
  },

  promotions: [
    {
      id: "loyalty-free-10th",
      enabled: true,
      label: "Now Available",
      title: "Cloud Stamp Loyalty Card",
      description: "Buy 9 drinks, collect 9 cloud stamps, and enjoy your 10th drink free.",
      cta: "See details",
      link: "#loyalty",
      image: "assets/gift-card.png"
    },
    {
      id: "trial-opening-30",
      enabled: false,
      label: "Hidden Promotion",
      title: "Trial Opening Celebration — 30% OFF",
      description: "This promotion is currently hidden. Turn enabled to true when you want to show it again.",
      cta: "Explore menu",
      link: "#menu",
      image: "assets/poster-matcha-cover.png"
    },
    {
      id: "social-10-off",
      enabled: false,
      label: "Hidden Promotion",
      title: "Follow + Google Review = 10% OFF",
      description: "Show social follow and Google review at the register to receive a discount.",
      cta: "Connect with us",
      link: "#social",
      image: "assets/poster-matcha-studio.png"
    }
  ],

  hero: {
    eyebrow: "Matcha Series Launch",
    title: "Take a Break, Sip Some Matcha",
    description: "Premium matcha, Vietnamese coffee, milk tea, fruit tea, smoothies, and cloud-style toppings made for every mood.",
    primaryButton: { text: "Explore menu", link: "#menu" },
    secondaryButton: { text: "Gift cards", link: "#gift-card" },
    image: "assets/poster-matcha-studio.png"
  },

  featuredDrinks: [
    "Matcha Latte",
    "Strawberry Matcha Latte",
    "Mango Matcha Latte",
    "Peach Matcha Latte",
    "Salted Cream Coffee",
    "Taro Milk Tea"
  ],

  menu: [
    {
      id: "matcha",
      title: "Matcha Series",
      description: "Premium matcha with creamy milk, fruit layers, or frappe texture.",
      items: [
        { name: "Matcha Latte", price: { M: 5.75, L: 6.50 }, desc: "Silky milk and premium matcha.", tags: ["popular"], image: "assets/may-matcha-cup.png" },
        { name: "Matcha Latte Frappe", price: { M: 6.00, L: 6.75 }, desc: "Icy, creamy matcha blended smooth.", tags: ["popular"], image: "assets/poster-matcha-cover.png" },
        { name: "Strawberry Matcha Latte", price: { M: 6.00, L: 6.75 }, desc: "Strawberry layer, milk, and matcha cloud.", tags: ["popular", "fruit"], image: "assets/poster-matcha-studio.png" },
        { name: "Mango Matcha Latte", price: { M: 6.00, L: 6.75 }, desc: "Juicy mango with smooth matcha.", tags: ["new", "fruit"], image: "assets/poster-matcha-cover.png" },
        { name: "Peach Matcha Latte", price: { M: 6.00, L: 6.75 }, desc: "Peach fruit base with a green matcha finish.", tags: ["new", "fruit"], image: "assets/poster-matcha-cover.png" }
      ]
    },
    {
      id: "coffee",
      title: "Coffee Series",
      description: "Vietnamese coffee, espresso, latte, and sweet cream coffee.",
      note: "Hot or iced. Cold brew and decaf available upon request +$0.50.",
      items: [
        { name: "Americano", price: { M: 4.00, L: 4.75 }, desc: "Clean espresso over water.", tags: [] },
        { name: "Espresso", price: { S: 3.50 }, desc: "Strong single coffee shot.", tags: [] },
        { name: "Latte", price: { M: 4.75, L: 5.50 }, desc: "Espresso with steamed milk.", tags: [] },
        { name: "Vietnamese Phin Coffee", price: { S: 4.00 }, desc: "Traditional phin-style coffee.", tags: ["popular"] },
        { name: "Vietnamese Milk Coffee", price: { S: 4.50 }, desc: "Bold coffee with condensed milk.", tags: ["popular"] },
        { name: "Bac Xiu Sweet Milk Coffee", price: { M: 5.00, L: 5.75 }, desc: "Creamy Vietnamese sweet milk coffee.", tags: ["popular"] },
        { name: "Salted Cream Coffee", price: { M: 5.25, L: 6.00 }, desc: "Coffee topped with savory cream foam.", tags: ["top"] },
        { name: "Mocha", price: { M: 5.50, L: 6.25 }, desc: "Chocolate coffee blend.", tags: [] },
        { name: "Caramel Frappe", price: { M: 5.50, L: 6.25 }, desc: "Caramel blended coffee frappe.", tags: [] },
        { name: "Mocha Frappe", price: { M: 5.50, L: 6.25 }, desc: "Mocha blended with ice.", tags: [] }
      ]
    },
    {
      id: "milk-tea",
      title: "Milk Tea",
      description: "Classic milk tea and creamy house flavors.",
      items: [
        { name: "House Special Milk Tea", price: { L: 6.25 }, desc: "Signature house blend.", tags: ["popular"] },
        { name: "Oreo Cream Milk Tea", price: { L: 6.25 }, desc: "Milk tea with Oreo cream notes.", tags: [] },
        { name: "Brown Sugar Boba Milk", price: { M: 5.50, L: 6.25 }, desc: "Brown sugar syrup with milk and boba.", tags: ["popular"] },
        { name: "Taro Milk Tea", price: { L: 6.25 }, desc: "Creamy taro milk tea.", tags: ["popular"] },
        { name: "Earl Grey Milk Tea", price: { L: 5.75 }, desc: "Floral black tea with milk.", tags: [] },
        { name: "Thai Milk Tea", price: { L: 5.75 }, desc: "Classic Thai tea flavor.", tags: [] },
        { name: "Green Thai Milk Tea", price: { L: 5.75 }, desc: "Green Thai tea with milk.", tags: ["new"] }
      ]
    },
    {
      id: "fruit-tea",
      title: "Fruit Tea",
      description: "Bright teas with fruit flavors and refreshing finishes.",
      items: [
        { name: "Fresh Fruit Tea", price: { L: 6.25 }, desc: "Assorted fresh fruit tea blend.", tags: ["popular"] },
        { name: "Very Berry Tea", price: { L: 6.25 }, desc: "Mixed berry tea.", tags: ["fruit"] },
        { name: "Peach Orange Lemongrass Tea", price: { L: 6.25 }, desc: "Peach, orange, and lemongrass.", tags: ["fruit"] },
        { name: "Peach Tea", price: { L: 5.75 }, desc: "Classic peach green tea.", tags: [] },
        { name: "Strawberry Green Tea", price: { L: 5.75 }, desc: "Strawberry and green tea.", tags: [] },
        { name: "Blueberry Green Tea", price: { L: 5.75 }, desc: "Blueberry fruit tea.", tags: ["new"] },
        { name: "Mango Green Tea", price: { L: 5.75 }, desc: "Mango and green tea.", tags: [] },
        { name: "Lemon Green Tea", price: { L: 5.75 }, desc: "Lemon green tea refresher.", tags: [] },
        { name: "Lemon Thai Green Tea", price: { L: 5.75 }, desc: "Thai green tea with lemon.", tags: ["new"] }
      ]
    },
    {
      id: "ice-blended",
      title: "Ice Blended",
      description: "Frappe and smoothie drinks blended to order.",
      items: [
        { name: "Oreo Cookies Frappe", price: { M: 6.00, L: 6.75 }, desc: "Creamy Oreo cookie frappe.", tags: ["popular"] },
        { name: "Taro Frappe", price: { M: 6.00, L: 6.75 }, desc: "Smooth taro ice blend.", tags: [] },
        { name: "Strawberry Choco Frappe", price: { M: 6.00, L: 6.75 }, desc: "Strawberry and chocolate blend.", tags: [] },
        { name: "Mint Choco Frappe", price: { M: 6.00, L: 6.75 }, desc: "Mint chocolate frappe.", tags: [] },
        { name: "Berry Mix Smoothie", price: { M: 6.00, L: 6.75 }, desc: "Strawberry, blueberry, raspberry.", tags: ["fruit"] },
        { name: "Tropical Smoothie", price: { M: 6.00, L: 6.75 }, desc: "Mango, orange, passion fruit.", tags: ["fruit"] },
        { name: "Peach Smoothie", price: { M: 6.00, L: 6.75 }, desc: "Peach blended smoothie.", tags: [] },
        { name: "Mango Smoothie", price: { M: 6.00, L: 6.75 }, desc: "Mango blended smoothie.", tags: ["new"] }
      ]
    },
    {
      id: "sparkling",
      title: "Sparkling Creations",
      description: "Fresh sparkling fruit drinks.",
      items: [
        { name: "Blue Sky Sparkler", price: { L: 6.25 }, desc: "Bright soda-style refresher.", tags: [] },
        { name: "Strawberry Sparkler", price: { L: 6.25 }, desc: "Strawberry sparkling drink.", tags: ["new"] },
        { name: "Peach Sparkler", price: { L: 6.25 }, desc: "Peach sparkling drink.", tags: [] },
        { name: "Mango Sparkler", price: { L: 6.25 }, desc: "Mango sparkling drink.", tags: ["new"] },
        { name: "Lemonade Sparkler", price: { L: 6.25 }, desc: "Sparkling lemonade.", tags: [] }
      ]
    },
    {
      id: "hot-drinks",
      title: "Hot Drinks",
      description: "Tea and warm comfort drinks.",
      items: [
        { name: "Hot Matcha Latte", price: { M: 5.75 }, desc: "Warm matcha latte.", tags: ["popular"] },
        { name: "Peach Orange Lemongrass Tea", price: { M: 5.50 }, desc: "Warm fruit and lemongrass tea.", tags: [] },
        { name: "Hot Chocolate", price: { M: 5.50 }, desc: "Classic hot chocolate.", tags: [] },
        { name: "Lemon & Ginger", price: { M: 4.25 }, desc: "Warm lemon ginger tea.", tags: [] },
        { name: "Peppermint", price: { M: 4.25 }, desc: "Peppermint herbal tea.", tags: [] },
        { name: "Chamomile", price: { M: 4.25 }, desc: "Chamomile herbal tea.", tags: [] },
        { name: "Green Tea", price: { M: 4.25 }, desc: "Classic green tea.", tags: [] },
        { name: "Earl Grey", price: { M: 4.25 }, desc: "Classic Earl Grey tea.", tags: [] }
      ]
    }
  ],

  toppings: [
    { name: "Brown Sugar Boba", price: 0.75, group: "Topping" },
    { name: "Coconut Jelly", price: 0.75, group: "Topping" },
    { name: "Crystal Boba", price: 0.75, group: "Topping" },
    { name: "Coffee Jelly", price: 0.75, group: "Topping" },
    { name: "Aloe Vera", price: 0.75, group: "Topping" },
    { name: "Strawberry Popping", price: 0.75, group: "Popping" },
    { name: "Blueberry Popping", price: 0.75, group: "Popping" },
    { name: "Passion Fruit Popping", price: 0.75, group: "Popping" },
    { name: "Mango Popping", price: 0.75, group: "Popping" },
    { name: "Green Apple Popping", price: 0.75, group: "Popping", tag: "new" },
    { name: "Yogurt Popping", price: 0.75, group: "Popping", tag: "new" },
    { name: "Sea Salt Milk Foam", price: 0.75, group: "Cream" },
    { name: "Whipping Cream", price: 0.75, group: "Cream" },
    { name: "Egg Cream Foam", price: 0.75, group: "Cream" },
    { name: "Cheese Foam", price: 0.75, group: "Cream" },
    { name: "Taro Paste", price: 0.75, group: "Cream" }
  ],

  sauces: [
    "Mocha Sauce", "White Chocolate Sauce", "Caramel Sauce"
  ],

  syrups: [
    "Caramel", "Honey", "Hazelnut", "Sugar-Free Caramel", "Peppermint", "Vanilla", "Sugar-Free Vanilla", "Sugar-Free Sweetener", "Toffee Nut", "Butterscotch", "Cinnamon", "Sugar-Free White Chocolate", "White Chocolate", "Strawberry", "Raspberry", "Toasted Marshmallow"
  ],

  customization: {
    ice: ["Regular 100%", "Less 50%", "No Ice 0%"],
    sugar: ["0%", "30%", "50%", "70%", "100%"],
    milk: ["Oat Milk +$0.75", "Almond Milk +$0.75", "Coconut Milk +$0.75"]
  },

  cards: {
    gift: {
      enabled: true,
      title: "Gift Cards",
      description: "A simple gift for matcha, tea, and coffee lovers. Ask at the register to purchase or reload a May Tea & Coffee gift card.",
      image: "assets/gift-card.png"
    },
    loyalty: {
      enabled: true,
      title: "Loyalty Card",
      description: "Fill the clouds with stamps. Receive one stamp per drink and earn a free drink on your 10th cup.",
      image: "assets/gift-card.png",
      pdf: "assets/loyalty-card.pdf",
      stampGoal: 9
    }
  },

  gallery: [
    { src: "assets/poster-matcha-cover.png", alt: "Matcha collection poster" },
    { src: "assets/poster-matcha-studio.png", alt: "Matcha drinks with warm background" },
    { src: "assets/may-matcha-cup.png", alt: "May matcha latte cup" },
    { src: "assets/menu-reference.png", alt: "May Tea and Coffee full printed menu" }
  ],

  social: {
    instagram: "https://www.instagram.com/mayteacoffee.pa",
    tiktok: "https://www.tiktok.com/@may.tea.coffee0",
    facebook: "https://www.facebook.com/profile.php?id=61587109587784",
    googleReview: "#"
  }
};
