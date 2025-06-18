import React, { useState } from 'react';
import './ProductPage.css';

function SlimCupProductPage() {
  const images = [
    "/images/日本-孅淨一杯/9eca82704a21ed1288db87d8827e09e4.jpg"
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
            alt="【新上市】日本-孅淨一杯" 
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
          <h1>【新上市】日本-孅淨一杯</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,350</span>
            <span className="original-price">NT$1,650</span>
          </div>
          <p className="product-description">
            來自日本的專業纖體配方，採用天然植物萃取技術，
            有助於促進新陳代謝，維持體態輕盈，讓您輕鬆享受健康美麗的生活。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>日本孅淨一杯</h2>

        <h2>商品特色</h2>
        <ul>
          <li>日本原裝進口，品質保證</li>
          <li>天然植物萃取配方</li>
          <li>促進新陳代謝</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過日本嚴格品質檢驗</li>
          <li>方便攜帶，隨時補充</li>
        </ul>

        <h2>纖體功效分析</h2>
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
              speed
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>代謝促進</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升新陳代謝率</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>體態維持</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>保持理想體態</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              eco
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>天然健康</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>純天然植物配方</p>
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
              face
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>愛美女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>維持窈窕身材、展現自信</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>久坐缺乏運動、代謝緩慢</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              restaurant
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>飲食控制者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>輔助健康飲食管理</p>
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
              <p>30包/盒</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>主要成分</h4>
              <p>天然植物萃取物</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p>日本</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存期限</h4>
              <p>2年</p>
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
            <li>每日1-2次，每次1包</li>
            <li>可加入溫開水或溫牛奶中飲用</li>
            <li>建議餐前30分鐘服用</li>
            <li>配合適量運動效果更佳</li>
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
            <li>有特殊疾病者請諮詢醫師後使用</li>
            <li>請存放於陰涼乾燥處，避免陽光直射</li>
            <li>開封後請密封保存</li>
            <li>本產品非藥物，不可替代正常飲食</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SlimCupProductPage; 