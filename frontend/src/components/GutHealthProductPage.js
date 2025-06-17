import React, { useState } from 'react';
import './ProductPage.css';

function GutHealthProductPage() {
  const images = [
    "/images/美國-固益清/96fe13d991f0703660f9a06f69974378.jpg"
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
            alt="美國-固益清" 
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
          <h1>美國-固益清</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,180</span>
            <span className="original-price">NT$1,480</span>
          </div>
          <p className="product-description">
            來自美國的頂級腸道保健配方，採用天然植物萃取精華，
            有助於維護腸道健康，改善消化問題，促進腸道蠕動。
            專為現代人腸胃不適問題而設計的保健聖品。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國固益清</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-固益清/f1f1e6cf38f4f49341e66e6fdea704b7.jpg" 
            alt="美國固益清產品成分與功效說明" 
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
          <li>天然植物萃取，溫和不刺激</li>
          <li>專利配方，快速改善腸道問題</li>
          <li>無添加人工香料、色素</li>
          <li>通過美國嚴格品質檢驗</li>
          <li>適合長期保健使用</li>
        </ul>

        <h2>腸道保健功效分析</h2>
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
              healing
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>腸道修護</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>修護腸道黏膜</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              spa
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>舒緩不適</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>減輕腸胃不適</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              psychology
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>促進蠕動</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>改善腸道蠕動</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>壓力大、飲食不規律引起腸胃問題</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              sick
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>腸胃敏感者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>容易腹瀉、便秘、腸胃不適</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              restaurant_menu
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>外食族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>經常外食、腸道保健需求</p>
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
              <p style={{ color: 'var(--text-primary)' }}>陰涼乾燥處，避免陽光直射</p>
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
          <strong>建議用量：</strong>每日2粒<br/>
          <strong>食用時間：</strong>餐前30分鐘或餐後1小時<br/>
          <strong>注意事項：</strong>請搭配充足水分，多喝水有助產品發揮效果<br/>
          <strong>持續使用：</strong>建議連續使用2-3個月，腸道健康更穩定
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>為什麼選擇美國固益清？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>專業配方，腸道健康首選</h2>
          <p style={{ opacity: '0.9' }}>採用美國先進萃取技術，天然溫和，有效改善各種腸道問題</p>
        </div>
      </div>
    </div>
  );
}

export default GutHealthProductPage; 