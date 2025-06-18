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

// 示例產品數據
const sampleProducts = [
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
      '/images/波森/sg-11134201-23010-k2ebmhxpzwlvdb.webp'
    ],
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
    description: '專業級肝精保健食品，含有豐富的胺基酸、維生素B群及肝臟精華，有助於維護肝臟健康，促進新陳代謝，提升精神活力。',
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
    category: '健康保健',
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
  }
];

async function initProducts() {
  try {
    // 清空現有產品數據
    await Product.deleteMany({});
    console.log('已清空現有產品數據');

    // 插入示例產品
    await Product.insertMany(sampleProducts);
    console.log('示例產品數據已插入');

    console.log('產品初始化完成！');
    process.exit(0);
  } catch (error) {
    console.error('初始化失敗:', error);
    process.exit(1);
  }
}

initProducts(); 