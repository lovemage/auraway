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
  const { gender, age, sleep, workStyle, stress, diet, alcohol, healthGoals = [], exercise, waterIntake } = answers;

  // 1. 睡眠分析
  if (sleep === '少於6小時') {
    analysis.add('睡眠時間不足會影響日間精神和長期健康。適當的營養補充如GABA能幫助您放鬆、提升睡眠品質，讓身體得到充分休息。');
  }

  // 2. 壓力分析
  if (stress === '壓力山大' || stress === '高（持續壓力）') {
    analysis.add('高壓力會消耗大量維生素B群，影響情緒和精力。補充B群營養素有助於維持神經系統正常運作，提升抗壓能力。');
  }
  
  // 3. 睡眠與壓力綜合分析
  if (sleep === '少於6小時' && (stress === '壓力山大' || stress === '高（持續壓力）')) {
    analysis.add('您正處於壓力和睡眠不足的雙重挑戰下，這會加速身體耗損。積極的營養補充能幫助您穩固健康基礎，提升整體生活品質。');
  }

  // 4. 工作型態分析
  if (workStyle === '長時間久坐辦公') {
    analysis.add('長時間久坐會減緩新陳代謝，對肩頸、眼睛造成負擔。葉黃素和關節保健品能為您的職場健康提供重要支持。');
  }

  // 5. 飲食分析
  if (diet === '經常外食/吃加工食品' || diet === '外食為主（高油、高鹽或加工食品）') {
    analysis.add('外食通常營養不均衡，容易造成腸道菌叢失衡。益生菌和酵素補充品能幫助您維持消化道機能，改善營養吸收。');
  }
  
  // 6. 飲酒習慣分析
  if (alcohol === '每週3次以上') {
    analysis.add('頻繁飲酒會加重肝臟代謝負擔。肝精等營養素能支持肝臟健康，幫助身體更好地處理代謝壓力。');
  }
  
  // 7. 年齡與保健分析
  if (age === '50歲以上' || age === '65 歲以上') {
    analysis.add('隨著年齡增長，身體對Q10、鈣質等營養素的需求會增加。適當補充這些營養素對心血管和骨骼健康至關重要。');
  }
  
  // 8. 運動習慣分析
  if (exercise === '幾乎不運動') {
    analysis.add('缺乏運動會影響新陳代謝和免疫力。維生素B群和免疫支持營養素能為您的身體提供額外的活力支持。');
  }
  
  // 9. 水分攝取分析
  if (waterIntake === '少於 1 公升') {
    analysis.add('水分攝取不足會影響身體各項機能。除了增加飲水量，鈣質補充也很重要，有助於維持電解質平衡。');
  }

  // 10. 性別特定分析
  if (gender === '女性') {
    analysis.add('女性在不同生理階段都需要特別的營養支持。膠原蛋白、美容營養素能幫助您由內而外散發健康光采。');
  } else if (gender === '男性') {
    analysis.add('男性通常承受較大的工作壓力，需要更多的活力支持。馬卡、B群等營養素能幫助您維持最佳狀態。');
  }
  
  // 11. 健康目標分析
  if (healthGoals.includes('改善皮膚與頭髮') || healthGoals.includes('改善皮膚')) {
    analysis.add('皮膚健康反映整體身體狀況。膠原蛋白、珍珠粉和維生素C的補充，能幫助您由內而外改善膚質。');
  }
  
  if (healthGoals.includes('提升能量與活力') || healthGoals.includes('增加活力')) {
    analysis.add('提升活力需要從營養代謝著手。B群和馬卡等營養素是支持身體能量轉換的關鍵元素。');
  }

  if (healthGoals.includes('減重減脂') || healthGoals.includes('體重管理')) {
    analysis.add('健康的體重管理需要營養、運動和代謝的全面配合。專業的代謝支持補充品能在您的努力過程中提供有力協助。');
  }

  // 確保總是有積極的保健建議
  if (analysis.size === 0) {
    analysis.add('預防勝於治療！即使您目前的生活習慣不錯，適當的營養補充仍能幫助您維持最佳健康狀態，預防未來可能的健康問題。');
  }
  
  // 添加積極的保健理念
  analysis.add('現代生活節奏快速，即使再健康的飲食也難以完全滿足身體所需。適當的營養補充是現代人維持健康的重要策略。');

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
    if (answers.healthGoals && answers.healthGoals.length > 0) {
      answers.healthGoals.forEach(goal => {
        if (recommendationRules[goal]) {
          recommendationRules[goal].forEach(productName => recommendedProductNames.add(productName));
        }
      });
    }

    // 從隱性需求推薦（基於生活習慣）
    if (answers.stress === '壓力山大' && answers.sleep === '少於6小時') {
      recommendationRules['高壓&睡眠差'].forEach(p => recommendedProductNames.add(p));
    }
    if (answers.alcohol === '每週3次以上') {
      recommendationRules['高頻飲酒'].forEach(p => recommendedProductNames.add(p));
    }
    if (answers.workStyle === '長時間久坐辦公') {
       recommendationRules['久坐&眼睛問題'].forEach(p => recommendedProductNames.add(p));
    }
    if (answers.diet === '經常外食/吃加工食品') {
       recommendationRules['外食族&消化問題'].forEach(p => recommendedProductNames.add(p));
    }

    // 基於年齡和性別的基礎保健推薦
    if (answers.age === '50歲以上' || answers.age === '65 歲以上') {
      recommendedProductNames.add('日本Q10');
      recommendedProductNames.add('美國-檸檬酸鈣粉');
      recommendedProductNames.add('美國-綜合維生素軟糖');
    }
    
    if (answers.gender === '女性') {
      recommendedProductNames.add('【新上市】膠原蛋白胜肽');
      recommendedProductNames.add('美妍飲');
      if (answers.age === '30-49' || answers.age === '50歲以上') {
        recommendedProductNames.add('日本蜂王乳');
      }
    }
    
    if (answers.gender === '男性') {
      recommendedProductNames.add('美國-黑馬卡精氨酸男性活力膠囊');
      recommendedProductNames.add('專業肝精保健食品');
    }

    // 基於生活習慣的通用推薦
    if (answers.sleep === '少於6小時') {
      recommendedProductNames.add('美國-夜舒眠GABA');
    }
    
    if (answers.stress === '壓力山大' || answers.stress === '高（持續壓力）') {
      recommendedProductNames.add('美國-代謝b群plus');
    }
    
    if (answers.exercise === '幾乎不運動') {
      recommendedProductNames.add('美國-代謝b群plus');
      recommendedProductNames.add('【新上市】維生素C+酵母鋅');
    }
    
    if (answers.waterIntake === '少於 1 公升') {
      recommendedProductNames.add('美國-檸檬酸鈣粉');
    }

    // 確保至少推薦3-5個產品（如果推薦數量太少）
    if (recommendedProductNames.size < 3) {
      // 添加通用基礎保健產品
      recommendedProductNames.add('美國-綜合維生素軟糖');
      recommendedProductNames.add('【新上市】維生素C+酵母鋅');
      recommendedProductNames.add('波森莓濃縮飲PLUS');
      if (answers.gender === '女性') {
        recommendedProductNames.add('【新上市】膠原蛋白胜肽');
      } else {
        recommendedProductNames.add('美國-代謝b群plus');
      }
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