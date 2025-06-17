import React, { useState } from 'react';
import './ProductPage.css';

function CalciumPowderProductPage() {
  const images = [
    "/images/美國-檸檬酸鈣粉/1f51a977a5e989940a06ae39c8e01c52.jpg"
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
            alt="美國-檸檬酸鈣粉" 
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
          <div className="product-badge" style={{ backgroundColor: 'var(--secondary-color)' }}>
            美國進口
          </div>
          <h1>美國-檸檬酸鈣粉</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,280</span>
            <span className="original-price">NT$1,580</span>
          </div>
          <p className="product-description">
            來自美國的優質檸檬酸鈣粉，含有高濃度鈣質，採用檸檬酸鈣形式，
            易於人體吸收，有助於維持骨骼與牙齒的正常發育及健康。每日補充，讓您擁有強健骨骼。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>美國檸檬酸鈣粉</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/美國-檸檬酸鈣粉/669575e3fea133831950458d086745d1.jpg" 
            alt="美國檸檬酸鈣粉產品成分與功效說明" 
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
          <li>美國原裝進口，品質保證</li>
          <li>檸檬酸鈣形式，易於人體吸收</li>
          <li>高濃度鈣質，有效補充每日所需</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過美國FDA嚴格品質檢驗</li>
          <li>適合全家人日常保健</li>
        </ul>

        <h2>檸檬酸鈣功效分析</h2>
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
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>強化骨骼密度</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              face
            </span>
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>牙齒健康</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>維護牙齒結構</p>
          </div>
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            background: 'var(--white)',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)'
          }}>
            <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              fitness_center
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>肌肉功能</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>正常肌肉收縮</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>預防骨質疏鬆、維持骨骼健康</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              pregnant_woman
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>孕婦哺乳期</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>補充鈣質、支持母嬰健康</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              child_friendly
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>成長期</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>支持骨骼發育、牙齒健康</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>500g/罐</p>
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
              <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>美國製造</p>
            </div>
          </div>
        </div>

        <h2>食用方法</h2>
        <p style={{ 
          background: 'var(--white)', 
          padding: '20px', 
          borderRadius: '10px',
          borderLeft: '4px solid var(--secondary-color)',
          boxShadow: '0 2px 8px rgba(130, 191, 183, 0.1)',
          lineHeight: '1.6'
        }}>
          每次1-2茶匙（約5-10g），可直接食用或加入溫水、牛奶中攪拌均勻後飲用。
          建議餐後30分鐘內服用，有助於提高吸收率。兒童及孕婦請依醫師建議用量。
        </p>

        <h2>注意事項</h2>
        <div style={{ 
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '10px',
          padding: '20px',
          margin: '20px 0'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#856404' }}>
            <li>請置於陰涼乾燥處，避免陽光直射</li>
            <li>開封後請盡快食用完畢</li>
            <li>如有服用其他藥物，請諮詢醫師建議</li>
            <li>過量攝取可能導致腸胃不適</li>
            <li>請勿超過每日建議攝取量</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CalciumPowderProductPage; 