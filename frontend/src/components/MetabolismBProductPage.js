import React, { useState } from 'react';
import './ProductPage.css';

function MetabolismBProductPage() {
  const images = [
    "/images/美國-代謝b群plus/76d12961d9d8193df8b81920a8865b5b.jpg"
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
            alt="美國-代謝b群plus" 
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
          <h1>美國-代謝b群plus</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,180</span>
            <span className="original-price">NT$1,480</span>
          </div>
          <p className="product-description">
            來自美國的高效代謝B群配方，含8種完整B群維生素，
            有助於能量代謝、維持神經系統健康，提升新陳代謝效率。
            專為忙碌現代人設計的活力補給聖品。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國代謝b群plus</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-代謝b群plus/b9922648fd5a6a56710d78fc2df79f26.jpg" 
            alt="美國代謝b群plus產品成分與功效說明" 
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
          <li>8種完整B群維生素，配比精準</li>
          <li>高生物利用度，吸收效果佳</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過美國嚴格品質檢驗</li>
          <li>適合長期補充維持健康</li>
        </ul>

        <h2>B群代謝功效分析</h2>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>能量代謝</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進能量轉換</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>神經健康</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維持神經系統</p>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>提升代謝</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>加速新陳代謝</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>工作壓力大、需要提升專注力</p>
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
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>運動族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>增強體力、加速恢復</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              sentiment_very_dissatisfied
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>容易疲勞者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>常感疲憊、需要活力補充</p>
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
          <strong>建議用量：</strong>每日1-2粒<br/>
          <strong>食用時間：</strong>早晨空腹或餐後30分鐘<br/>
          <strong>注意事項：</strong>B群屬水溶性維生素，建議分次補充效果更佳<br/>
          <strong>持續使用：</strong>建議每日規律補充，維持穩定的營養狀態
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>為什麼選擇美國代謝b群plus？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>完整B群，活力加倍</h2>
          <p style={{ opacity: '0.9' }}>採用美國先進製程技術，確保8種B群維生素的活性與吸收效率</p>
        </div>
      </div>
    </div>
  );
}

export default MetabolismBProductPage; 