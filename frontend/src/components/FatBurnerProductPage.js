import React, { useState } from 'react';
import './ProductPage.css';

const FatBurnerProductPage = ({ onNavigateHome }) => {
  const images = [
    '/images/美國-燃纖脂/c3c6e7d6079320a3f5577e12295fbc58.jpg'
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
            alt="美國燃纖脂" 
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
          <h1>美國燃纖脂專業燃脂膠囊</h1>
          <div className="price-section">
            <span className="discount-price">NT$ 3,100</span>
            <span className="original-price">NT$ 3,400</span>
          </div>
          <p className="product-description">
            來自美國的專業燃脂配方，結合綠茶萃取、左旋肉鹼和藤黃果萃取物，
            為您提供全方位的體重管理支持。有效促進新陳代謝，加速脂肪燃燒，
            抑制食慾並阻斷脂肪吸收，適合追求健康體態的族群。
          </p>
          <button className="add-to-cart" onClick={onNavigateHome}>
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國燃纖脂</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-燃纖脂/564a5520dbfa7cefaae8fe84e102c81e.jpg" 
            alt="燃纖脂燃脂成分分析圖" 
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
          <li>三重燃脂配方組合</li>
          <li>含綠茶萃取EGCG</li>
          <li>左旋肉鹼促進脂肪代謝</li>
          <li>藤黃果抑制脂肪合成</li>
          <li>天然成分安全有效</li>
        </ul>

        <h2>燃脂功效分析</h2>
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
              local_fire_department
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>燃燒脂肪</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>加速脂肪分解</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              speed
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>提升代謝</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進新陳代謝</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              block
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>抑制食慾</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>控制飲食慾望</p>
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
              fitness_center
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>體態管理需求</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>希望雕塑身形</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              directions_run
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>運動愛好者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>提升運動效果</p>
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>久坐上班族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>代謝緩慢、易發胖</p>
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
              <p style={{ color: 'var(--text-primary)' }}>每日2粒，餐前30分鐘</p>
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
          建議每日2粒，餐前30分鐘服用，配合溫開水服用。
          搭配均衡飲食和適度運動效果更佳。孕婦、哺乳期婦女、心臟病患者及慢性疾病患者，
          請先諮詢醫師建議後再食用。
        </p>
      </div>
    </div>
  );
};

export default FatBurnerProductPage; 