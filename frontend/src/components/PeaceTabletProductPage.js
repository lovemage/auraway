import React, { useState } from 'react';
import './ProductPage.css';

function PeaceTabletProductPage() {
  const images = [
    "/images/日本-平安錠/d09666aa64e7988592a562202875b273.jpg"
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
            alt="【新上市】日本-平安錠" 
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
            新上市
          </div>
          <h1>【新上市】日本-平安錠</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,250</span>
            <span className="original-price">NT$1,550</span>
          </div>
          <p className="product-description">
            來自日本的頂級舒緩配方，採用天然草本精華，
            有助於舒緩壓力，促進身心平衡，讓您在忙碌生活中找到內心的平靜與安寧。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>日本平安錠</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/日本-平安錠/6d4b794fe7ca188991c9107fae9b8092.jpg" 
            alt="日本平安錠產品成分與功效說明" 
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
          <li>天然草本精華配方</li>
          <li>舒緩壓力，平衡身心</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過日本嚴格品質檢驗</li>
          <li>錠劑包裝，方便服用</li>
        </ul>

        <h2>平安錠功效分析</h2>
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
              self_improvement
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>壓力舒緩</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>緩解日常壓力</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>身心平衡</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進內在平靜</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              spa
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>情緒調節</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維持情緒穩定</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>工作壓力大、需要舒緩</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              school
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>學生族群</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>學業壓力、考試焦慮</p>
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
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>銀髮族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>維持身心健康平衡</p>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            color: 'var(--text-primary)'
          }}>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>容量</h4>
              <p>60錠/瓶</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>主要成分</h4>
              <p>天然草本精華</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p>日本</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存期限</h4>
              <p>3年</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <div style={{ 
          background: 'var(--background-color)',
          borderRadius: '10px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>每日1-2次，每次1-2錠</li>
            <li>建議餐後服用，配合溫開水</li>
            <li>可依個人需求調整用量</li>
            <li>建議持續服用，效果更佳</li>
          </ul>
        </div>

        <h2>注意事項</h2>
        <div style={{ 
          background: 'var(--light-pink)',
          borderRadius: '10px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-primary)' }}>
            <li>孕婦、哺乳期婦女及兒童使用前請諮詢醫師</li>
            <li>服用其他藥物者請諮詢醫師</li>
            <li>請存放於陰涼乾燥處，避免陽光直射</li>
            <li>開封後請密封保存</li>
            <li>本產品非藥物，不可替代正常飲食</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PeaceTabletProductPage; 