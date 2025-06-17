import React, { useState } from 'react';
import './ProductPage.css';

const JointCareProductPage = ({ onNavigateHome }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    '/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg',
    '/images/美國-關舒活/1dbc1283f878f2773accab97e1d0eb78.jpg'
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
              <img src={images[currentImageIndex]} alt="美國關舒活" />
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
                  alt={`關舒活 ${index + 1}`}
                  className={index === currentImageIndex ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* 產品信息區 */}
          <div className="product-info">
            <div className="product-badge">美國進口</div>
            <h1>美國關舒活關節保健膠囊</h1>
            <p className="product-subtitle">葡萄糖胺 × 軟骨素 × MSM 三重配方</p>
            
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
                <span>美國FDA認證</span>
              </div>
              <div className="highlight-item">
                <span className="material-icons">local_hospital</span>
                <span>醫師推薦配方</span>
              </div>
              <div className="highlight-item">
                <span className="material-icons">fitness_center</span>
                <span>運動族群首選</span>
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
              <p>美國原裝進口的關節保健專業配方，結合葡萄糖胺、軟骨素和MSM三大關鍵成分，為關節提供全方位的營養支持。特別適合運動族群、中老年人及關節保養需求者使用。</p>
              
              {/* 長條圖整合區域 */}
              <div className="nutrition-analysis">
                <h4>成分功效分析</h4>
                <div className="chart-container">
                  <img 
                    src="/images/美國-關舒活/1dbc1283f878f2773accab97e1d0eb78.jpg" 
                    alt="關舒活成分功效分析圖" 
                    className="nutrition-chart"
                  />
                </div>
                <div className="chart-description">
                  <p>專業配方分析顯示各成分的協同作用，為關節健康提供最佳保護。</p>
                </div>
              </div>

              <div className="suitable-groups">
                <h4>適用族群</h4>
                <div className="groups-grid">
                  <div className="group-item">
                    <span className="material-icons">directions_run</span>
                    <span>運動愛好者</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">elderly</span>
                    <span>中老年族群</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">work</span>
                    <span>久坐上班族</span>
                  </div>
                  <div className="group-item">
                    <span className="material-icons">construction</span>
                    <span>勞動工作者</span>
                  </div>
                </div>
              </div>

              <div className="product-specs">
                <h4>產品規格</h4>
                <div className="specs-table">
                  <div className="spec-row">
                    <span className="spec-label">產品名稱</span>
                    <span className="spec-value">美國關舒活關節保健膠囊</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">產地</span>
                    <span className="spec-value">美國</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">包裝規格</span>
                    <span className="spec-value">90粒/瓶</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">建議用量</span>
                    <span className="spec-value">每日2-3粒，餐後食用</span>
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
                    <span className="material-icons">accessibility</span>
                    <div>
                      <strong>關節靈活</strong>
                      <p>葡萄糖胺幫助維持關節軟骨健康，增進關節活動力</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">healing</span>
                    <div>
                      <strong>軟骨修復</strong>
                      <p>軟骨素促進軟骨組織修復，減緩關節磨損</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">shield</span>
                    <div>
                      <strong>抗發炎</strong>
                      <p>MSM具有天然抗發炎特性，舒緩關節不適</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <span className="material-icons">fitness_center</span>
                    <div>
                      <strong>運動支持</strong>
                      <p>提供運動前後關節保護，維持最佳運動表現</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="usage-instructions">
                <h4>使用方法</h4>
                <div className="instructions-list">
                  <div className="instruction-item">
                    <span className="step-number">1</span>
                    <p>每日2-3粒，建議餐後30分鐘內食用</p>
                  </div>
                  <div className="instruction-item">
                    <span className="step-number">2</span>
                    <p>配合充足水分，有助於成分吸收</p>
                  </div>
                  <div className="instruction-item">
                    <span className="step-number">3</span>
                    <p>持續使用3個月以上，效果更佳</p>
                  </div>
                  <div className="instruction-item">
                    <span className="step-number">4</span>
                    <p>搭配適度運動，維持關節健康</p>
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

export default JointCareProductPage; 