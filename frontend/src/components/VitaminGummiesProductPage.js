import React, { useState } from 'react';
import './ProductPage.css';

function VitaminGummiesProductPage() {
  const images = [
    "/images/美國-綜合維生素軟糖/2a06e4486bb2944dbbaf1319cc5f3505.jpg"
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
            alt="美國-綜合維生素軟糖" 
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
            熱銷商品
          </div>
          <h1>美國-綜合維生素軟糖</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,050</span>
            <span className="original-price">NT$1,350</span>
          </div>
          <p className="product-description">
            來自美國的美味綜合維生素軟糖，含12種必需維生素及礦物質，
            口感Q彈香甜，讓補充營養變成一種享受。
            專為不愛吞膠囊的人群設計的營養補充首選。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國綜合維生素軟糖</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-綜合維生素軟糖/b11b75af4af865046307eaf7bee8c16c.jpg" 
            alt="美國綜合維生素軟糖產品成分與功效說明" 
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
          <li>美國原裝進口，FDA認證品質</li>
          <li>12種綜合維生素及礦物質</li>
          <li>Q彈軟糖口感，天然果香</li>
          <li>無人工色素、防腐劑</li>
          <li>適合不愛吞膠囊的族群</li>
          <li>全家大小都能輕鬆補充營養</li>
        </ul>

        <h2>營養補充功效分析</h2>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>全面營養</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>12種維生素礦物質</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              shield
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>增強免疫</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升身體防護力</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              emoji_emotions
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>美味方便</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Q彈軟糖易吸收</p>
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
              child_care
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>兒童青少年</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>成長期營養需求高</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              medication
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>不愛吞膠囊者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>怕吞嚥困難、偏好軟糖</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              groups
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>全家人</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>日常營養補充、健康維持</p>
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
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>陰涼乾燥處，避免高溫</p>
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
          background: 'var(--white)', 
          padding: '20px', 
          borderRadius: '10px',
          borderLeft: '4px solid var(--primary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          <strong>建議用量：</strong>成人每日2粒，兒童每日1粒<br/>
          <strong>食用時間：</strong>餐後食用，有助營養吸收<br/>
          <strong>注意事項：</strong>請充分咀嚼後吞嚥，勿整顆吞下<br/>
          <strong>持續使用：</strong>建議每日規律補充，維持營養均衡
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>為什麼選擇美國綜合維生素軟糖？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>美味營養，雙重享受</h2>
          <p style={{ opacity: '0.9' }}>結合美國先進製程與天然果香，讓營養補充變成每日期待的美味時光</p>
        </div>
      </div>
    </div>
  );
}

export default VitaminGummiesProductPage; 