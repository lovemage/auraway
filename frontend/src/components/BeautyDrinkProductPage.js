import React, { useState } from 'react';
import './ProductPage.css';

function BeautyDrinkProductPage() {
  const images = [
    "/images/美妍飲/875589f1c2a794f35f547c2e08580c0f.jpg"
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
            alt="美妍飲" 
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
            美肌養顏
          </div>
          <h1>美妍飲</h1>
          <div className="price-section">
            <span className="discount-price">NT$850</span>
            <span className="original-price">NT$1,150</span>
          </div>
          <p className="product-description">
            專為現代女性設計的美肌養顏飲品，含有豐富的膠原蛋白、維生素C及多種美肌成分，
            由內而外散發自然光彩，讓您每一天都美麗動人。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美妍飲</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美妍飲/aWm8Dg5.jpg" 
            alt="美妍飲產品成分與功效說明" 
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
          <li>天然膠原蛋白，深層滋養肌膚</li>
          <li>高濃度維生素C，抗氧化美白</li>
          <li>添加透明質酸，鎖水保濕</li>
          <li>無添加人工色素、防腐劑</li>
          <li>口感清香，易於吸收</li>
          <li>適合每日飲用的美容聖品</li>
        </ul>

        <h2>美肌養顏功效分析</h2>
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
              face
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>肌膚彈性</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>膠原蛋白補充</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              wb_sunny
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>美白亮澤</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維生素C抗氧化</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              water_drop
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保濕鎖水</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>透明質酸補水</p>
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
              woman
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>愛美女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>追求自然美肌、抗老保養</p>
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
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>職場女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>工作壓力大、肌膚疲勞</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              schedule
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>熟齡女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>膠原蛋白流失、需要補充</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>500ml/瓶</p>
            </div>
            <div style={{ 
              background: 'var(--white)', 
              padding: '15px', 
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
            }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>保存方式</h4>
              <p style={{ color: 'var(--text-primary)' }}>冷藏保存，開封後請儘速飲用</p>
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
          <strong>建議用量：</strong>每日1瓶<br/>
          <strong>飲用時間：</strong>空腹或睡前1小時飲用效果最佳<br/>
          <strong>注意事項：</strong>開封後請冷藏保存，3天內飲用完畢<br/>
          <strong>持續使用：</strong>建議連續使用4-6週，美肌效果更顯著
        </p>

        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 style={{ marginBottom: '10px' }}>為什麼選擇美妍飲？</h3>
          <h2 style={{ marginBottom: '15px', fontSize: '1.5em' }}>天然美肌，由內而外</h2>
          <p style={{ opacity: '0.9' }}>採用天然萃取工藝，每一滴都蘊含滿滿的美肌能量，讓您喝出健康美麗</p>
        </div>
      </div>
    </div>
  );
}

export default BeautyDrinkProductPage; 