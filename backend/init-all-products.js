const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://aistorm0910:derWbD9u9MW4GRJt@ivan.w6ickfj.mongodb.net/auraway-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// 完整產品數據 - 統一格式
const allProducts = [
  {
    name: '波森莓濃縮飲PLUS',
    description: '波森莓濃縮飲PLUS富含抗氧化成分，有助於提升免疫力，保護細胞免受自由基傷害。每日一包，保持活力與健康。全素食用，適合全家人食用。',
    price: 1280,
    originalPrice: 2000,
    stock: 50,
    category: '健康保健',
    badge: '熱銷',
    images: [
      '/images/波森/sg-11134201-23010-iw5fi43owwlv07.webp',
      '/images/波森/sg-11134201-23010-3u6l9axpzwlv0c.webp',
      '/images/波森/sg-11134201-23010-k2ebmhxpzwlvdb.webp',
      '/images/波森/sg-11134201-23010-n98b3gxpzwlv79.webp',
      '/images/波森/sg-11134201-23010-qtswlrxpzwlva6.webp',
      '/images/波森/sg-11134201-23010-v4v3fnxpzwlv03.webp',
      '/images/波森/0c6b6636354d47320efa51d2ec78250a.jpg'
    ],
    descriptionImage: '/images/波森/0c6b6636354d47320efa51d2ec78250a.jpg',
    specifications: {
      content: '18g x 20包/盒',
      storage: '常溫陰涼乾燥處保存',
      origin: '台灣製造',
      ingredients: '波森莓精華、天然抗氧化成分',
      usage: '每日一包，可直接食用或加入飲品中',
      features: [
        '富含天然波森莓精華，抗氧化效果顯著',
        '全素食用，適合全家人食用',
        '可添加在麵包、吐司、其他飲品調和等一包多用途',
        '無添加新主張，天然健康',
        '台灣在地生產，品質保證',
        '方便攜帶，隨時補充營養'
      ]
    },
    tags: ['抗氧化', '免疫力', '天然', '台灣製造'],
    isActive: true,
    sortOrder: 1
  },
  {
    name: '珍珠露 - 美麗膠原蛋白',
    description: '來自日本的美麗秘密，嚴選珍珠粉、膠原蛋白胜肽與多種美容成分。40包裝，每日一包，由內而外散發自然光采，讓肌膚重現年輕活力。',
    price: 1290,
    originalPrice: 1590,
    stock: 40,
    category: '美容保養',
    badge: '美麗秘密',
    images: [
      '/images/珍珠露/4bf10c3038a770b3d4af941f36e77dde (1).jpg',
      '/images/珍珠露/57461b3776cf4febb8468fbecd89d0c7.jpg'
    ],
    descriptionImage: '/images/珍珠露/57461b3776cf4febb8468fbecd89d0c7.jpg',
    specifications: {
      content: '40包/盒',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '珍珠粉、膠原蛋白胜肽、維生素C',
      usage: '每日一包，餐後食用',
      features: [
        '日本製造，品質保證',
        '含珍珠粉，美容養顏',
        '膠原蛋白胜肽，易吸收',
        '添加維生素C，抗氧化',
        '粉末狀，方便攜帶'
      ]
    },
    tags: ['膠原蛋白', '美容', '日本製造', '珍珠粉'],
    isActive: true,
    sortOrder: 2
  },
  {
    name: '日本Q10',
    description: '來自日本的高品質輔酶Q10，是細胞能量代謝的重要輔酶，有助於維持心血管健康，提供細胞所需能量，讓您保持青春活力。',
    price: 1290,
    originalPrice: 1590,
    stock: 30,
    category: '心血管保健',
    badge: '日本進口',
    images: [
      '/images/日本q10/5bc33a45db7e74693e442838dff85d6b.jpg',
      '/images/日本q10/d297cc3ea96ede9d70c78168818c2ca6.jpg'
    ],
    descriptionImage: '/images/日本q10/d297cc3ea96ede9d70c78168818c2ca6.jpg',
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '輔酶Q10、維生素E',
      usage: '每日1-2粒，餐後食用',
      features: [
        '日本原裝進口',
        '高濃度輔酶Q10',
        '添加維生素E，抗氧化',
        '維持心血管健康',
        '提升細胞能量'
      ]
    },
    tags: ['Q10', '心血管', '日本製造', '抗氧化'],
    isActive: true,
    sortOrder: 3
  },
  {
    name: '專業肝精保健食品',
    description: '專業級肝精保健食品，含有豐富的胺基酸、維生素B群及肝臟精華，有助於維護肝臟健康，促進新陳代謝，提升精神活力。適合工作繁忙、應酬較多的現代人日常保健使用。',
    price: 1680,
    originalPrice: 2200,
    stock: 25,
    category: '健康保健',
    badge: '熱銷產品',
    images: [
      '/images/肝精/7191177995eee51427a82b37602a4a45.jpg',
      '/images/肝精/肝經main.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '台灣製造',
      ingredients: '肝臟精華、維生素B群、胺基酸',
      usage: '每日2粒，餐後食用',
      features: [
        '專業級肝精配方',
        '富含維生素B群',
        '促進新陳代謝',
        '提升精神活力',
        '維護肝臟健康'
      ]
    },
    tags: ['肝精', '維生素B群', '新陳代謝', '台灣製造'],
    isActive: true,
    sortOrder: 4
  },
  {
    name: '【新上市】日本-平安錠',
    description: '來自日本的頂級舒緩配方，採用天然草本精華，有助於舒緩壓力，促進身心平衡，讓您在忙碌生活中找到內心的平靜與安寧。',
    price: 1250,
    originalPrice: 1550,
    stock: 20,
    category: '睡眠保健',
    badge: '新上市',
    images: [
      '/images/日本-平安錠/6d4b794fe7ca188991c9107fae9b8092.jpg',
      '/images/日本-平安錠/d09666aa64e7988592a562202875b273.jpg'
    ],
    specifications: {
      content: '60錠/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '天然草本精華、GABA、維生素B群',
      usage: '每日1-2錠，睡前食用',
      features: [
        '日本原裝進口',
        '天然草本配方',
        '舒緩壓力',
        '促進身心平衡',
        '改善睡眠品質'
      ]
    },
    tags: ['舒壓', '草本', '日本製造', '睡眠'],
    isActive: true,
    sortOrder: 5
  },
  {
    name: '日本葉黃素護眼膠囊',
    description: '來自日本的頂級葉黃素護眼配方，採用金盞花萃取的天然葉黃素，結合玉米黃素和花青素，為您的雙眼提供全方位保護。有效過濾藍光傷害，維護視網膜健康，適合長時間用眼的現代人。',
    price: 1150,
    originalPrice: 1380,
    stock: 35,
    category: '護眼保健',
    badge: '日本進口',
    images: [
      '/images/日本-葉黃素/a13789b0a1b9488ad91d5eee85a70107.jpg',
      '/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '葉黃素、玉米黃素、花青素、維生素A',
      usage: '每日1粒，餐後食用',
      features: [
        '日本進口金盞花萃取',
        '高濃度葉黃素配方',
        '添加玉米黃素',
        '過濾藍光傷害',
        '保護視網膜健康'
      ]
    },
    tags: ['葉黃素', '護眼', '日本製造', '藍光保護'],
    isActive: true,
    sortOrder: 6
  },
  {
    name: '日本蜂王乳',
    description: '來自日本的頂級蜂王乳，富含豐富的蛋白質、維生素和礦物質，是天然的美容聖品。有助於維持青春活力，促進新陳代謝，讓您由內而外散發光彩。',
    price: 1480,
    originalPrice: 1780,
    stock: 28,
    category: '美容保養',
    badge: '日本進口',
    images: [
      '/images/日本蜂王乳/e9cc017fd6ade38af291acf2d319f1dc.jpg',
      '/images/日本蜂王乳/rXxaTRc.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '蜂王乳、蛋白質、維生素、礦物質',
      usage: '每日1-2粒，餐後食用',
      features: [
        '日本頂級蜂王乳',
        '富含天然蛋白質',
        '維持青春活力',
        '促進新陳代謝',
        '天然美容聖品'
      ]
    },
    tags: ['蜂王乳', '美容', '日本製造', '青春活力'],
    isActive: true,
    sortOrder: 7
  }
];

// 繼續添加更多產品...
const moreProducts = [
  {
    name: '日本-蚓激酶',
    description: '來自日本的頂級蚓激酶配方，採用紅蚯蚓萃取技術，有助於維護心血管健康，促進血液循環，適合關注心血管保健的族群。',
    price: 1580,
    originalPrice: 1880,
    stock: 22,
    category: '心血管保健',
    badge: '日本進口',
    images: [
      '/images/日本-蚓激酶/19f4aec57b7df48e36b964c95fc990a9.jpg',
      '/images/日本-蚓激酶/3967ec6fa88a35454dd60cfd8825cab8.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '蚓激酶、紅蚯蚓萃取物',
      usage: '每日1-2粒，餐後食用',
      features: [
        '日本進口蚓激酶',
        '紅蚯蚓萃取技術',
        '維護心血管健康',
        '促進血液循環',
        '專業配方'
      ]
    },
    tags: ['蚓激酶', '心血管', '日本製造', '血液循環'],
    isActive: true,
    sortOrder: 8
  },
  {
    name: '日本-孅淨一杯',
    description: '來自日本的專業體重管理配方，結合多種天然萃取成分，有助於促進新陳代謝，維持理想體態。每日一杯，輕鬆享受窈窕生活。',
    price: 1380,
    originalPrice: 1680,
    stock: 30,
    category: '體重管理',
    badge: '日本進口',
    images: [
      '/images/日本-孅淨一杯/9eca82704a21ed1288db87d8827e09e4.jpg'
    ],
    specifications: {
      content: '20包/盒',
      storage: '常溫陰涼乾燥處保存',
      origin: '日本製造',
      ingredients: '天然萃取成分、代謝促進因子',
      usage: '每日一杯，餐前食用',
      features: [
        '日本專業配方',
        '促進新陳代謝',
        '維持理想體態',
        '天然成分',
        '方便沖泡'
      ]
    },
    tags: ['體重管理', '新陳代謝', '日本製造', '窈窕'],
    isActive: true,
    sortOrder: 9
  },
  {
    name: '美妍飲',
    description: '專為現代女性設計的美肌養顏飲品，含有豐富的膠原蛋白、維生素C及多種美肌成分，由內而外散發自然光彩，讓您每一天都美麗動人。',
    price: 850,
    originalPrice: 1150,
    stock: 45,
    category: '美容保養',
    badge: '美肌養顏',
    images: [
      '/images/美妍飲/875589f1c2a794f35f547c2e08580c0f.jpg',
      '/images/美妍飲/aWm8Dg5.jpg'
    ],
    specifications: {
      content: '12瓶/盒',
      storage: '常溫保存，開封後冷藏',
      origin: '台灣製造',
      ingredients: '膠原蛋白、維生素C、美肌成分',
      usage: '每日1瓶，隨時享用',
      features: [
        '專為女性設計',
        '豐富膠原蛋白',
        '添加維生素C',
        '美肌養顏',
        '即開即飲'
      ]
    },
    tags: ['美妍飲', '膠原蛋白', '美肌', '女性保健'],
    isActive: true,
    sortOrder: 10
  },
  {
    name: '【新上市】膠原蛋白胜肽',
    description: '高品質膠原蛋白胜肽，採用先進水解技術，分子量小易吸收，有助於維持肌膚彈性，促進關節健康，延緩老化過程。純淨配方，無腥味，易於日常補充。',
    price: 1780,
    originalPrice: 2080,
    stock: 18,
    category: '美容保養',
    badge: '新上市',
    images: [
      '/images/膠原蛋白胜肽/c7f238f1065d57d92d71e06499e23e20.jpg',
      '/images/膠原蛋白胜肽/wlNCAfH.jpg'
    ],
    specifications: {
      content: '30包/盒',
      storage: '常溫陰涼乾燥處保存',
      origin: '台灣製造',
      ingredients: '膠原蛋白胜肽、維生素C',
      usage: '每日1包，餐後食用',
      features: [
        '先進水解技術',
        '分子量小易吸收',
        '維持肌膚彈性',
        '促進關節健康',
        '無腥味配方'
      ]
    },
    tags: ['膠原蛋白', '胜肽', '美容', '關節'],
    isActive: true,
    sortOrder: 11
  }
];

// 加拿大產品系列
const canadaProducts = [
  {
    name: '【新上市】加拿大-維生素D3液劑15ml',
    description: '來自加拿大的高品質維生素D3液劑，採用純天然萃取技術，有助於維持骨骼健康，增強鈣質吸收，提升免疫系統功能。液劑型態易於吸收，適合全家人使用。',
    price: 1680,
    originalPrice: 1980,
    stock: 25,
    category: '健康保健',
    badge: '新上市',
    images: [
      '/images/加拿大-維生素D3液劑15ml/1433cb47a75902b3e05f548f4c836a7f.jpg',
      '/images/加拿大-維生素D3液劑15ml/27e611ffb4eb6a9732ba2310268fe0d4.jpg'
    ],
    specifications: {
      content: '15ml/瓶',
      storage: '常溫陰涼處保存，開封後冷藏',
      origin: '加拿大製造',
      ingredients: '維生素D3、天然載體油',
      usage: '每日數滴，餐後使用',
      features: [
        '加拿大高品質',
        '純天然萃取',
        '液劑易吸收',
        '維持骨骼健康',
        '適合全家人'
      ]
    },
    tags: ['維生素D3', '液劑', '加拿大製造', '骨骼健康'],
    isActive: true,
    sortOrder: 12
  },
  {
    name: '加拿大-薑黃魚油',
    description: '來自加拿大的頂級薑黃魚油配方，結合Omega-3與薑黃萃取，具有優異的抗發炎效果，有助於維護心血管健康，提升關節靈活度。',
    price: 1580,
    originalPrice: 1880,
    stock: 32,
    category: '心血管保健',
    badge: '加拿大進口',
    images: [
      '/images/加拿大-薑黃魚油/1c20d30fef2bf3f6db3e32619edb27e5.jpg',
      '/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '加拿大製造',
      ingredients: 'Omega-3魚油、薑黃萃取物',
      usage: '每日1-2粒，餐後食用',
      features: [
        '加拿大頂級魚油',
        '結合薑黃萃取',
        '抗發炎效果',
        '維護心血管',
        '提升關節靈活'
      ]
    },
    tags: ['魚油', '薑黃', '加拿大製造', '抗發炎'],
    isActive: true,
    sortOrder: 13
  }
];

// 美國產品系列
const usaProducts = [
  {
    name: '美國-代謝b群plus',
    description: '來自美國的專業代謝B群配方，含有完整的維生素B群，有助於促進能量代謝，維持神經系統健康，提升精神活力。適合工作壓力大的現代人。',
    price: 1380,
    originalPrice: 1680,
    stock: 38,
    category: '健康保健',
    badge: '美國進口',
    images: [
      '/images/美國-代謝b群plus/76d12961d9d8193df8b81920a8865b5b.jpg',
      '/images/美國-代謝b群plus/b9922648fd5a6a56710d78fc2df79f26.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '常溫陰涼乾燥處保存',
      origin: '美國製造',
      ingredients: '完整維生素B群、生物素',
      usage: '每日1粒，餐後食用',
      features: [
        '美國專業配方',
        '完整維生素B群',
        '促進能量代謝',
        '維持神經健康',
        '提升精神活力'
      ]
    },
    tags: ['維生素B群', '代謝', '美國製造', '能量'],
    isActive: true,
    sortOrder: 14
  },
  {
    name: '美國-固益清',
    description: '來自美國的專業腸道健康配方，含有多種益生菌株和益生元，有助於維持腸道菌叢平衡，促進消化健康，提升整體免疫力。',
    price: 1580,
    originalPrice: 1880,
    stock: 26,
    category: '益生菌',
    badge: '美國進口',
    images: [
      '/images/美國-固益清/96fe13d991f0703660f9a06f69974378.jpg',
      '/images/美國-固益清/f1f1e6cf38f4f49341e66e6fdea704b7.jpg'
    ],
    specifications: {
      content: '60粒/瓶',
      storage: '陰涼乾燥處保存，可冷藏',
      origin: '美國製造',
      ingredients: '多種益生菌株、益生元',
      usage: '每日1-2粒，餐後食用',
      features: [
        '美國專業配方',
        '多種益生菌株',
        '維持腸道平衡',
        '促進消化健康',
        '提升免疫力'
      ]
    },
    tags: ['益生菌', '腸道健康', '美國製造', '免疫'],
    isActive: true,
    sortOrder: 15
  }
];

async function initAllProducts() {
  try {
    console.log('開始整合所有產品數據...');
    
    // 清空現有產品數據
    await Product.deleteMany({});
    console.log('已清空現有產品數據');

    // 合併所有產品數據
    const combinedProducts = [...allProducts, ...moreProducts, ...canadaProducts, ...usaProducts];
    
    // 插入所有產品
    await Product.insertMany(combinedProducts);
    console.log(`已成功插入 ${combinedProducts.length} 個產品`);

    console.log('產品數據整合完成！');
    console.log('產品分類統計:');
    
    const categories = {};
    combinedProducts.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });
    
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} 個產品`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('產品整合失敗:', error);
    process.exit(1);
  }
}

initAllProducts(); 