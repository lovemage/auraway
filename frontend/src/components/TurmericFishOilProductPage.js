import React, { useState } from 'react';
import './ProductPage.css';

function TurmericFishOilProductPage({ onNavigateHome }) {
  const images = [
    '/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg'
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
            alt="加拿大薑黃魚油" 
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
          <div className="product-badge" style={{ backgroundColor: 'var(--primary-color)' }}>
            加拿大進口
          </div>
          <h1>加拿大薑黃魚油膠囊</h1>
          <div className="price-section">
            <span className="discount-price">NT$ 1,290</span>
            <span className="original-price">NT$ 1,590</span>
          </div>
          <p className="product-description">
            來自加拿大純淨海域的頂級深海魚油，結合印度薑黃素精華，為您提供雙重健康守護。
            每粒膠囊含有豐富的Omega-3脂肪酸（EPA+DHA）和95%高純度薑黃素，
            有效支持心血管健康、抗發炎和增強免疫力。
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>加拿大薑黃魚油</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/加拿大-薑黃魚油/1c20d30fef2bf3f6db3e32619edb27e5.jpg" 
            alt="薑黃魚油營養成分分析圖" 
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
          <li>加拿大純淨海域深海魚油</li>
          <li>95%高純度薑黃素配方</li>
          <li>豐富Omega-3脂肪酸（EPA+DHA）</li>
          <li>支持心血管健康</li>
          <li>天然抗發炎特性</li>
          <li>增強免疫系統功能</li>
        </ul>

        <h2>健康功效分析</h2>
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
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              favorite
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>心血管保護</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維持心臟健康，調節血脂</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>腦部健康</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>支持腦部發育，增強記憶力</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              healing
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>抗發炎作用</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>天然抗發炎，舒緩身體不適</p>
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
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              elderly
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>中老年族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>心血管保健需求</p>
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
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>上班族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>工作壓力大、需要保健</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              fitness_center
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>運動愛好者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>運動後恢復保健</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>60粒/瓶</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>建議用量</h4>
              <p style={{ color: 'var(--text-primary)' }}>每日1-2粒，餐後食用</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>加拿大製造</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          color: 'var(--text-primary)', 
          lineHeight: '1.8', 
          background: 'var(--white)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          建議每日1-2粒，餐後30分鐘內食用，配合溫開水服用。
          持續使用3個月以上效果更佳。孕婦、哺乳期婦女及慢性疾病患者，
          請先諮詢醫師或營養師建議後再食用。
        </p>
      </div>
    </div>
  );
}

export default TurmericFishOilProductPage; 