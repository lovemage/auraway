import React, { useState } from 'react';
import './ProductPage.css';

function EnzymeSlimJellyProductPage() {
  const images = [
    "/images/酵孅凍/5a92ca803369be5533eafa2a7ab04c15.jpg"
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
            alt="【新上市】酵孅凍" 
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
          <h1>【新上市】酵孅凍</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,380</span>
            <span className="original-price">NT$1,680</span>
          </div>
          <p className="product-description">
            創新酵素果凍配方，結合多種天然酵素與纖維，
            有助於促進消化代謝，維持體態輕盈，美味又健康的纖體選擇。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>酵孅凍</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/酵孅凍/N6e3U0e.jpg" 
            alt="酵孅凍產品成分與功效說明" 
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
          <li>創新果凍型態，美味好入口</li>
          <li>多種天然酵素配方</li>
          <li>添加膳食纖維</li>
          <li>促進消化代謝</li>
          <li>無添加人工色素、防腐劑</li>
          <li>方便攜帶，隨時享用</li>
        </ul>

        <h2>酵孅凍功效分析</h2>
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
              biotech
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>酵素活性</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>多種天然酵素</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              local_dining
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>消化促進</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>幫助消化吸收</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              grass
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>纖維補充</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>豐富膳食纖維</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>維持窈窕身材</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              restaurant
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>外食族</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>缺乏蔬果纖維</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              sentiment_satisfied
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>追求美味者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>享受健康美味</p>
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
              <p>15包/盒</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>主要成分</h4>
              <p>天然酵素、膳食纖維</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>口味</h4>
              <p>天然果香</p>
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
            <li>每日1-2包，可直接食用</li>
            <li>建議餐前30分鐘食用</li>
            <li>可搭配溫開水飲用</li>
            <li>冷藏後食用口感更佳</li>
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
            <li>開封後請儘速食用完畢</li>
            <li>本產品非藥物，不可替代正常飲食</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EnzymeSlimJellyProductPage; 