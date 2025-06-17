import React, { useState } from 'react';
import './ProductPage.css';

function ProductPage() {
  const images = [
    "/images/波森/sg-11134201-23010-iw5fi43owwlv07.webp",
    "/images/波森/sg-11134201-23010-3u6l9axpzwlv0c.webp",
    "/images/波森/sg-11134201-23010-k2ebmhxpzwlvdb.webp",
    "/images/波森/sg-11134201-23010-n98b3gxpzwlv79.webp",
    "/images/波森/sg-11134201-23010-qtswlrxpzwlva6.webp",
    "/images/波森/sg-11134201-23010-v4v3fnxpzwlv03.webp"
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
            alt="波森莓濃縮飲PLUS" 
            className="carousel-image"
          />
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
        </div>
        
        <div className="product-details">
          <div className="product-badge" style={{ backgroundColor: 'var(--secondary-color)' }}>
            熱銷商品
          </div>
          <h1>波森莓濃縮飲PLUS</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,280</span>
            <span className="original-price">NT$2,000</span>
          </div>
          <p className="product-description">
            波森莓濃縮飲PLUS富含抗氧化成分，有助於提升免疫力，保護細胞免受自由基傷害。
            每日一包，保持活力與健康。全素食用，適合全家人食用。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>波森莓濃縮飲</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/波森/0c6b6636354d47320efa51d2ec78250a.jpg" 
            alt="波森莓濃縮飲PLUS產品成分與功效說明" 
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
          <li>富含天然波森莓精華，抗氧化效果顯著</li>
          <li>全素食用，適合全家人食用</li>
          <li>可添加在麵包、吐司、其他飲品調和等一包多用途</li>
          <li>無添加新主張，天然健康</li>
          <li>台灣在地生產，品質保證</li>
          <li>方便攜帶，隨時補充營養</li>
        </ul>

        <h2>營養成分分析</h2>
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
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              eco
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>天然抗氧化</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>波森莓精華</p>
          </div>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>護心健康</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維護心血管</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              visibility
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>護眼明目</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>花青素豐富</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>18g x 20包/盒</p>
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
          borderLeft: '4px solid var(--secondary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
        }}>
          <strong>建議用量：</strong>早餐飯後一次，每次一包<br/>
          <strong>食用方式：</strong>可直接食用或加入300~500cc水溶解後飲用<br/>
          <strong>多元用途：</strong>可加入其他飲品調和、當麵包吐司塗醬或沙拉醬使用<br/>
          <strong>最佳時機：</strong>早餐後食用，開啟活力一整天
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>什麼是營養密度分數？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>每100g營養的分數比較</h2>
          <p style={{ opacity: '0.9' }}>波森莓擁有超高營養密度，是您健康生活的最佳選擇</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
