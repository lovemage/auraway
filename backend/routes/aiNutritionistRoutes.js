const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 深度增強版推薦規則
const recommendationRules = {
  // 健康目標對應推薦
  '提升能量與活力': ['美國-代謝B群Plus', '美國-黑馬卡精氨酸男性活力膠囊', '專業肝精保健食品'],
  '改善睡眠品質': ['美國-夜舒眠GABA'],
  '促進腸道健康': ['波森莓濃縮飲PLUS', '酵纖凍', '青之酵素果凍'],
  '體重管理（減重/增肌）': ['美國-燃纖脂', '日本-孅淨一杯', '美國-苦瓜胜肽'],
  '穩定情緒與壓力': ['美國-夜舒眠GABA', '美國-代謝B群Plus'],
  '增強免疫力': ['【新上市】維生素C+酵母鋅', '加拿大-維生素D3液劑15ml', '美國-綜合維生素軟糖'],
  '改善皮膚與頭髮': ['美妍飲', '【新上市】膠原蛋白胜肽', '珍珠露', '日本蜂王乳'],
  '支持心血管健康': ['日本Q10', '日本-蚓激酶', '加拿大-薑黃魚油'],
  '緩解關節與肌肉不適': ['美國-關舒活'],
  '保護視力': ['日本-葉黃素', '藍莓口味葉黃素口嚼錠'],
  '提升認知功能': ['日本Q10', '加拿大-薑黃魚油', '美國-代謝B群Plus'],
  
  // 隱性需求推薦
  '高壓力+睡眠不足': ['美國-夜舒眠GABA', '美國-代謝B群Plus'],
  '外食族+營養不均': ['波森莓濃縮飲PLUS', '美國-綜合維生素軟糖', '【新上市】維生素C+酵母鋅'],
  '久坐+眼睛疲勞': ['日本-葉黃素', '美國-關舒活'],
  '頻繁飲酒': ['專業肝精保健食品'],
  '缺乏運動': ['美國-代謝B群Plus', '【新上市】維生素C+酵母鋅'],
  '水分不足': ['美國-檸檬酸鈣粉'],
  
  // 年齡相關推薦
  '50歲以上基礎': ['日本Q10', '美國-檸檬酸鈣粉', '美國-綜合維生素軟糖'],
  '65歲以上強化': ['日本Q10', '美國-檸檬酸鈣粉', '美國-綜合維生素軟糖', '【新上市】維生素C+酵母鋅'],
  
  // 性別特定推薦
  '女性基礎': ['【新上市】膠原蛋白胜肽', '美妍飲'],
  '女性30+': ['日本蜂王乳', '【新上市】膠原蛋白胜肽', '美妍飲'],
  '男性基礎': ['美國-黑馬卡精氨酸男性活力膠囊', '專業肝精保健食品'],
  
  // BMI相關推薦
  'BMI偏低': ['美國-綜合維生素軟糖', '【新上市】維生素C+酵母鋅'],
  'BMI超重': ['美國-燃纖脂', '美國-苦瓜胜肽', '日本-孅淨一杯'],
  'BMI肥胖': ['美國-燃纖脂', '美國-苦瓜胜肽', '日本-孅淨一杯'],
  
  // 飲食習慣相關
  '素食營養補充': ['【新上市】維生素C+酵母鋅', '美國-綜合維生素軟糖'],
  '低碳飲食': ['美國-代謝B群Plus', '【新上市】維生素C+酵母鋅']
};

// 深度增強版分析建議生成函數
const generateEnhancedAnalysis = (answers) => {
  const analysis = new Set();
  
  // 解構答案數據
  const {
    gender, age, height, weight,
    diet, foodFrequency, beverages,
    exercise, sleep, stress,
    healthConditions, dietaryRestrictions,
    supplements, healthGoals = [],
    additionalConcerns
  } = answers;
  
  // 1. BMI分析（如果有身高體重數據）
  if (height && weight && weight.weight) {
    const heightM = parseInt(height) / 100;
    const weightKg = parseInt(weight.weight);
    const bmi = weightKg / (heightM * heightM);
    const isAthlete = weight.athleteStatus === '是（運動員/高肌肉量）';
    
    if (bmi < 18.5 && !isAthlete) {
      analysis.add('您的BMI偏低，可能存在營養不足風險。建議增加高蛋白食物攝取，並補充綜合維生素和優質蛋白質，幫助維持健康體重。');
    } else if (bmi >= 25 && bmi < 30 && !isAthlete) {
      analysis.add('您的BMI顯示超重，可能增加心血管風險。建議採用均衡飲食搭配規律運動，並考慮代謝支持營養素如綠茶萃取物或苦瓜胜肽。');
    } else if (bmi >= 30 && !isAthlete) {
      analysis.add('您的BMI顯示肥胖，建議諮詢專業人士制定個人化的飲食與運動計畫，搭配安全有效的代謝支持補充劑。');
    } else if (isAthlete && bmi >= 25) {
      analysis.add('您的BMI可能因肌肉量高而偏高，這是正常現象。建議維持高蛋白飲食，補充支鏈氨基酸和運動營養素支持肌肉修復。');
    }
  }
  
  // 2. 飲食模式深度分析
  if (diet === '外食為主（高油、高鹽或加工食品）') {
    analysis.add('頻繁外食可能導致鈉攝取過量、膳食纖維不足，影響心血管和腸道健康。建議補充益生菌、膳食纖維和抗氧化營養素。');
  } else if (diet === '素食（無肉）' || diet === '純素（無動物製品）') {
    analysis.add('素食飲食需特別注意維生素B12、鐵質、鋅和Omega-3的攝取。建議補充植物性B12複合物和鐵質，搭配維生素C提升吸收率。');
  } else if (diet === '低碳水化合物/生酮飲食') {
    analysis.add('低碳飲食可能影響維生素B群和電解質平衡。建議補充B群複合物和電解質，並監測身體適應狀況。');
  }
  
  // 3. 食物頻率分析
  if (foodFrequency) {
    let lowVegFruit = false;
    let highProcessed = false;
    
    if (foodFrequency['蔬菜'] === '0次' || foodFrequency['水果'] === '0次') {
      lowVegFruit = true;
      analysis.add('蔬果攝取不足會缺乏重要的維生素、礦物質和植化素。建議每日至少5份蔬果，並補充綜合維生素和抗氧化營養素。');
    }
    
    if (foodFrequency['加工食品（如零食、甜點）'] === '3次以上') {
      highProcessed = true;
      analysis.add('高頻率攝取加工食品可能增加發炎反應和代謝負擔。建議減少加工食品，增加天然食物，並補充抗發炎營養素。');
    }
    
    if (foodFrequency['優質蛋白質（如魚、雞肉、豆類）'] === '0次') {
      analysis.add('蛋白質攝取不足會影響肌肉維持和免疫功能。建議每餐包含優質蛋白質，必要時補充胺基酸複合物。');
    }
  }
  
  // 4. 睡眠與壓力交互分析
  if (sleep && stress) {
    const sleepHours = sleep.hours;
    const sleepQuality = sleep.quality;
    const stressLevel = stress.level;
    const mood = stress.mood;
    
    if (sleepHours === '少於6小時' && stressLevel === '高（持續壓力）') {
      analysis.add('睡眠不足合併高壓力會嚴重影響神經內分泌系統，增加心血管疾病風險。建議優先改善睡眠環境，補充GABA、鎂或褪黑激素。');
    }
    
    if (sleepQuality === '差（常感疲倦或難入睡）') {
      analysis.add('睡眠品質差會影響日間表現和長期健康。建議建立規律作息，避免睡前咖啡因，考慮補充天然助眠營養素。');
    }
    
    if (mood === '經常焦慮或低落' && stressLevel === '高（持續壓力）') {
      analysis.add('長期焦慮和高壓力可能影響神經傳導物質平衡。建議補充Omega-3、維生素D和B群，並考慮專業心理諮詢。');
    }
  }
  
  // 5. 運動習慣分析
  if (exercise) {
    const frequency = exercise.frequency;
    const types = exercise.types || [];
    const duration = exercise.duration;
    
    if (frequency === '幾乎不運動') {
      analysis.add('缺乏運動會減緩新陳代謝，影響心血管健康和免疫力。建議從每日30分鐘快走開始，搭配代謝支持營養素。');
    } else if (frequency === '5次以上' && duration === '60分鐘以上') {
      analysis.add('高強度運動會增加蛋白質和抗氧化劑需求。建議補充乳清蛋白、BCAA和維生素C、E，減少運動氧化壓力。');
    }
    
    if (types.includes('力量訓練')) {
      analysis.add('力量訓練需要充足的蛋白質和支鏈氨基酸支持肌肉合成與修復。建議運動後補充優質蛋白質。');
    }
  }
  
  // 6. 水分與飲料分析
  if (beverages) {
    const waterIntake = beverages.waterIntake;
    const otherBeverages = beverages.otherBeverages || [];
    
    if (waterIntake === '少於1公升') {
      analysis.add('水分攝取不足會影響新陳代謝、腎臟功能和體溫調節。建議每日至少1.5-2公升水，並注意電解質平衡。');
    }
    
    if (otherBeverages.includes('含糖飲料')) {
      analysis.add('含糖飲料會增加肥胖和糖尿病風險。建議以水或無糖茶類替代，並補充有助血糖穩定的營養素。');
    }
    
    if (otherBeverages.includes('酒精飲料')) {
      analysis.add('酒精會消耗B群維生素，增加肝臟負擔。建議適量飲酒，並補充B群複合物和護肝營養素。');
    }
  }
  
  // 7. 年齡相關分析
  if (age) {
    const ageNum = parseInt(age);
    if (ageNum >= 50) {
      analysis.add('50歲後身體對輔酶Q10、鈣質、維生素D的需求增加。這些營養素對心血管健康、骨骼強度和肌肉功能至關重要。');
    }
    if (ageNum >= 65) {
      analysis.add('65歲以上長者需特別注意蛋白質攝取和肌肉量維持，建議補充優質蛋白質和維生素D，預防肌少症。');
    }
  }
  
  // 8. 性別特定分析
  if (gender) {
    if (gender.includes('女性')) {
      if (gender === '女性（懷孕）') {
        analysis.add('懷孕期間需要額外的葉酸、鐵質、鈣質和DHA。建議在醫師指導下補充孕期專用營養素。');
      } else if (gender === '女性（哺乳）') {
        analysis.add('哺乳期間營養需求增加，特別是蛋白質、鈣質和維生素D。建議補充哺乳期專用營養素支持母嬰健康。');
      } else {
        analysis.add('女性在不同生理階段都需要特別的營養支持。膠原蛋白、鐵質和鈣質補充能幫助維持健康和美麗。');
      }
    } else if (gender === '男性') {
      analysis.add('男性通常承受較大的工作壓力，且肌肉量較高。馬卡、鋅和B群等營養素能幫助維持活力和體能表現。');
    }
  }
  
  // 9. 健康狀況分析
  if (healthConditions) {
    const diagnosed = healthConditions.diagnosed || [];
    const medications = healthConditions.medications;
    const familyHistory = healthConditions.familyHistory || [];
    
    if (diagnosed.includes('高血壓')) {
      analysis.add('高血壓患者建議控制鈉攝取，增加鉀、鎂和Omega-3攝取。請在醫師指導下選擇合適的營養補充品。');
    }
    
    if (diagnosed.includes('糖尿病')) {
      analysis.add('糖尿病患者需特別注意血糖控制，建議補充有助血糖穩定的營養素如鉻、α-硫辛酸。請諮詢醫師後使用。');
    }
    
    if (familyHistory.includes('心臟病')) {
      analysis.add('心臟病家族史增加心血管風險。建議補充Omega-3、輔酶Q10和抗氧化營養素，並定期健康檢查。');
    }
    
    if (medications && medications !== '無') {
      analysis.add('服用藥物期間使用營養補充品前，請諮詢醫師或藥師，避免藥物交互作用。');
    }
  }
  
  // 10. 健康目標特定分析
  if (healthGoals.length > 0) {
    if (healthGoals.includes('提升能量與活力')) {
      analysis.add('提升活力需要優化細胞能量代謝。B群維生素、輔酶Q10和鐵質是支持能量產生的關鍵營養素。');
    }
    
    if (healthGoals.includes('改善皮膚與頭髮')) {
      analysis.add('皮膚和頭髮健康需要充足的蛋白質、維生素C、生物素和鋅。膠原蛋白補充能從根本改善肌膚彈性。');
    }
    
    if (healthGoals.includes('增強免疫力')) {
      analysis.add('免疫系統需要維生素C、D、鋅和益生菌的支持。均衡的免疫營養能幫助身體抵抗外來威脅。');
    }
  }
  
  // 11. 確保總是有積極的保健建議
  if (analysis.size === 0) {
    analysis.add('預防勝於治療！即使您目前的健康狀況良好，適當的營養補充仍能幫助您維持最佳狀態，預防未來可能的健康問題。');
  }
  
  // 12. 添加現代生活的保健理念
  analysis.add('現代生活節奏快速，環境污染和食物營養密度下降，使得單純依靠飲食難以滿足所有營養需求。科學的營養補充是現代人維持健康的重要策略。');
  
  return Array.from(analysis);
};

// 深度增強版產品推薦邏輯
const generateEnhancedRecommendations = (answers) => {
  const recommendedProductNames = new Set();
  
  // 解構答案數據
  const {
    gender, age, height, weight,
    diet, foodFrequency, beverages,
    exercise, sleep, stress,
    healthConditions, dietaryRestrictions,
    supplements, healthGoals = []
  } = answers;
  
  // 1. 健康目標直接推薦
  healthGoals.forEach(goal => {
    if (recommendationRules[goal]) {
      recommendationRules[goal].forEach(productName => recommendedProductNames.add(productName));
    }
  });
  
  // 2. BMI相關推薦
  if (height && weight && weight.weight) {
    const heightM = parseInt(height) / 100;
    const weightKg = parseInt(weight.weight);
    const bmi = weightKg / (heightM * heightM);
    const isAthlete = weight.athleteStatus === '是（運動員/高肌肉量）';
    
    if (bmi < 18.5 && !isAthlete) {
      recommendationRules['BMI偏低'].forEach(p => recommendedProductNames.add(p));
    } else if (bmi >= 25 && bmi < 30 && !isAthlete) {
      recommendationRules['BMI超重'].forEach(p => recommendedProductNames.add(p));
    } else if (bmi >= 30 && !isAthlete) {
      recommendationRules['BMI肥胖'].forEach(p => recommendedProductNames.add(p));
    }
  }
  
  // 3. 飲食習慣推薦
  if (diet === '外食為主（高油、高鹽或加工食品）') {
    recommendationRules['外食族+營養不均'].forEach(p => recommendedProductNames.add(p));
  } else if (diet === '素食（無肉）' || diet === '純素（無動物製品）') {
    recommendationRules['素食營養補充'].forEach(p => recommendedProductNames.add(p));
  } else if (diet === '低碳水化合物/生酮飲食') {
    recommendationRules['低碳飲食'].forEach(p => recommendedProductNames.add(p));
  }
  
  // 4. 睡眠與壓力相關推薦
  if (sleep && stress) {
    if (sleep.hours === '少於6小時' && stress.level === '高（持續壓力）') {
      recommendationRules['高壓力+睡眠不足'].forEach(p => recommendedProductNames.add(p));
    } else if (sleep.hours === '少於6小時') {
      recommendedProductNames.add('美國-夜舒眠GABA');
    } else if (stress.level === '高（持續壓力）') {
      recommendedProductNames.add('美國-代謝B群Plus');
    }
  }
  
  // 5. 運動習慣推薦
  if (exercise) {
    if (exercise.frequency === '幾乎不運動') {
      recommendationRules['缺乏運動'].forEach(p => recommendedProductNames.add(p));
    }
  }
  
  // 6. 水分攝取推薦
  if (beverages && beverages.waterIntake === '少於1公升') {
    recommendationRules['水分不足'].forEach(p => recommendedProductNames.add(p));
  }
  
  // 7. 年齡相關推薦
  if (age) {
    const ageNum = parseInt(age);
    if (ageNum >= 65) {
      recommendationRules['65歲以上強化'].forEach(p => recommendedProductNames.add(p));
    } else if (ageNum >= 50) {
      recommendationRules['50歲以上基礎'].forEach(p => recommendedProductNames.add(p));
    }
  }
  
  // 8. 性別相關推薦
  if (gender) {
    if (gender.includes('女性') && !gender.includes('懷孕') && !gender.includes('哺乳')) {
      const ageNum = parseInt(age);
      if (ageNum >= 30) {
        recommendationRules['女性30+'].forEach(p => recommendedProductNames.add(p));
      } else {
        recommendationRules['女性基礎'].forEach(p => recommendedProductNames.add(p));
      }
    } else if (gender === '男性') {
      recommendationRules['男性基礎'].forEach(p => recommendedProductNames.add(p));
    }
  }
  
  // 9. 智能補強推薦（確保至少3-5個產品）
  if (recommendedProductNames.size < 3) {
    // 基礎保健三寶
    recommendedProductNames.add('美國-綜合維生素軟糖');
    recommendedProductNames.add('【新上市】維生素C+酵母鋅');
    recommendedProductNames.add('波森莓濃縮飲PLUS');
    
    // 根據性別和年齡補強
    if (gender && gender.includes('女性')) {
      recommendedProductNames.add('【新上市】膠原蛋白胜肽');
      recommendedProductNames.add('美妍飲');
    } else if (gender === '男性') {
      recommendedProductNames.add('美國-代謝B群Plus');
      recommendedProductNames.add('專業肝精保健食品');
    }
  }
  
  return Array.from(recommendedProductNames);
};

// POST /api/ai-nutritionist/recommend
router.post('/recommend', async (req, res) => {
  const answers = req.body;
  console.log('收到深度增強版問卷數據:', JSON.stringify(answers, null, 2));

  try {
    // 1. 生成深度分析建議
    const analysisResult = generateEnhancedAnalysis(answers);
    
    // 2. 生成個人化產品推薦
    const recommendedProductNames = generateEnhancedRecommendations(answers);
    
    console.log('推薦產品名稱:', recommendedProductNames);

    // 3. 查找產品資訊
    const recommendedProducts = await Product.find({
      'name': { $in: recommendedProductNames }
    });
    
    console.log('找到的產品數量:', recommendedProducts.length);

    // 4. 為每個產品添加推薦理由和科學依據
    const productsWithReasons = recommendedProducts.map(product => {
      let benefits = '';
      let evidence = '';
      
      // 根據產品類型設定效益和科學依據
      if (product.name.includes('B群')) {
        benefits = '支持能量代謝、神經系統功能、減少疲勞';
        evidence = 'B群維生素是細胞能量代謝的輔酶，有助於維持神經系統正常運作';
      } else if (product.name.includes('GABA')) {
        benefits = '促進放鬆、改善睡眠品質、緩解壓力';
        evidence = 'GABA是主要的抑制性神經傳導物質，有助於神經系統放鬆';
      } else if (product.name.includes('膠原蛋白')) {
        benefits = '支持皮膚彈性、關節健康、毛髮光澤';
        evidence = '膠原蛋白是皮膚和結締組織的主要結構蛋白';
      } else if (product.name.includes('益生菌') || product.name.includes('波森')) {
        benefits = '改善腸道菌群平衡、支持消化健康、增強免疫力';
        evidence = '益生菌有助於維持腸道微生態平衡，支持免疫系統功能';
      } else if (product.name.includes('Q10')) {
        benefits = '支持心血管健康、細胞能量產生、抗氧化';
        evidence = '輔酶Q10是細胞粒線體能量產生的關鍵輔酶';
      } else if (product.name.includes('維生素C') || product.name.includes('鋅')) {
        benefits = '增強免疫力、抗氧化、支持膠原合成';
        evidence = '維生素C和鋅是免疫系統和抗氧化防禦的重要營養素';
      } else if (product.name.includes('葉黃素')) {
        benefits = '保護視網膜、過濾藍光、維護眼部健康';
        evidence = '葉黃素是視網膜黃斑部的主要色素，具有抗氧化和濾光功能';
      } else if (product.name.includes('鈣')) {
        benefits = '維持骨骼健康、肌肉收縮、神經傳導';
        evidence = '鈣是骨骼和牙齒的主要成分，也參與多項生理功能';
      } else if (product.name.includes('馬卡')) {
        benefits = '提升活力、支持男性健康、改善體能表現';
        evidence = '馬卡含有豐富的胺基酸和微量元素，傳統上用於增強體力';
      } else if (product.name.includes('肝精')) {
        benefits = '支持肝臟代謝、解毒功能、維護肝臟健康';
        evidence = '肝精含有豐富的胺基酸和維生素，有助於肝臟功能維持';
      } else {
        benefits = '支持整體健康、補充日常營養需求';
        evidence = '均衡的營養補充有助於維持身體各項機能正常運作';
      }
      
      return {
        ...product.toObject(),
        benefits,
        evidence
      };
    });

    // 5. 生成個人化免責聲明
    const disclaimer = `
      ⚠️ 重要聲明：
      • 本分析基於您提供的資訊，僅供參考，不可替代專業醫療建議
      • 如有慢性疾病或正在服用藥物，請先諮詢醫師或藥師
      • 營養補充品應搭配均衡飲食和健康生活型態
      • 懷孕、哺乳期間或18歲以下請在專業指導下使用
      • 如有不適請立即停用並諮詢醫療專業人員
      
      🌟 Auraway Shop 致力於提供優質保健產品，幫助您維持健康生活！
    `.trim();

    res.json({
      analysis: analysisResult,
      products: productsWithReasons,
      disclaimer: disclaimer,
      totalRecommendations: productsWithReasons.length,
      userProfile: {
        hasHealthGoals: healthGoals.length > 0,
        primaryConcerns: answers.healthGoals || [],
        riskFactors: generateRiskFactors(answers)
      }
    });

  } catch (error) {
    console.error('深度分析處理錯誤:', error);
    res.status(500).json({ 
      error: '分析過程中發生錯誤，請稍後再試',
      details: error.message 
    });
  }
});

// 生成風險因子摘要
const generateRiskFactors = (answers) => {
  const riskFactors = [];
  
  if (answers.sleep && answers.sleep.hours === '少於6小時') {
    riskFactors.push('睡眠不足');
  }
  
  if (answers.stress && answers.stress.level === '高（持續壓力）') {
    riskFactors.push('高壓力');
  }
  
  if (answers.exercise && answers.exercise.frequency === '幾乎不運動') {
    riskFactors.push('缺乏運動');
  }
  
  if (answers.diet === '外食為主（高油、高鹽或加工食品）') {
    riskFactors.push('飲食不均衡');
  }
  
  if (answers.beverages && answers.beverages.waterIntake === '少於1公升') {
    riskFactors.push('水分攝取不足');
  }
  
  return riskFactors;
};

module.exports = router; 