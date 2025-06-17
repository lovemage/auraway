import React, { useState } from 'react';
import './ProductPage.css';

function EnzymeJellyProductPage() {
  const images = [
    "/images/青之酵素果凍/4e541dda27431efc8d93a5adbed63ff0.jpg",
    "/images/青之酵素果凍/d99be0051786472bda22eddbb51e50cf.jpg"
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
            alt="青之酵素果凍" 
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
            酵素新品
          </div>
          <h1>青之酵素果凍</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,280</span>
            <span className="original-price">NT$1,580</span>
          </div>
          <p className="product-description">
            青之酵素果凍含有豐富的植物酵素，有助於促進消化、維持腸道健康。
            清爽的果凍口感，讓您在享受美味的同時，輕鬆補充身體所需的酵素營養。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>青之酵素果凍</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/青之酵素果凍/d99be0051786472bda22eddbb51e50cf.jpg" 
            alt="青之酵素果凍產品成分與功效說明" 
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
          <li>含有豐富植物酵素，促進消化</li>
          <li>果凍質地，口感清爽好吃</li>
          <li>添加多種蔬果精華</li>
          <li>無添加人工色素、防腐劑</li>
          <li>方便攜帶，隨時補充</li>
          <li>適合全家人食用</li>
        </ul>

        <h2>酵素功效分析</h2>
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
              restaurant
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>促進消化</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>分解食物營養</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>腸道保健</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維持腸道健康</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              speed
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>代謝提升</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進新陳代謝</p>
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>上班族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>外食族、消化不良</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              elderly
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>銀髮族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>消化機能退化</p>
          </div>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>挑食、營養補充</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>20包/盒</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>常溫陰涼乾燥處保存</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>台灣製造</p>
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
          <strong>建議用量：</strong>每日1-2包<br/>
          <strong>食用時間：</strong>飯前30分鐘或飯後1小時<br/>
          <strong>食用方式：</strong>可直接食用或加入溫開水中攪拌<br/>
          <strong>持續使用：</strong>建議連續使用1個月以上，效果更顯著
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>為什麼需要補充酵素？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>現代人的健康必需品</h2>
          <p style={{ opacity: '0.9' }}>隨著年齡增長，體內酵素逐漸減少，適時補充有助於維持身體機能</p>
        </div>
      </div>
    </div>
  );
}

export default EnzymeJellyProductPage; 