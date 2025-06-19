const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/auraway-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// 美國產品系列（續）
const additionalUSAProducts = [
  {
    name: '美國-夜舒眠GABA',
    description: '來自美國的專業睡眠保健配方，含有GABA、褪黑激素和草本萃取，有助於舒緩壓力，改善睡眠品質，讓您擁有深度好眠。',
    price: 1480,
    originalPrice: 1780,
    stock: 28,
    category: '睡眠保健',
    badge: '美國進口',
    images: [
      '/images/美國-夜舒眠GABA/6c1ea9955b8cc16a1e72a661f1e2f5f2.jpg',
      '/images/美國-夜舒眠GABA/9ac955a8307e9f684a7b6eb49400337a.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: 'GABA、褪黑激素、草本萃取',
      usage: '每日1-2粒，睡前30分鐘食用',
      features: [
        '美國專業配方',
        '含GABA成分',
        '添加褪黑激素',
        '舒緩壓力',
        '改善睡眠品質'
      ]
    },
    tags: ['GABA', '睡眠', '美國製造', '舒壓'],
    isActive: true,
    sortOrder: 16
  },
  {
    name: '美國-檸檬酸鈣粉',
    description: '來自美國的高品質檸檬酸鈣配方，採用檸檬酸鈣形式，吸收率優於一般碳酸鈣，有助於維持骨骼和牙齒健康，適合各年齡層補鈣需求。',
    price: 1280,
    originalPrice: 1580,
    stock: 35,
    category: '健康保健',
    badge: '美國進口',
    images: [
      '/images/美國-檸檬酸鈣粉/1f51a977a5e989940a06ae39c8e01c52.jpg',
      '/images/美國-檸檬酸鈣粉/669575e3fea133831950458d086745d1.jpg'
    ],
    specifications: {
      content: '300g/罐',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '檸檬酸鈣、維生素D3',
      usage: '每日1-2匙，加入飲品中',
      features: [
        '美國高品質',
        '檸檬酸鈣形式',
        '吸收率優異',
        '維持骨骼健康',
        '粉狀易調配'
      ]
    },
    tags: ['檸檬酸鈣', '鈣質', '美國製造', '骨骼'],
    isActive: true,
    sortOrder: 17
  },
  {
    name: '美國-燃纖脂專業燃脂膠囊',
    description: '來自美國的專業燃脂配方，結合綠茶萃取、左旋肉鹼和藤黃果萃取物，為您提供全方位的體重管理支持。有效促進新陳代謝，加速脂肪燃燒，抑制食慾並阻斷脂肪吸收，適合追求健康體態的族群。',
    price: 3100,
    originalPrice: 3400,
    stock: 15,
    category: '體重管理',
    badge: '美國進口',
    images: [
      '/images/美國-燃纖脂/564a5520dbfa7cefaae8fe84e102c81e.jpg',
      '/images/美國-燃纖脂/c3c6e7d6079320a3f5577e12295fbc58.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '綠茶萃取、左旋肉鹼、藤黃果萃取',
      usage: '每日2粒，餐前30分鐘食用',
      features: [
        '美國專業配方',
        '促進新陳代謝',
        '加速脂肪燃燒',
        '抑制食慾',
        '阻斷脂肪吸收'
      ]
    },
    tags: ['燃脂', '體重管理', '美國製造', '新陳代謝'],
    isActive: true,
    sortOrder: 18
  },
  {
    name: '美國-綜合維生素軟糖',
    description: '來自美國的綜合維生素軟糖，含有完整的維生素和礦物質，口感佳、易吸收，適合不喜歡吞膠囊的族群，全家人都能輕鬆補充營養。',
    price: 1180,
    originalPrice: 1480,
    stock: 40,
    category: '健康保健',
    badge: '美國進口',
    images: [
      '/images/美國-綜合維生素軟糖/2a06e4486bb2944dbbaf1319cc5f3505.jpg',
      '/images/美國-綜合維生素軟糖/b11b75af4af865046307eaf7bee8c16c.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '綜合維生素、礦物質',
      usage: '每日2粒，隨時食用',
      features: [
        '美國製造',
        '完整維生素礦物質',
        '軟糖形式',
        '口感佳易吸收',
        '適合全家人'
      ]
    },
    tags: ['綜合維生素', '軟糖', '美國製造', '全家適用'],
    isActive: true,
    sortOrder: 19
  },
  {
    name: '美國-苦瓜胜肽',
    description: '來自美國的專業苦瓜胜肽配方，採用苦瓜萃取技術，有助於維持血糖平衡，促進新陳代謝，適合關注血糖管理的族群。',
    price: 1680,
    originalPrice: 1980,
    stock: 22,
    category: '健康保健',
    badge: '美國進口',
    images: [
      '/images/美國-苦瓜胜肽/2749cfb0ba4558cbe2b17157d7dd9f48.jpg',
      '/images/美國-苦瓜胜肽/47746d4d604028f10f54f720d32fe730.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '苦瓜胜肽、鉻酵母',
      usage: '每日1-2粒，餐前食用',
      features: [
        '美國專業技術',
        '苦瓜萃取胜肽',
        '維持血糖平衡',
        '促進新陳代謝',
        '添加鉻酵母'
      ]
    },
    tags: ['苦瓜胜肽', '血糖', '美國製造', '代謝'],
    isActive: true,
    sortOrder: 20
  },
  {
    name: '美國-關舒活關節保健膠囊',
    description: '來自美國的專業關節保健配方，結合葡萄糖胺、軟骨素、MSM和薑黃素，為您的關節提供全方位保護。有效維護關節軟骨健康，減緩關節不適，提升活動靈活度，適合關注關節保健的族群。',
    price: 1290,
    originalPrice: 1580,
    stock: 30,
    category: '關節保健',
    badge: '美國進口',
    images: [
      '/images/美國-關舒活/1dbc1283f878f2773accab97e1d0eb78.jpg',
      '/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '葡萄糖胺、軟骨素、MSM、薑黃素',
      usage: '每日2粒，餐後食用',
      features: [
        '美國專業配方',
        '四重關節保護',
        '維護軟骨健康',
        '減緩關節不適',
        '提升活動靈活'
      ]
    },
    tags: ['關節保健', '葡萄糖胺', '美國製造', '軟骨'],
    isActive: true,
    sortOrder: 21
  },
  {
    name: '美國-黑馬卡精氨酸男性活力膠囊',
    description: '來自美國的頂級男性活力配方，結合黑馬卡萃取、L-精氨酸和鋅，為男性提供全方位的活力支持。有效提升體力和精神狀態，增強運動表現，維護男性健康，適合注重活力保健的男性族群。',
    price: 1250,
    originalPrice: 1550,
    stock: 20,
    category: '男性保健',
    badge: '美國進口',
    images: [
      '/images/美國-黑馬卡精氨酸/2ce503f5a880a3baffb3f6b5871721cc.jpg',
      '/images/美國-黑馬卡精氨酸/91ce0a777ac90611c870c9caedd179f7.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '黑馬卡萃取、L-精氨酸、鋅',
      usage: '每日2粒，餐後食用',
      features: [
        '美國頂級配方',
        '黑馬卡萃取',
        '提升體力精神',
        '增強運動表現',
        '男性活力支持'
      ]
    },
    tags: ['黑馬卡', '男性保健', '美國製造', '活力'],
    isActive: true,
    sortOrder: 22
  }
];

// 維生素系列
const vitaminProducts = [
  {
    name: '【新上市】維生素C+酵母鋅',
    description: '高品質維生素C結合酵母鋅的完美組合，採用天然酵母發酵技術，有助於增強免疫系統，促進膠原蛋白合成，維持皮膚健康。雙重營養素協同作用，效果更佳。',
    price: 1150,
    originalPrice: 1450,
    stock: 42,
    category: '健康保健',
    badge: '新上市',
    images: [
      '/images/維生素C+酵母鋅/f94c0999d662bdd0260afb59a401534a.jpg',
      '/images/維生素C+酵母鋅/k6YXDMW.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '台灣製造',
      ingredients: '維生素C、酵母鋅',
      usage: '每日1粒，餐後食用',
      features: [
        '高品質維生素C',
        '天然酵母鋅',
        '增強免疫系統',
        '促進膠原蛋白',
        '維持皮膚健康'
      ]
    },
    tags: ['維生素C', '鋅', '免疫', '膠原蛋白'],
    isActive: true,
    sortOrder: 23
  },
  {
    name: '藍莓口味葉黃素口嚼錠',
    description: '美味的藍莓口味葉黃素口嚼錠，含有高濃度葉黃素和玉米黃素，有助於保護眼部健康，過濾藍光傷害。口嚼錠形式方便攜帶，隨時補充護眼營養。',
    price: 1080,
    originalPrice: 1380,
    stock: 38,
    category: '護眼保健',
    badge: '口嚼錠',
    images: [
      '/images/藍莓口味葉黃素口嚼錠/5c8a85bed043033a8893fe2e8c2625ee.jpg',
      '/images/藍莓口味葉黃素口嚼錠/c23c009383d125b19c55345614365fbf.jpg'
    ],
    specifications: {
      content: '60錠/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '台灣製造',
      ingredients: '葉黃素、玉米黃素、藍莓萃取',
      usage: '每日1-2錠，可直接嚼食',
      features: [
        '美味藍莓口味',
        '高濃度葉黃素',
        '口嚼錠形式',
        '保護眼部健康',
        '方便攜帶'
      ]
    },
    tags: ['葉黃素', '護眼', '口嚼錠', '藍莓'],
    isActive: true,
    sortOrder: 24
  }
];

// 酵素系列
const enzymeProducts = [
  {
    name: '酵孅凍',
    description: '美味的酵素果凍，含有多種天然酵素和膳食纖維，有助於促進消化，維持腸道健康。果凍形式易於食用，讓您在享受美味的同時，輕鬆補充酵素營養。',
    price: 1280,
    originalPrice: 1580,
    stock: 35,
    category: '酵素保健',
    badge: '美味酵素',
    images: [
      '/images/酵孅凍/5a92ca803369be5533eafa2a7ab04c15.jpg',
      '/images/酵孅凍/N6e3U0e.jpg'
    ],
    specifications: {
      content: '20包/盒',
      storage: '常溫保存，開封後盡快食用',
      origin: '台灣製造',
      ingredients: '多種天然酵素、膳食纖維',
      usage: '每日1-2包，餐後食用',
      features: [
        '多種天然酵素',
        '含膳食纖維',
        '促進消化',
        '維持腸道健康',
        '美味果凍形式'
      ]
    },
    tags: ['酵素', '果凍', '消化', '腸道健康'],
    isActive: true,
    sortOrder: 25
  },
  {
    name: '青之酵素果凍',
    description: '清爽的青色酵素果凍，含有青蔬酵素和綜合蔬果酵素，有助於促進新陳代謝，維持消化健康。清香口感，讓您輕鬆享受酵素的好處。',
    price: 1180,
    originalPrice: 1480,
    stock: 28,
    category: '酵素保健',
    badge: '青蔬酵素',
    images: [
      '/images/青之酵素果凍/4e541dda27431efc8d93a5adbed63ff0.jpg',
      '/images/青之酵素果凍/d99be0051786472bda22eddbb51e50cf.jpg'
    ],
    specifications: {
      content: '20包/盒',
      storage: '常溫保存，開封後盡快食用',
      origin: '台灣製造',
      ingredients: '青蔬酵素、綜合蔬果酵素',
      usage: '每日1包，餐後食用',
      features: [
        '青蔬酵素配方',
        '綜合蔬果酵素',
        '促進新陳代謝',
        '維持消化健康',
        '清香果凍'
      ]
    },
    tags: ['青蔬酵素', '果凍', '新陳代謝', '蔬果'],
    isActive: true,
    sortOrder: 26
  }
];

// 原生產品
const probioticProducts = [
  {
    name: '【新上市】日本-原生菌',
    description: '來自日本的頂級原生菌，經過嚴格品質控制，含有多種益生菌株，有助於維持腸道健康，提升消化功能。每日補充，讓您由內而外散發健康活力。',
    price: 1580,
    originalPrice: 1880,
    stock: 25,
    category: '益生菌',
    badge: '新上市',
    images: [
      '/images/原生/main.avif',
      '/images/原生/原生-描述.jpg'
    ],
    specifications: {
      content: '30包/盒',
      storage: '陰涼乾燥處保存，可冷藏',
      origin: '日本製造',
      ingredients: '多種益生菌株、益生元',
      usage: '每日1包，餐後食用',
      features: [
        '日本頂級配方',
        '多種益生菌株',
        '維持腸道健康',
        '提升消化功能',
        '粉末包裝'
      ]
    },
    tags: ['原生菌', '益生菌', '日本製造', '腸道健康'],
    isActive: true,
    sortOrder: 27
  }
];

async function addCompleteProducts() {
  try {
    console.log('開始添加完整產品數據...');
    
    // 合併所有產品數據
    const allNewProducts = [
      ...additionalUSAProducts,
      ...vitaminProducts,
      ...enzymeProducts,
      ...probioticProducts
    ];
    
    // 插入新產品
    await Product.insertMany(allNewProducts);
    console.log(`已成功添加 ${allNewProducts.length} 個新產品`);

    // 統計所有產品
    const totalProducts = await Product.countDocuments();
    console.log(`數據庫中共有 ${totalProducts} 個產品`);

    console.log('完整產品數據添加完成！');
    process.exit(0);
  } catch (error) {
    console.error('產品添加失敗:', error);
    process.exit(1);
  }
}

addCompleteProducts(); 