const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 增強版推薦規則 - 已補全
const recommendationRules = {
  // 顯性推薦 (目標 -> 產品)
  '提升能量與活力': ['美國-代謝B群Plus', '美國-黑馬卡精氨酸男性活力膠囊', '肝精', '美國-綜合維生素軟糖'],
  '改善睡眠品質': ['美國-夜舒眠GABA'],
  '促進腸道健康': ['波森莓益生菌', '酵纖凍', '原生-淨暢酵素錠', '美國-固益清', '青之酵素果凍'],
  '體重管理（減重/增肌）': ['美國-燃纖脂專業燃脂膠囊', '美國-苦瓜胜肽', '日本-孅淨一杯'],
  '穩定情緒與壓力': ['美國-夜舒眠GABA', '日本-平安錠'],
  '增強免疫力': ['加拿大-維生素D3液劑15ml', '【新上市】維生素C+酵母鋅', '美國-綜合維生素軟糖'],
  '改善皮膚與頭髮': ['美妍飲', '膠原蛋白胜肽', '珍珠露', '日本蜂王乳'],
  '支持心血管健康': ['日本-Q10', '日本-蚓激酶', '加拿大-薑黃魚油', '原生-高濃度魚油'],
  '緩解關節與肌肉不適': ['美國-關舒活關節保健膠囊', '美國-檸檬酸鈣粉'],
  '保護視力': ['日本-葉黃素', '藍莓口味葉黃素口嚼錠'],
  '提升認知功能（如記憶力）': ['加拿大-薑黃魚油', '原生-高濃度魚油'],

  // 隱性推薦 (條件 -> 產品)
  '高壓&睡眠差': ['美國-夜舒眠GABA'],
  '飲食油膩&腸道問題': ['波森莓益生菌', '酵纖凍', '原生-淨暢酵素錠', '美國-固益清'],
  '高強度運動&關節': ['美國-關舒活關節保健膠囊', '膠原蛋白胜肽'],
  '年長&心血管': ['日本-Q10', '日本-蚓激酶', '原生-高濃度魚油'],
  '素食&能量': ['美國-代謝B群Plus'] // B12
};

// 增強版分析建議生成函數
const generateAnalysis = (answers) => {
  const analysis = new Set();
  const { 
    height, weight, sleep, stress, diet, exercise, 
    age, chronicConditions, waterIntake, healthGoals = [] 
  } = answers;

  // 1. BMI 與體重管理
  if (height && weight) {
    const heightInMeters = parseFloat(height) / 100;
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
      analysis.add(`您的 BMI 為 ${bmi.toFixed(1)}，屬於偏瘦範圍。建議增加優質蛋白質與健康脂肪的攝取，並可考慮補充綜合維生素，以確保營養均衡，支持健康增重。`);
    } else if (bmi >= 25 && bmi < 30) {
      analysis.add(`您的 BMI 為 ${bmi.toFixed(1)}，屬於超重範圍。這可能增加心血管等健康風險。建議調整飲食結構，增加運動量，並可考慮輔以苦瓜胜肽或燃脂相關產品，協助您的體重管理計畫。`);
    } else if (bmi >= 30) {
      analysis.add(`您的 BMI 為 ${bmi.toFixed(1)}，已達肥胖範圍。為降低相關健康風險，強烈建議尋求專業指導，規畫飲食與運動計畫。輔助性補充品可在專業人士建議下使用。`);
    }
  }

  // 2. 睡眠與壓力交互分析
  if (sleep === '少於 6 小時' && stress === '高（持續壓力）') {
    analysis.add('長期睡眠不足與高壓力會嚴重影響內分泌與神經系統，是現代人健康的隱形殺手。建議將改善睡眠作為首要目標，GABA 或許能幫助您放鬆、更快進入休息狀態。');
  } else if (sleep === '少於 6 小時') {
    analysis.add('睡眠不足會影響日間精神、學習力與長期健康。建議建立規律的睡前儀式，避免睡前使用電子產品。');
  } else if (stress === '高（持續壓力）') {
    analysis.add('持續的高壓力會消耗大量B群維生素，影響您的情緒與精力。除了壓力管理技巧，適時補充B群對維持神經系統健康至關重要。');
  }

  // 3. 飲食與腸道健康
  if (diet === '外食為主（高油、高鹽或加工食品）' && healthGoals.includes('促進腸道健康')) {
    analysis.add('外食為主的飲食習慣容易破壞腸道菌叢平衡，可能引發消化不良、便秘或免疫力下降等問題。每日補充益生菌並增加膳食纖維攝取，是重建腸道健康的第一步。');
  } else if (diet === '素食/純素（無肉或無動物製品）' && healthGoals.includes('提升能量與活力')) {
    analysis.add('素食者需要特別注意維生素B12和鐵的攝取，這兩者是能量代謝的關鍵，缺乏時容易導致疲倦。建議檢查飲食中是否包含足夠的強化食品，或考慮直接補充。');
  }
  
  // 4. 運動與能量需求
  if (exercise === '高強度運動（重訓、競技運動，5 次以上/週）' && healthGoals.includes('緩解關節與肌肉不適')) {
    analysis.add('高強度運動會對關節和肌肉造成較大壓力。為支持運動表現並幫助恢復，除了足夠的蛋白質，補充關節保健品（如葡萄糖胺）和膠原蛋白是很好的選擇。');
  }
  
  // 5. 年齡與慢性病風險
  if (age && (age.includes('50-65') || age.includes('65 歲以上')) && healthGoals.includes('支持心血管健康')) {
    analysis.add('隨著年齡增長，心血管保養變得格外重要。Omega-3、Q10等營養素已被研究證實對支持心臟功能、維持血管彈性有益。');
  }

  // 6. 水分攝取不足
  if (waterIntake === '少於 1 公升') {
    analysis.add('每日飲水少於1公升可能不足以支持身體正常的代謝和排毒功能。請務必增加飲水量至1.5-2公升，這對整體健康都有正面影響。');
  }
  
  // 7. 預設建議
  if (analysis.size === 0) {
    analysis.add('從您的回答來看，您的生活習慣相當不錯！維持良好的作息與飲食是健康的基石。以下是一些可能適合您，用於日常保養的建議。');
  }

  return Array.from(analysis);
};


// POST /api/ai-nutritionist/recommend
router.post('/recommend', async (req, res) => {
  const answers = req.body;
  console.log('收到增強版問卷數據:', answers);

  try {
    const analysisResult = generateAnalysis(answers);
    const recommendedProductNames = new Set();
    
    // 顯性推薦
    if (answers.healthGoals) {
      answers.healthGoals.forEach(goal => {
        if (recommendationRules[goal]) {
          recommendationRules[goal].forEach(productName => recommendedProductNames.add(productName.toLowerCase()));
        }
      });
    }

    // 隱性推薦
    if (answers.sleep === '少於 6 小時' && answers.stress === '高（持續壓力）') {
      recommendationRules['高壓&睡眠差'].forEach(p => recommendedProductNames.add(p.toLowerCase()));
    }
    if (answers.diet === '外食為主（高油、高鹽或加工食品）' && answers.healthGoals && answers.healthGoals.includes('促進腸道健康')) {
        recommendationRules['飲食油膩&腸道問題'].forEach(p => recommendedProductNames.add(p.toLowerCase()));
    }
    if (answers.exercise === '高強度運動（重訓、競技運動，5 次以上/週）' && answers.healthGoals && answers.healthGoals.includes('緩解關節與肌肉不適')) {
        recommendationRules['高強度運動&關節'].forEach(p => recommendedProductNames.add(p.toLowerCase()));
    }
    if (answers.age && (answers.age.includes('50-65') || answers.age.includes('65 歲以上')) && answers.healthGoals && answers.healthGoals.includes('支持心血管健康')) {
        recommendationRules['年長&心血管'].forEach(p => recommendedProductNames.add(p.toLowerCase()));
    }
    if (answers.diet === '素食/純素（無肉或無動物製品）' && answers.healthGoals && answers.healthGoals.includes('提升能量與活力')) {
        recommendationRules['素食&能量'].forEach(p => recommendedProductNames.add(p.toLowerCase()));
    }

    // 排除用戶已在服用的補充劑 (簡易版，僅比對名稱)
    if (answers.supplements && answers.supplements !== '無' && answers.supplements.trim() !== '') {
      const userSupplements = answers.supplements.toLowerCase().split(/[,、\s]+/);
      userSupplements.forEach(sup => {
        recommendedProductNames.forEach(rec => {
          if (rec.includes(sup)) {
            recommendedProductNames.delete(rec);
          }
        });
      });
    }

    const uniqueProductNames = Array.from(recommendedProductNames);

    if (uniqueProductNames.length === 0) {
      return res.json({
        analysis: analysisResult,
        products: [],
        disclaimer: "以上建議基於您的問卷回應，僅供參考。如有慢性疾病或正在服藥，請諮詢醫師。"
      });
    }

    const allProducts = await Product.find({});
    const recommendedProducts = allProducts.filter(product => 
        uniqueProductNames.includes(product.name.toLowerCase())
    );
    
    // 根據文件擴充回傳的產品資訊 (未來可存入DB)
    const enhancedProducts = recommendedProducts.map(p => {
        let benefits = '日常保健';
        let evidence = '詳情請見產品頁面';
        if(p.name.toLowerCase().includes('gaba')){
            benefits = '促進神經放鬆，改善入睡時間';
            evidence = 'GABA 透過調節神經傳導物質促進放鬆（學術研究）。';
        } else if (p.name.toLowerCase().includes('益生菌')) {
            benefits = '調節腸道菌群，提升消化功能';
            evidence = '益生菌可改善腸道屏障功能（學術研究）。';
        } else if (p.name.toLowerCase().includes('b群')) {
            benefits = '支持能量代謝，提振精神';
            evidence = 'B群是能量轉換過程中的關鍵輔酶（營養學）。';
        }
        return {
            ...p.toObject(),
            benefits,
            evidence
        };
    });

    res.json({
      analysis: analysisResult,
      products: enhancedProducts,
      disclaimer: "以上建議基於您的問卷回應，僅供參考。如有慢性疾病或正在服藥，請諮詢醫師。"
    });

  } catch (error) {
    console.error('推薦產品時發生錯誤:', error);
    res.status(500).json({ message: '服務器錯誤，無法獲取推薦' });
  }
});

module.exports = router; 