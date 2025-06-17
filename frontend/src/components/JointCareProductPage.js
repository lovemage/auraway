import React, { useState } from 'react';
import './ProductPage.css';

const JointCareProductPage = ({ onNavigateHome }) => {
  const images = [
    '/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg'
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
            alt="美國關舒活" 
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
            美國進口
          </div>
          <h1>美國關舒活關節保健膠囊</h1>
          <div className="price-section">
            <span className="discount-price">NT$ 1,290</span>
            <span className="original-price">NT$ 1,580</span>
          </div>
          <p className="product-description">
            來自美國的專業關節保健配方，結合葡萄糖胺、軟骨素、MSM和薑黃素，
            為您的關節提供全方位保護。有效維護關節軟骨健康，減緩關節不適，
            提升活動靈活度，適合關注關節保健的族群。
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國關舒活</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-關舒活/1dbc1283f878f2773accab97e1d0eb78.jpg" 
            alt="關舒活關節保健成分分析圖" 
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
          <li>美國原裝進口，品質保證</li>
          <li>複合式關節保健配方</li>
          <li>含葡萄糖胺、軟骨素、MSM</li>
          <li>添加薑黃素抗發炎成分</li>
          <li>維護關節軟骨健康</li>
          <li>提升關節活動靈活度</li>
        </ul>

        <h2>關節保健功效分析</h2>
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
              accessibility
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>關節靈活</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升關節活動度</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              healing
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>軟骨保護</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維護軟骨健康</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              self_improvement
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>舒緩不適</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>減緩關節不適感</p>
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>銀髮族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>關節退化、需要保健</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              fitness_center
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>運動愛好者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>高強度運動、關節負荷大</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              work
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>上班族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>久坐、關節僵硬</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>120粒/瓶</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>建議用量</h4>
              <p style={{ color: 'var(--text-primary)' }}>每日2-3粒，餐後食用</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>美國製造</p>
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
          建議每日2-3粒，餐後食用，配合溫開水服用。
          持續使用3個月以上效果更佳。孕婦、哺乳期婦女及慢性疾病患者，
          請先諮詢醫師建議後再食用。
        </p>
      </div>
    </div>
  );
};

export default JointCareProductPage; 