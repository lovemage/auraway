import React, { useState } from 'react';
import './ProductPage.css';

function RoyalJellyProductPage() {
  const images = [
    "/images/日本蜂王乳/e9cc017fd6ade38af291acf2d319f1dc.jpg",
    "/images/日本蜂王乳/rXxaTRc.jpg"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="ProductPage">
      <div className="product-container">
        <div className="image-carousel">
          <img 
            src={images[currentImageIndex]} 
            alt="日本蜂王乳" 
            className="carousel-image"
          />
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="carousel-arrow prev">
                <span className="material-icons">chevron_left</span>
              </button>
              <button onClick={nextImage} className="carousel-arrow next">
                <span className="material-icons">chevron_right</span>
              </button>
              <div className="carousel-controls">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)} 
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="product-details">
          <div className="product-badge" style={{ backgroundColor: 'var(--secondary-color)' }}>
            日本進口
          </div>
          <h1>日本蜂王乳</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,480</span>
            <span className="original-price">NT$1,780</span>
          </div>
          <p className="product-description">
            來自日本的頂級蜂王乳，富含豐富的蛋白質、維生素和礦物質，
            是天然的美容聖品。有助於維持青春活力，促進新陳代謝，讓您由內而外散發光彩。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>日本蜂王乳</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/日本蜂王乳/rXxaTRc.jpg" 
            alt="日本蜂王乳產品成分與功效說明" 
            style={{ 
              width: '100%', 
              maxWidth: '800px', 
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(130, 191, 183, 0.2)'
            }} 
          />
        </div>

        <h2>商品特色</h2>
        <ul>
          <li>日本原裝進口，品質保證</li>
          <li>富含天然蜂王乳精華</li>
          <li>含有豐富的蛋白質和維生素</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過日本嚴格品質檢驗</li>
          <li>美容養顏，延緩衰老</li>
        </ul>

        <h2>蜂王乳功效分析</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px', 
          margin: '20px 0' 
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              face
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>美容養顏</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進肌膚再生</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              energy_savings_leaf
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>抗氧化</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>延緩衰老過程</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              psychology
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>增強活力</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升精神狀態</p>
          </div>
        </div>

        <h2>適用族群</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '15px', 
          margin: '20px 0' 
        }}>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              woman
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>愛美女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>追求美麗肌膚與青春活力</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              elderly
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>熟齡族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>需要抗衰老保養</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              work
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>職業女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>工作壓力大、需要保養</p>
          </div>
        </div>

        <h2>產品規格</h2>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '25px',
          margin: '20px 0'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>內容量</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>30粒/瓶</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>冷藏保存，避免高溫</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>日本製造</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          background: 'var(--white)', 
          padding: '20px', 
          borderRadius: '10px',
          borderLeft: '4px solid var(--secondary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          <strong>建議用量：</strong>每日1-2粒<br/>
          <strong>食用時間：</strong>早餐前空腹食用效果最佳<br/>
          <strong>注意事項：</strong>請搭配溫開水服用<br/>
          <strong>持續使用：</strong>建議連續使用2-3個月，效果更顯著
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>為什麼選擇日本蜂王乳？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>天然美容聖品</h2>
          <p style={{ opacity: '0.9' }}>蜂王乳含有豐富的營養成分，是大自然賜予的珍貴美容保養品</p>
        </div>
      </div>
    </div>
  );
}

export default RoyalJellyProductPage; 