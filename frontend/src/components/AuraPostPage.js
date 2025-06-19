import React, { useState, useEffect } from 'react';
import './BlogStyles.css';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const AuraPostPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedTag, setSelectedTag] = useState('全部');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [blogSettings, setBlogSettings] = useState({
    blogTitle: 'Aura Post 專欄',
    blogDescription: '健康知識分享，專業營養資訊',
    headerImage: '',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    accentColor: '#007bff'
  });

  const tags = ['全部', '靈性', '家庭', '健康', '醫療', '兒童', '幼兒', '料理', '年齡', '睡眠'];

  // 預設文章數據
  const defaultArticles = [
    {
      id: 1,
      title: '三十五歲的秘密花園',
      description: '三十五歲的清晨，她在鏡子前微笑。不是二十歲那種不經意的笑，也不是三十歲時略帶緊張的笑。',
      tag: '年齡',
      date: '2025-01-17',
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
      id: 2,
      title: '夢境裡的秘密房間',
      description: '她說，枕頭是這世上最忠實的朋友。每個夜晚，當城市的喧囂漸漸沉澱，她開始準備一場與自己的約會。',
      tag: '睡眠',
      date: '2025-01-16',
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

  useEffect(() => {
    // 載入文章數據
    const loadArticles = async () => {
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.blog.articles));
        if (response.ok) {
          const articlesData = await response.json();
          // 轉換MongoDB格式到前台格式
          const formattedArticles = articlesData.map(article => ({
            id: article._id,
            title: article.title,
            description: article.description,
            content: article.content,
            tag: article.tag,
            author: article.author,
            date: new Date(article.date).toISOString().split('T')[0]
          }));
          setArticles(formattedArticles);
        } else {
          // 如果API失敗，使用預設文章並初始化
          setArticles(defaultArticles);
          await fetch(buildApiUrl(API_ENDPOINTS.blog.init), { method: 'POST' });
        }
      } catch (error) {
        console.error('載入文章失敗:', error);
        setArticles(defaultArticles);
      }
    };

    // 載入blog設定
    const loadSettings = async () => {
      try {
        const response = await fetch(buildApiUrl(API_ENDPOINTS.blog.settings));
        if (response.ok) {
          const settingsData = await response.json();
          setBlogSettings({
            blogTitle: settingsData.blogTitle,
            blogDescription: settingsData.blogDescription,
            headerImage: settingsData.headerImage,
            backgroundColor: settingsData.backgroundColor,
            textColor: settingsData.textColor,
            accentColor: settingsData.accentColor
          });
        }
      } catch (error) {
        console.error('載入設定失敗:', error);
      }
    };

    loadArticles();
    loadSettings();
  }, []);

  const filteredArticles = selectedTag === '全部' 
    ? articles 
    : articles.filter(article => article.tag === selectedTag);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSelectedArticle(null);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };



  // 社交分享功能
  const shareToFacebook = (article) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title} - ${article.description}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareToInstagram = (article) => {
    // Instagram 不支援直接分享連結，複製文字到剪貼簿
    const text = `${article.title}\n\n${article.description}\n\n查看完整文章：${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('文章內容已複製到剪貼簿！請貼到 Instagram 貼文中。');
    });
  };

  const shareToLine = (article) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title}\n${article.description}`);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank');
  };

  const shareToWechat = (article) => {
    // WeChat 分享需要特殊處理，這裡提供二維碼生成
    const text = `${article.title}\n\n${article.description}\n\n查看完整文章：${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('文章內容已複製到剪貼簿！請貼到 WeChat 中分享。');
    });
  };

  const shareToTwitter = (article) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title} - ${article.description}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const copyLink = (article) => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('文章連結已複製到剪貼簿！');
    });
  };



  if (selectedArticle) {
    return (
      <div className="article-detail-container">
        <div className="article-detail-header">
          <button className="back-button" onClick={handleBackToList}>
            ← 返回文章列表
          </button>
        </div>
        <article className="article-detail">
          <header className="article-header">
            <span className="article-tag">{selectedArticle.tag}</span>
            <h1 className="article-title">{selectedArticle.title}</h1>
            <div className="article-meta">
              <span className="article-date">{selectedArticle.date}</span>
              <span className="article-author">作者：{selectedArticle.author}</span>
            </div>
          </header>
          <div className="article-content">
            {selectedArticle.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="article-share">
            <h4>分享文章</h4>
            <div className="share-buttons">
              <button 
                className="share-btn facebook"
                onClick={() => shareToFacebook(selectedArticle)}
                title="分享到 Facebook"
              >
                <i className="fab fa-facebook-f"></i>
                Facebook
              </button>
              <button 
                className="share-btn instagram"
                onClick={() => shareToInstagram(selectedArticle)}
                title="分享到 Instagram"
              >
                <i className="fab fa-instagram"></i>
                Instagram
              </button>
              <button 
                className="share-btn line"
                onClick={() => shareToLine(selectedArticle)}
                title="分享到 LINE"
              >
                <i className="fab fa-line"></i>
                LINE
              </button>
              <button 
                className="share-btn wechat"
                onClick={() => shareToWechat(selectedArticle)}
                title="分享到 WeChat"
              >
                <i className="fab fa-weixin"></i>
                WeChat
              </button>
              <button 
                className="share-btn twitter"
                onClick={() => shareToTwitter(selectedArticle)}
                title="分享到 X (Twitter)"
              >
                <i className="fab fa-x-twitter"></i>
                X
              </button>
              <button 
                className="share-btn copy"
                onClick={() => copyLink(selectedArticle)}
                title="複製連結"
              >
                <i className="fas fa-link"></i>
                複製連結
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="aura-post-container">
      <div className="page-header" style={{
        backgroundColor: blogSettings.backgroundColor,
        color: blogSettings.textColor,
        backgroundImage: blogSettings.headerImage ? `url(${blogSettings.headerImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="header-content">
          <div>
            <h1 style={{ color: blogSettings.accentColor }}>{blogSettings.blogTitle}</h1>
            <p style={{ color: blogSettings.textColor }}>{blogSettings.blogDescription}</p>
          </div>
        </div>
      </div>
      
      <div className="blog-navigation">
        <div className="tag-filters">
          {tags.map(tag => (
            <button 
              key={tag}
              className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="articles-container">
        {filteredArticles.length === 0 ? (
          <div className="no-articles">
            <p>目前沒有 "{selectedTag}" 標籤的文章</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map(article => (
              <article 
                key={article.id} 
                className="article-card"
                onClick={() => handleArticleClick(article)}
              >
                <div className="article-card-header">
                  <span className="article-tag">{article.tag}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-card-description">{article.description}</p>
                <div className="article-card-footer">
                  <span className="article-author">作者：{article.author}</span>
                  <span className="read-more">閱讀全文 →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuraPostPage; 