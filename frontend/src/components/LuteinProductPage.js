import React, { useState } from 'react';
import './ProductPage.css';

const LuteinProductPage = ({ onNavigateHome }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    '/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg',
    '/images/日本-葉黃素/a13789b0a1b9488ad91d5eee85a70107.jpg'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* 返回按鈕 */}
        <button className="back-button" onClick={onNavigateHome}>
          <span className="material-icons">arrow_back</span>
          返回首頁
        </button>

        {/* 產品主要內容 */}
        <div className="product-main">
          {/* 產品圖片區 */}
          <div className="product-images">
            <div className="main-image">
              <img src={images[currentImageIndex]} alt="日本葉黃素" />
              <div className="image-nav">
                <button onClick={prevImage} className="nav-btn prev-btn">
                  <span className="material-icons">chevron_left</span>
                </button>
                <button onClick={nextImage} className="nav-btn next-btn">
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="thumbnail-list">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`葉黃素 ${index + 1}`}
                  className={index === currentImageIndex ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* 產品信息區 */}
          <div className="product-info">
            <div className="product-badge">日本進口</div>
            <h1>日本葉黃素護眼膠囊</h1>
            <p className="product-subtitle">金盞花萃取 × 藍莓花青素 × 玉米黃素</p>
            
            <div className="price-section">
              <div className="price-main">
                <span className="current-price">NT$ 1,150</span>
                <span className="original-price">NT$ 1,450</span>
                <span className="discount-badge">21% OFF</span>
              </div>
              <p className="price-note">限時優惠價格</p>
            </div>

            <div className="product-highlights">
              <div className="highlight-item">
                <span className="material-icons">verified</span>
                <span>日本原裝進口</span>
              </div>
              <div className="highlight-item">
                <span className="material-icons">visibility</span>
                <span>護眼專業配方</span>
              </div>
              <div className="highlight-item">
                <span className="material-icons">science</span>
                <span>高濃度萃取</span>
              </div>
            </div>

            <div className="quantity-selector">
              <label>數量：</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart-btn primary">
                <span className="material-icons">shopping_cart</span>
                加入購物車
              </button>
              <button className="buy-now-btn">
                立即購買
              </button>
              <button className="wishlist-btn">
                <span className="material-icons">favorite_border</span>
              </button>
            </div>

            <div className="shipping-info">
              <div className="shipping-item">
                <span className="material-icons">local_shipping</span>
                <span>全館滿千免運費</span>
              </div>
              <div className="shipping-item">
                <span className="material-icons">assignment_return</span>
                <span>7天鑑賞期退換貨</span>
              </div>
            </div>
          </div>
        </div>

        {/* 產品詳細信息 */}
        <div className="product-details">
          <div className="details-tabs">
            <div className="tab active">產品介紹</div>
            <div className="tab">成分說明</div>
            <div className="tab">使用方法</div>
            <div className="tab">注意事項</div>
          </div>

          <div className="tab-content">
            <div className="product-description">
              <h3>產品特色</h3>
              <p>來自日本的頂級護眼配方，採用金盞花萃取的高純度葉黃素，結合藍莓花青素和玉米黃素，為現代人的眼部健康提供全方位保護。特別適合長時間使用3C產品、學生族群及關注眼部保養的族群。</p>
              
              {/* 長條圖整合區域 */}
              <div className="nutrition-analysis">
                <h4>護眼成分分析</h4>
                <div className="chart-container">
                  <img 
                    src="/images/日本-葉黃素/a13789b0a1b9488ad91d5eee85a70107.jpg" 
                    alt="葉黃素護眼成分分析圖" 
                    className="nutrition-chart"
                  />
                </div>
                <div className="chart-description">
                  <p>專業護眼成分分析，展現各成分對眼部健康的重要作用及協同效果。</p>
                </div>
              </div>

              <div className="suitable-groups">
                <h4>適用族群</h4>
                <div className="groups-grid">
                  <div className="group-item">
                    <span className="material-icons">computer</span>
                    <span>3C重度使用者</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">school</span>
                    <span>學生族群</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">work</span>
                    <span>辦公室工作者</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">elderly</span>
                    <span>中老年族群</span>
                  </div>
                </div>
              </div>

              <div className="product-specs">
                <h4>產品規格</h4>
                <div className="specs-table">
                  <div className="spec-row">
                    <span className="spec-label">產品名稱</span>
                    <span className="spec-value">日本葉黃素護眼膠囊</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">產地</span>
                    <span className="spec-value">日本</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">包裝規格</span>
                    <span className="spec-value">60粒/瓶</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">建議用量</span>
                    <span className="spec-value">每日1-2粒，餐後食用</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">保存期限</span>
                    <span className="spec-value">3年</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">保存方式</span>
                    <span className="spec-value">置於陰涼乾燥處，避免陽光直射</span>
                  </div>
                </div>
              </div>

              <div className="health-benefits">
                <h4>護眼功效</h4>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="material-icons">remove_red_eye</span>
                    <div>
                      <strong>視力保護</strong>
                      <p>葉黃素有助於過濾藍光，保護視網膜免受傷害</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">brightness_6</span>
                    <div>
                      <strong>抗氧化</strong>
                      <p>花青素具強效抗氧化作用，延緩眼部老化</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">wb_sunny</span>
                    <div>
                      <strong>黃斑部保護</strong>
                      <p>玉米黃素集中於黃斑部，維護中央視力</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">nightlight</span>
                    <div>
                      <strong>夜間視力</strong>
                      <p>藍莓萃取物有助改善夜間視力和眼部疲勞</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="eye-care-tips">
                <h4>護眼小貼士</h4>
                <div className="tips-grid">
                  <div className="tip-item">
                    <span className="material-icons">schedule</span>
                    <div>
                      <strong>20-20-20法則</strong>
                      <p>每20分鐘看20英尺外物體20秒</p>
                    </div>
                  </div>
                  <div className="tip-item">
                    <span className="material-icons">light_mode</span>
                    <div>
                      <strong>適當照明</strong>
                      <p>保持充足且均勻的光線環境</p>
                    </div>
                  </div>
                  <div className="tip-item">
                    <span className="material-icons">restaurant</span>
                    <div>
                      <strong>均衡飲食</strong>
                      <p>多攝取深綠色蔬菜和橙黃色水果</p>
                    </div>
                  </div>
                  <div className="tip-item">
                    <span className="material-icons">bedtime</span>
                    <div>
                      <strong>充足睡眠</strong>
                      <p>確保每日7-8小時優質睡眠</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="usage-instructions">
                <h4>使用方法</h4>
                <div className="instructions-list">
                  <div className="instruction-item">
                    <span className="step-number">1</span>
                    <p>每日1-2粒，建議餐後30分鐘內食用</p>
                  </div>
                  <div className="instruction-item">
                    <span className="step-number">2</span>
                    <p>配合溫開水服用，避免咀嚼</p>
                  </div>
                  <div className="instruction-item">
                    <span className="step-number">3</span>
                    <p>持續使用2-3個月，效果更明顯</p>
                  </div>
                  <div className="instruction-item">
                    <span className="step-number">4</span>
                    <p>搭配護眼習慣，保護效果加倍</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相關產品推薦 */}
        <div className="related-products">
          <h3>相關產品推薦</h3>
          <div className="related-grid">
            <div className="related-item">
              <img src="/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg" alt="加拿大薑黃魚油" />
              <h4>加拿大薑黃魚油</h4>
              <p>NT$ 1,290</p>
            </div>
            <div className="related-item">
              <img src="/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg" alt="美國關舒活" />
              <h4>美國關舒活</h4>
              <p>NT$ 1,290</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuteinProductPage; 