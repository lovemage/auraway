import React, { useState } from 'react';
import './ProductPage.css';

function VitaminD3ProductPage() {
  const images = [
    "/images/加拿大-維生素D3液劑15ml/27e611ffb4eb6a9732ba2310268fe0d4.jpg"
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
            alt="【新上市】加拿大-維生素D3液劑15ml" 
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
          <h1>【新上市】加拿大-維生素D3液劑15ml</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,680</span>
            <span className="original-price">NT$1,980</span>
          </div>
          <p className="product-description">
            來自加拿大的高品質維生素D3液劑，採用純天然萃取技術，
            有助於維持骨骼健康，增強鈣質吸收，提升免疫系統功能。液劑型態易於吸收，適合全家人使用。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>加拿大維生素D3液劑</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/加拿大-維生素D3液劑15ml/1433cb47a75902b3e05f548f4c836a7f.jpg" 
            alt="加拿大維生素D3液劑產品成分與功效說明" 
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
          <li>加拿大原裝進口，品質保證</li>
          <li>高濃度維生素D3配方</li>
          <li>液劑型態，吸收率更佳</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過加拿大嚴格品質檢驗</li>
          <li>15ml便攜包裝，使用方便</li>
        </ul>

        <h2>維生素D3功效分析</h2>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>骨骼健康</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進鈣質吸收</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>免疫支持</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>增強免疫功能</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              wb_sunny
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>情緒調節</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維持心理健康</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>預防骨質疏鬆、維持骨密度</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              child_care
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>兒童青少年</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>促進生長發育、骨骼成長</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>缺乏日照、需要補充維生素D</p>
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
              <p>15ml</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>成分</h4>
              <p>維生素D3 (膽鈣化醇)</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>產地</h4>
              <p>加拿大</p>
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
            <li>每日1次，每次0.5ml</li>
            <li>可直接滴入口中或加入飲品中</li>
            <li>建議餐後服用，增進吸收</li>
            <li>請搖勻後使用</li>
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
            <li>服用抗凝血藥物者請諮詢醫師</li>
            <li>請存放於陰涼乾燥處，避免陽光直射</li>
            <li>開封後請冷藏保存，並於30天內使用完畢</li>
            <li>本產品非藥物，不可替代正常飲食</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VitaminD3ProductPage; 