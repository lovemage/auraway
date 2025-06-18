const express = require('express');
const router = express.Router();
const { Article, BlogSettings } = require('../models/Blog');

// 文章相關路由

// 獲取所有文章
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 獲取單篇文章
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: '文章不存在' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 創建文章
router.post('/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 更新文章
router.put('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!article) {
      return res.status(404).json({ message: '文章不存在' });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 刪除文章
router.delete('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: '文章不存在' });
    }
    res.json({ message: '文章已刪除' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Blog設定相關路由

// 獲取Blog設定
router.get('/settings', async (req, res) => {
  try {
    let settings = await BlogSettings.findOne();
    if (!settings) {
      // 如果沒有設定，創建預設設定
      settings = new BlogSettings({});
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 更新Blog設定
router.put('/settings', async (req, res) => {
  try {
    let settings = await BlogSettings.findOne();
    if (!settings) {
      settings = new BlogSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const savedSettings = await settings.save();
    res.json(savedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 初始化預設文章（僅在沒有文章時執行）
router.post('/init', async (req, res) => {
  try {
    const articleCount = await Article.countDocuments();
    if (articleCount === 0) {
      const defaultArticles = [
        {
          title: '三十五歲的秘密花園',
          description: '三十五歲的清晨，她在鏡子前微笑。不是二十歲那種不經意的笑，也不是三十歲時略帶緊張的笑。',
          tag: '年齡',
          author: '編輯部',
          content: `三十五歲的清晨，她在鏡子前微笑。

不是二十歲那種不經意的笑，也不是三十歲時略帶緊張的笑。這是一種知道了某個秘密之後的笑——彷彿整個宇宙悄悄在她耳邊說了一個只有她才聽得懂的笑話。

眼角的細紋像是時光留下的密碼，每一道都記錄著一個故事：第一道是熬夜哄睡孩子時月光的痕跡，第二道是和閨蜜笑到流淚的證明，第三道...啊，那是看透了卻不說破的智慧印記。

她開始懂得，年齡不是數字，是釀造。像一瓶好酒，需要恰到好處的溫度、濕度，還有最重要的——時間。二十歲是清冽的白葡萄酒，三十歲是初熟的紅酒，而三十五歲？她是帶著神秘香料味的陳釀，每一口都有不同的層次。

衣櫃裡，那件買了五年都沒穿過的小黑裙終於找到了主人。不是因為身材變了，而是因為她終於知道怎麼穿它——不是為了證明什麼，只是因為今天想要那種感覺。她學會了與自己的身體對話，知道哪一寸肌膚喜歡絲綢的觸感，哪一處曲線適合羊絨的擁抱。

午後的陽光灑進書房，她泡了一杯茶，茶葉在水中舒展的樣子像極了她自己。不急不躁，慢慢綻放。手機裡的群組訊息響個不停，她選擇性地回覆——這也是三十五歲的特權，知道什麼值得立即回應，什麼可以等到月亮升起。

她發現了一個秘密：原來，女人最美的年紀不是十八歲的青澀，不是二十五歲的綻放，而是當她開始真正認識自己的那一刻。三十五歲的她，終於明白了身體的語言、情緒的節奏、慾望的形狀。

晚餐時，她為自己開了一瓶酒，點了一根蠟燭。不為任何人，只為慶祝這個普通又特別的夜晚。窗外的城市燈火闌珊，她知道，在這個年紀，她既是自己的女王，也是自己的騎士。

月光爬上窗檯時，她在日記本上寫下：「三十五歲，我終於成為了那個小時候想要成為的神秘女人。」

筆尖停頓了一下，她又加了一句：「而且，比想像中更快樂。」`
        },
        {
          title: '夢境裡的秘密房間',
          description: '她說，枕頭是這世上最忠實的朋友。每個夜晚，當城市的喧囂漸漸沉澱，她開始準備一場與自己的約會。',
          tag: '睡眠',
          author: '編輯部',
          content: `她說，枕頭是這世上最忠實的朋友。

每個夜晚，當城市的喧囂漸漸沉澱，她開始準備一場與自己的約會。浴室裡瀰漫著薰衣草的香氣，那是她為睡眠調配的魔法藥水。熱水輕撫過肌膚，洗去的不只是一天的疲憊，還有那些不屬於夜晚的思緒。

臥室是她的秘密王國。床單是月光色的埃及棉，觸感像雲朵的耳語。她曾經數過，這張床陪伴了她三千多個夜晚——見證過她的眼淚、聽過她的夢話、收藏著她所有說不出口的秘密。

十一點二十三分，這是她與睡眠之神的約定時間。不早不晚，剛剛好。她發現身體有自己的時鐘，在這個時刻，每一個細胞都開始唱起安眠曲。她輕輕闔上眼，像是關上通往白天世界的門。

在半夢半醒之間，她常常能聽見身體的私語。心臟說：「今天跳了八萬六千四百次，為妳。」肺說：「我收集了一整天的氧氣，現在要慢慢釋放。」皮膚說：「夜晚是我的修復時光，明天妳會更美。」

她的夢境是一座神秘的圖書館，每本書都是一個故事：有時她在雲端上跳舞，有時在深海裡呼吸，有時回到童年的花園，有時預見未來的模樣。最奇妙的是，每個夢都像是靈魂寫給她的密信，用符號和隱喻訴說著內心深處的渴望。

凌晨三點，月光特別明亮的時刻，她偶爾會醒來。不是失眠，而是一種神聖的清醒。在這個時刻，整個世界都在沉睡，只有她和宇宙在對話。她會喝一小口水，感受生命在身體裡流淌，然後帶著感激重新入睡。

她說，真正懂得睡眠的女人，擁有一種特別的光澤——那是從內而外的修復，是夜晚贈予的禮物。睡眠不是時間的浪費，而是靈魂的煉金術，把疲憊轉化為能量，把憂慮轉化為智慧，把昨天轉化為明天。

清晨的第一縷陽光親吻她的臉頰時，她微笑著醒來。枕頭上還留著夢的痕跡，她知道，今夜十一點二十三分，她們會再次相遇。

在這個永恆的循環裡，她找到了生命最美的節奏。`
        }
      ];

      await Article.insertMany(defaultArticles);
      res.json({ message: '預設文章已初始化', count: defaultArticles.length });
    } else {
      res.json({ message: '文章已存在，無需初始化', count: articleCount });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 