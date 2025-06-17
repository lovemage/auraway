import React, { useState } from 'react';
import './ProductPage.css';

const TurmericFishOilProductPage = ({ onNavigateHome }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    '/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg',
    '/images/加拿大-薑黃魚油/1c20d30fef2bf3f6db3e32619edb27e5.jpg'
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
              <img src={images[currentImageIndex]} alt="加拿大薑黃魚油" />
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
                  alt={`薑黃魚油 ${index + 1}`}
                  className={index === currentImageIndex ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* 產品信息區 */}
          <div className="product-info">
            <div className="product-badge">加拿大進口</div>
            <h1>加拿大薑黃魚油膠囊</h1>
            <p className="product-subtitle">頂級深海魚油 × 薑黃素雙重配方</p>
            
            <div className="price-section">
              <div className="price-main">
                <span className="current-price">NT$ 1,290</span>
                <span className="original-price">NT$ 1,590</span>
                <span className="discount-badge">19% OFF</span>
              </div>
              <p className="price-note">限時優惠價格</p>
            </div>

            <div className="product-highlights">
              <div className="highlight-item">
                <span className="material-icons">verified</span>
                <span>加拿大原裝進口</span>
              </div>
              <div className="highlight-item">
                <span className="material-icons">eco</span>
                <span>深海野生魚油</span>
              </div>
              <div className="highlight-item">
                <span className="material-icons">health_and_safety</span>
                <span>薑黃素增強配方</span>
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
              <p>來自加拿大純淨海域的頂級深海魚油，結合印度薑黃素精華，為您提供雙重健康守護。每粒膠囊含有豐富的Omega-3脂肪酸（EPA+DHA）和95%高純度薑黃素，有效支持心血管健康、抗發炎和增強免疫力。</p>
              
              {/* 長條圖整合區域 */}
              <div className="nutrition-analysis">
                <h4>營養成分分析</h4>
                <div className="chart-container">
                  <img 
                    src="/images/加拿大-薑黃魚油/1c20d30fef2bf3f6db3e32619edb27e5.jpg" 
                    alt="薑黃魚油營養成分分析圖" 
                    className="nutrition-chart"
                  />
                </div>
                <div className="chart-description">
                  <p>專業營養分析顯示本產品的優異成分配比，確保最佳的生物利用率和健康效益。</p>
                </div>
              </div>

              <div className="suitable-groups">
                <h4>適用族群</h4>
                <div className="groups-grid">
                  <div className="group-item">
                    <span className="material-icons">elderly</span>
                    <span>中老年族群</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">work</span>
                    <span>上班族</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">fitness_center</span>
                    <span>運動愛好者</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">health_and_safety</span>
                    <span>注重保健者</span>
                  </div>
                </div>
              </div>

              <div className="product-specs">
                <h4>產品規格</h4>
                <div className="specs-table">
                  <div className="spec-row">
                    <span className="spec-label">產品名稱</span>
                    <span className="spec-value">加拿大薑黃魚油膠囊</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">產地</span>
                    <span className="spec-value">加拿大</span>
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
                <h4>健康功效</h4>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="material-icons">favorite</span>
                    <div>
                      <strong>心血管保護</strong>
                      <p>Omega-3脂肪酸有助維持心臟健康，調節血脂</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">psychology</span>
                    <div>
                      <strong>腦部健康</strong>
                      <p>DHA支持腦部發育，增強記憶力和認知功能</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">healing</span>
                    <div>
                      <strong>抗發炎作用</strong>
                      <p>薑黃素具有天然抗發炎特性，舒緩身體不適</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">shield</span>
                    <div>
                      <strong>免疫增強</strong>
                      <p>提升身體免疫力，增強抵抗力</p>
                    </div>
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
              <img src="/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg" alt="美國關舒活" />
              <h4>美國關舒活</h4>
              <p>NT$ 1,290</p>
            </div>
            <div className="related-item">
              <img src="/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg" alt="日本葉黃素" />
              <h4>日本葉黃素</h4>
              <p>NT$ 1,150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurmericFishOilProductPage; 