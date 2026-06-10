const products = [

  {
    id:       'empire-jacket',
    name:     'The Empire Jacket',
    category: 'Fashion · Outerwear',
    filter:   'fashion',
    tag:      'New',
    img:      'images/black empire jacket.png',
    desc:     'A structured statement jacket built for those who walk into every room already owning it. Clean architectural lines, premium fabric, and the unmistakable Îæm precision in every seam.',
    type:     'Outerwear — Jacket',
    colours: [
      { name: 'Coffee Brown', hex: '#4B2E2B', img: 'images/brown empire jacket.jpg' },
      { name: 'Soft Black',   hex: '#1C1412', img: 'images/black empire jacket.png' },
      { name: 'Cream',        hex: '#F5E9E2', img: 'images/cream empire jacket.png' },
      { name: 'Cherry Red',   hex: '#8B0000', img: 'images/burgandy empire jacket.png' },
      { name: 'Navy Blue',    hex: '#000080', img: 'images/navy blue.png' },
      { name: 'Forest Green', hex: '#003314', img: 'images/forest green empire jacket.jpg' }
    ],
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20The%20Empire%20Jacket.%20Please%20send%20me%20your%20measurement%20guide%20and%20pricing.%20%F0%9F%A4%8E',
    featured: true,
    status:   'available',
    season:   'ss2026'
  },

  {
    id:       'silk-tee',
    name:     'Satin Circuits Tee',
    category: 'Tech · Wearable',
    filter:   'tech',
    tag:      'SS26',
    img:      'images/silk t shirt.jpeg',
    desc:     'Where the softness of silk meets the precision of a circuit. A premium tee engineered for comfort without compromising on intention. The tech is in the thinking.',
    type:     'Top — T-Shirt',
    colours: [
      { name: 'Cream',        hex: '#F5E9E2', img: 'images/silk t shirt.jpeg' },
      { name: 'Coffee Brown', hex: '#4B2E2B', img: 'images/coffee brown satin top.png' },
      { name: 'Navy Blue',    hex: '#000080', img: 'images/navy blue satin top.jpg' },
      { name: 'Soft Black',   hex: '#1C1412', img: 'images/black satin stop.png' },
      { name: 'Cherry Red',   hex: '#8B0000', img: 'images/burgandy satin top.jpg' }
    ],
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20the%20Satin%20Circuits%20Tee.%20Please%20send%20me%20your%20measurement%20guide%20and%20pricing.%20%F0%9F%A4%8E',
    featured: true,
    status:   'available',
    season:   'ss2026'
  },

  {
    id:       'two-piece',
    name:     'Two Piece Set',
    category: 'Fashion · Co-ord',
    filter:   'fashion',
    tag:      'SS26',
    img:      'images/coffee brown 2 piece.jpg',
    desc:     'A structured co-ord set designed as a system — every proportion intentional, every detail earned. Built to be worn with certainty.',
    type:     'Co-ord Set — Top & Trousers',
    colours: [
      { name: 'Coffee Brown', hex: '#4B2E2B', img: 'images/coffee brown 2 piece.jpg' },
      { name: 'Navy Blue',    hex: '#000080', img: 'images/navy blue two piece.png' },
      { name: 'Soft Black',   hex: '#1C1412', img: 'images/soft black 2 piece.png' },
      { name: 'Cherry Red',   hex: '#8B0000', img: 'images/burgandy 2 piece.png' },
      { name: 'Cream', hex: '#F5E9E2', img: 'images/2 piece.jpeg' },
      { name: 'Forest Green', hex: '#003314', img: 'images/forest green 2 piece.png' }
    ],
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20the%20Two%20Piece%20Set.%20Please%20send%20me%20your%20measurement%20guide%20and%20pricing.%20%F0%9F%A4%8E',
    featured: true,
    status:   'available',
    season:   'ss2026'
  },

  {
    id:       'coffee-trench',
    name:     'Coffee Trench',
    category: 'Fashion · Outerwear',
    filter:   'fashion',
    tag:      null,
    img:      'images/Casaco Trench Longo Minimalista Casual e Elegante de Ajuste Solto com Manga Longa e Dupla Fileira de Botões com Cinto, Cinza Puro, Primavera_Outono_Inverno.jpeg',
    desc:     'A longline trench coat in the brand\'s signature coffee brown. Structured enough to command a room, relaxed enough to move through it with ease.',
    type:     'Outerwear — Trench Coat',
    colours:  [],
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20the%20Coffee%20Trench.%20Please%20send%20me%20your%20measurement%20guide%20and%20pricing.%20%F0%9F%A4%8E',
    featured: false,
    status:   'available',
    season:   'ss2026'
  },

  {
    id:       'smart-band',
    name:     'Cherry Smart Band',
    category: 'Tech · Wearable',
    filter:   'wearables',
    tag:      null,
    img:      'images/Fitbit Inspire 3.jpeg',
    desc:     'Technology you actually want to wear. Tracks your vitals without announcing itself — minimal design, maximum function.',
    type:     'Accessory — Smart Wearable',
    colours:  [],
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20the%20Cherry%20Smart%20Band.%20Please%20send%20me%20pricing%20details.%20%F0%9F%A4%8E',
    featured: false,
    status:   'available',
    season:   'ss2026'
  },

  {
    id:       'gold-chain',
    name:     'Imperial Gold Chain',
    category: 'Fashion · Jewellery',
    filter:   'accessories',
    tag:      null,
    img:      'images/14K Solid Gold Franco Chain Necklace_ Diamond Cut Foxtail Design.jpeg',
    desc:     'Not decoration. A statement. The finishing detail that signals everything without saying anything.',
    type:     'Accessory — Jewellery',
    colours:  [],
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20the%20Imperial%20Gold%20Chain.%20Please%20send%20me%20pricing%20details.%20%F0%9F%A4%8E',
    featured: false,
    status:   'available',
    season:   'ss2026'
  },

  {
    id:       'interface-cap',
    name:     'Interface Cap',
    category: 'Fashion · Accessories',
    filter:   'accessories',
    tag:      'SS26',
    img:      'images/Brand identity & pitch deck design for Soma.jpeg',
    desc:     'The cap that signals everything. Clean construction, considered detail, unmistakable presence.',
    type:     'Accessory — Cap',
    price:    'Made to Order — DM for pricing',
    whatsapp: 'Hi%20%C3%8E%C3%A6m%2C%20I%27d%20like%20to%20order%20the%20Interface%20Cap.%20Please%20send%20me%20pricing%20details.%20%F0%9F%A4%8E',
    featured: false,
    status:   'available',
    season:   'ss2026'
  },
];