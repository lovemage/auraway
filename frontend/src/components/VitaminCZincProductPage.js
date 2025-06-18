import React, { useState } from 'react';
import './ProductPage.css';

function VitaminCZincProductPage() {
  const images = [
    "/images/維生素C+酵母鋅/f94c0999d662bdd0260afb59a401534a.jpg"
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
            alt="【新上市】維生素C+酵母鋅" 
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
          <h1>【新上市】維生素C+酵母鋅</h1>
          <div className="price-section">
            <span className="discount-price">NT$1,150</span>
            <span className="original-price">NT$1,450</span>
          </div>
          <p className="product-description">
            高品質維生素C結合酵母鋅的完美組合，採用天然酵母發酵技術，
            有助於增強免疫系統，促進膠原蛋白合成，維持皮膚健康。雙重營養素協同作用，效果更佳。
          </p>
          <button className="add-to-cart">
            <span className="material-icons">shopping_cart</span>
            加入購物車
          </button>
        </div>
      </div>

      <div className="additional-info">
        <h2>維生素C+酵母鋅</h2>
        
        {/* 產品詳細描述圖片 */}
        <div style={{ 
          textAlign: 'center', 
          margin: '30px 0',
          background: 'linear-gradient(135deg, var(--light-teal), var(--light-pink))',
          borderRadius: '15px',
          padding: '20px'
        }}>
          <img 
            src="/images/維生素C+酵母鋅/k6YXDMW.jpg" 
            alt="維生素C+酵母鋅產品成分與功效說明" 
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
          <li>高濃度維生素C配方</li>
          <li>天然酵母鋅，吸收率更佳</li>
          <li>雙重營養素協同作用</li>
          <li>無添加人工色素、防腐劑</li>
          <li>通過嚴格品質檢驗</li>
          <li>膠囊包裝，方便攜帶</li>
        </ul>

        <h2>維生素C+鋅功效分析</h2>
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
              shield
            </span>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>免疫增強</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>提升免疫防護力</p>
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
            <h3 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>美肌護膚</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>促進膠原蛋白合成</p>
          </div>
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
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>傷口癒合</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>加速組織修復</p>
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
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>工作壓力大、免疫力下降</p>
          </div>
          <div style={{ 
            background: 'var(--light-pink)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--secondary-color)', marginBottom: '10px' }}>
              face
            </span>
            <h4 style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>愛美女性</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>維持肌膚彈性、延緩老化</p>
          </div>
          <div style={{ 
            background: 'var(--light-teal)', 
            padding: '20px', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '40px', color: 'var(--primary-color)', marginBottom: '10px' }}>
              sports
            </span>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>運動愛好者</h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9em' }}>加速運動後恢復</p>
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
              <p>60粒/瓶</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>主要成分</h4>
              <p>維生素C、酵母鋅</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>劑型</h4>
              <p>膠囊</p>
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
            <li>每日1-2次，每次1粒</li>
            <li>建議餐後服用，配合溫開水</li>
            <li>可依個人需求調整用量</li>
            <li>建議持續服用3個月以上</li>
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
            <li>開封後請密封保存</li>
            <li>本產品非藥物，不可替代正常飲食</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VitaminCZincProductPage; 