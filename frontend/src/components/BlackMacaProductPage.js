import React, { useState } from 'react';
import './ProductPage.css';

const BlackMacaProductPage = ({ onNavigateHome }) => {
  const images = [
    '/images/美國-黑馬卡精氨酸/91ce0a777ac90611c870c9caedd179f7.jpg'
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
            alt="美國黑馬卡精氨酸" 
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
          <h1>美國黑馬卡精氨酸男性活力膠囊</h1>
          <div className="price-section">
            <span className="discount-price">NT$ 1,250</span>
            <span className="original-price">NT$ 1,550</span>
          </div>
          <p className="product-description">
            來自美國的頂級男性活力配方，結合黑馬卡萃取、L-精氨酸和鋅，
            為男性提供全方位的活力支持。有效提升體力和精神狀態，
            增強運動表現，維護男性健康，適合注重活力保健的男性族群。
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國黑馬卡精氨酸</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-黑馬卡精氨酸/2ce503f5a880a3baffb3f6b5871721cc.jpg" 
            alt="黑馬卡精氨酸活力成分分析圖" 
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
          <li>頂級黑馬卡萃取配方</li>
          <li>高純度L-精氨酸</li>
          <li>添加鋅維護男性健康</li>
          <li>提升體力和精神狀態</li>
          <li>增強運動表現</li>
        </ul>

        <h2>男性活力功效分析</h2>
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
              flash_on
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>提升活力</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>增強體力和精神</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              fitness_center
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>運動表現</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升運動能力</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              health_and_safety
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>男性保健</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維護男性健康</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>需要活力支持</p>
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
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>運動健身者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>提升運動表現</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              person
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>中年男性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>活力漸減、需要保健</p>
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
              <p style={{ color: 'var(--text-primary)' }}>每日2粒，餐後食用</p>
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
          建議每日2粒，餐後食用，配合溫開水服用。
          持續使用效果更佳。18歲以下、孕婦、哺乳期婦女及慢性疾病患者，
          請先諮詢醫師建議後再食用。
        </p>
      </div>
    </div>
  );
};

export default BlackMacaProductPage; 