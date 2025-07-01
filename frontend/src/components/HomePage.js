import React from 'react';
import ProductGrid from './ProductGrid';
import WomenCards from './WomenCards';

const HomePage = ({ onProductClick }) => {
  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-main-title">妳的身體，懂得所有的答案</h1>
          <p className="hero-subtitle">
            我們只是翻譯者，<br />
            將健康的密語，化作每日的守護。
          </p>
          <div className="hero-buttons">
            <button 
              className="hero-btn hero-btn-primary" 
              onClick={() => {
                const womenCardsSection = document.querySelector('.women-cards-section');
                if (womenCardsSection) {
                  womenCardsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              開始對話
            </button>
            <button 
              className="hero-btn hero-btn-secondary" 
              onClick={() => {
                const productsSection = document.querySelector('.featured-products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              探索更多
            </button>
          </div>
        </div>
      </section>

      <WomenCards />

      <main className="main-content">
        <section className="featured-products">
          <h2>精選商品</h2>
          <ProductGrid 
            onProductClick={onProductClick} 
            limit={8} 
            randomize={true}
          />
        </section>

        <section className="features-section">
          <div className="feature-item">
            <span className="material-icons">local_shipping</span>
            <h3>快速配送</h3>
            <p>24小時內出貨，全台快速配送</p>
          </div>
          <div className="feature-item">
            <span className="material-icons">security</span>
            <h3>安全認證</h3>
            <p>PIS/GMP藥廠等級製造</p>
          </div>
          <div className="feature-item">
            <span className="material-icons">support_agent</span>
            <h3>專業諮詢</h3>
            <p>營養師線上諮詢服務</p>
          </div>
          <div className="feature-item">
            <span className="material-icons">loop</span>
            <h3>退換貨政策</h3>
            <p>食品拆封有異狀可退換貨</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
