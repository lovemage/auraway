import React, { useState } from 'react';
import './ProductPage.css';

const SleepGABAProductPage = ({ onNavigateHome }) => {
  const images = [
    '/images/美國-夜舒眠GABA/6c1ea9955b8cc16a1e72a661f1e2f5f2.jpg'
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
            alt="美國夜舒眠GABA" 
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
          <h1>美國夜舒眠GABA助眠膠囊</h1>
          <div className="price-section">
            <span className="discount-price">NT$ 1,190</span>
            <span className="original-price">NT$ 1,490</span>
          </div>
          <p className="product-description">
            來自美國的專業助眠配方，結合GABA、洋甘菊萃取和褪黑激素，
            為您提供自然舒緩的睡眠支持。有效放鬆神經系統，改善睡眠品質，
            幫助快速入睡並維持深層睡眠，適合現代忙碌生活的睡眠調理。
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國夜舒眠GABA</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-夜舒眠GABA/9ac955a8307e9f684a7b6eb49400337a.jpg" 
            alt="夜舒眠GABA助眠成分分析圖" 
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
          <li>天然GABA神經舒緩配方</li>
          <li>添加洋甘菊萃取物</li>
          <li>含褪黑激素調節生理時鐘</li>
          <li>無依賴性天然助眠</li>
          <li>改善睡眠品質</li>
        </ul>

        <h2>助眠功效分析</h2>
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
              bedtime
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>快速入睡</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>縮短入睡時間</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              nights_stay
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>深層睡眠</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升睡眠品質</p>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>神經放鬆</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>舒緩緊張情緒</p>
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
              work
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>工作壓力大</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>難以放鬆入睡</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              schedule
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>作息不規律</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>生理時鐘紊亂</p>
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>中高齡族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>睡眠品質下降</p>
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
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>建議用量</h4>
              <p style={{ color: 'var(--text-primary)' }}>睡前30分鐘1粒</p>
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
          建議睡前30分鐘服用1粒，配合溫開水服用。
          避免與酒精或其他鎮靜劑同時使用。孕婦、哺乳期婦女及慢性疾病患者，
          請先諮詢醫師建議後再食用。
        </p>
      </div>
    </div>
  );
};

export default SleepGABAProductPage; 