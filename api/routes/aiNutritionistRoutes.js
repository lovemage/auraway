const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 擴展的推薦規則
const recommendationRules = {
  '增加活力': ['美國-代謝B群Plus', '美國-黑馬卡精氨酸'],
  '改善睡眠': ['美國-夜舒眠GABA'],
  '腸道健康': ['波森莓益生菌', '酵纖凍'],
  '減重減脂': ['美國-燃纖脂', '日本-孅淨一杯'],
  '情緒穩定': ['美國-夜舒眠GABA'],
  '改善過敏': ['加拿大-維生素D3液劑15ml'],
  '降低血壓': ['日本-蚓激酶'],
  '眼睛疲勞': ['日本-葉黃素', '藍莓口味葉黃素口嚼錠'],
  '長期坐姿': ['美國-關舒活'],
  '心血管問題': ['日本-Q10', '日本-蚓激酶', '加拿大-薑黃魚油'],
  '改善皮膚': ['美妍飲', '膠原蛋白胜肽', '珍珠露', '日本蜂王乳'],
  '容易疲倦': ['美國-代謝B群Plus', '肝精'],
  '體重管理': ['美國-燃纖脂', '美國-苦瓜胜肽'],
  '身體強壯': ['美國-綜合維生素軟糖', '維生素C+酵母鋅'],
  // 基於新問題的隱性推薦
  '高壓&睡眠差': ['美國-夜舒眠GABA'],
  '高頻飲酒': ['肝精'],
  '外食族&消化問題': ['波森莓益生菌'],
  '久坐&眼睛問題': ['日本-葉黃素', '美國-關舒活']
};

// 分析建議生成函數
const generateAnalysis = (answers) => {
  const analysis = new Set();
  const { gender, age, sleep, workStyle, stress, diet, alcohol, healthGoals = [] } = answers;

  // 1. 睡眠分析
  if (sleep === '少於6小時') {
    analysis.add('睡眠時間不足可能會影響日間精神和長期健康，建議優先調整作息。若您同時感到壓力大，GABA 或許能幫助您放鬆、提升睡眠品質。');
  }

  // 2. 壓力分析
  if (stress === '壓力山大') {
    analysis.add('高壓力水平會消耗大量維生素B群，影響情緒和精力。適時補充B群有助於維持神經系統的正常運作。');
  }
  
  // 3. 睡眠與壓力綜合分析
  if (sleep === '少於6小時' && stress === '壓力山大') {
    analysis.add('您正處於壓力和睡眠不足的雙重挑戰下，這會加速身體耗損。除了調整生活節奏，更需要積極補充營養，穩固健康基礎。');
  }

  // 4. 工作型態分析
  if (workStyle === '長時間久坐辦公') {
    analysis.add('長時間久坐會減緩新陳代謝，並對肩頸、眼睛造成負擔。記得定時起身活動，並留意相關的營養補充，如葉黃素和關節保健品。');
  }

  // 5. 飲食分析
  if (diet === '經常外食/吃加工食品') {
    analysis.add('外食通常多油、多鹽且營養不均，容易造成腸道菌叢失衡。補充益生菌和酵素，有助於維持消化道機能。');
  }
  
  // 6. 飲酒習慣分析
  if (alcohol === '每週3次以上') {
    analysis.add('頻繁飲酒會加重肝臟的代謝負擔。建議適量飲酒，並考慮補充如肝精等營養素來支持肝臟健康。');
  }
  
  // 7. 年齡與保健分析
  if (age === '50歲以上') {
    analysis.add('隨著年齡增長，身體對部分營養素如Q10和鈣質的需求會增加，它們對心血管和骨骼健康至關重要。');
  }
  
  // 8. 美容需求分析
  if (healthGoals.includes('改善皮膚')) {
    analysis.add('皮膚是身體狀況的鏡子。想由內而外地改善膚質，除了外在保養，補充膠原蛋白、珍珠粉和維生素C會是很好的選擇。');
  }
  
  // 9. 活力與疲勞分析
  if (healthGoals.includes('增加活力') || healthGoals.includes('容易疲倦')) {
    analysis.add('感到疲倦或希望提升活力，通常與能量代謝有關。B群和馬卡等營養素，是支持身體能量轉換的關鍵。');
  }

  // 10. 體重管理分析
  if (healthGoals.includes('減重減脂') || healthGoals.includes('體重管理')) {
    analysis.add('有效的體重管理需要飲食、運動和營養三方面配合。苦瓜胜肽和燃脂相關的補充品可以在您努力的道路上提供額外支持。');
  }

  if (analysis.size === 0) {
    analysis.add('從您的回答來看，您的生活習慣相當不錯！維持良好的作息與飲食是健康的基石。以下是一些可能適合您，用於日常保養的建議。');
  }

  return Array.from(analysis);
};


// POST /api/ai-nutritionist/recommend
router.post('/recommend', async (req, res) => {
  const answers = req.body;
  console.log('收到完整問卷數據:', answers);

  try {
    // 1. 生成分析建議
    const analysisResult = generateAnalysis(answers);

    // 2. 收集推薦產品
    const recommendedProductNames = new Set();
    // 從顯性健康目標推薦
    if (answers.healthGoals) {
      answers.healthGoals.forEach(goal => {
        if (recommendationRules[goal]) {
          recommendationRules[goal].forEach(productName => recommendedProductNames.add(productName));
        }
      });
    }

    // 從隱性需求推薦
    if (answers.stress === '壓力山大' && answers.sleep === '少於6小時') {
      recommendationRules['高壓&睡眠差'].forEach(p => recommendedProductNames.add(p));
    }
    if (answers.alcohol === '每週3次以上') {
      recommendationRules['高頻飲酒'].forEach(p => recommendedProductNames.add(p));
    }
    if (answers.workStyle === '長時間久坐辦公' && (answers.healthGoals.includes('眼睛疲勞') || answers.healthGoals.includes('長期坐姿'))) {
       recommendationRules['久坐&眼睛問題'].forEach(p => recommendedProductNames.add(p));
    }
    if (answers.diet === '經常外食/吃加工食品' && answers.healthGoals.includes('腸道健康')) {
       recommendationRules['外食族&消化問題'].forEach(p => recommendedProductNames.add(p));
    }
    
    const uniqueProductNames = Array.from(recommendedProductNames);

    // 3. 查找產品資訊
    const recommendedProducts = await Product.find({
      'name': { $in: uniqueProductNames }
    });
    
    // 4. 回傳分析與產品
    res.json({
      analysis: analysisResult,
      products: recommendedProducts
    });

  } catch (error) {
    console.error('推薦產品時發生錯誤:', error);
    res.status(500).json({ message: '服務器錯誤，無法獲取推薦' });
  }
});

module.exports = router; 