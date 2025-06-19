import React, { useState, useEffect } from 'react';
import './App.css';
import ProductGrid from './components/ProductGrid';
import DynamicProductPage from './components/DynamicProductPage';
import AboutPage from './components/AboutPage';
import BrandStoryPage from './components/BrandStoryPage';
import HeaderInfo from './components/HeaderInfo';
import AuraPostPage from './components/AuraPostPage';
import EventPage from './components/EventPage';
import BabyMemberPage from './components/BabyMemberPage';
import WomenCards from './components/WomenCards';

// 產品頁面組件
import ProbioticProductPage from './components/ProbioticProductPage';
import LiverProductPage from './components/LiverProductPage';
import PearlDewProductPage from './components/PearlDewProductPage';
import RoyalJellyProductPage from './components/RoyalJellyProductPage';
import EnzymeJellyProductPage from './components/EnzymeJellyProductPage';
import Q10ProductPage from './components/Q10ProductPage';
import TurmericFishOilProductPage from './components/TurmericFishOilProductPage';
import JointCareProductPage from './components/JointCareProductPage';
import LuteinProductPage from './components/LuteinProductPage';
import SleepGABAProductPage from './components/SleepGABAProductPage';
import FatBurnerProductPage from './components/FatBurnerProductPage';
import BlackMacaProductPage from './components/BlackMacaProductPage';
import CalciumPowderProductPage from './components/CalciumPowderProductPage';
import VitaminGummiesProductPage from './components/VitaminGummiesProductPage';
import BitterMelonProductPage from './components/BitterMelonProductPage';
import GutHealthProductPage from './components/GutHealthProductPage';
import MetabolismBProductPage from './components/MetabolismBProductPage';
import BeautyDrinkProductPage from './components/BeautyDrinkProductPage';
import VitaminD3ProductPage from './components/VitaminD3ProductPage';
import VitaminCZincProductPage from './components/VitaminCZincProductPage';
import CollagenPeptideProductPage from './components/CollagenPeptideProductPage';
import SlimCupProductPage from './components/SlimCupProductPage';
import PeaceTabletProductPage from './components/PeaceTabletProductPage';
import NattokinaseProductPage from './components/NattokinaseProductPage';
import EnzymeSlimJellyProductPage from './components/EnzymeSlimJellyProductPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 全局處理頁面切換時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateToProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    setMenuOpen(false);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setMenuOpen(false);
  };



  const navigateToBrandStory = () => {
    setCurrentPage('brandstory');
    setMenuOpen(false);
  };

  const navigateToAuraPost = () => {
    setCurrentPage('aurapost');
    setMenuOpen(false);
  };

  const navigateToEvent = () => {
    setCurrentPage('event');
    setMenuOpen(false);
  };

  const navigateToBabyMember = () => {
    setCurrentPage('babymember');
    setMenuOpen(false);
  };



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <HeaderInfo />
        <div className="header-main">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="logo-section" onClick={navigateToHome} style={{ cursor: 'pointer' }}>
            <h1>Auraway Shop</h1>
            <p className="tagline">您的健康守護專家</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <span className="material-icons">search</span>
              <input type="text" placeholder="搜尋產品..." />
            </div>
            <div className="user-actions">
              <span className="material-icons">person</span>
              <span className="material-icons">favorite</span>
              <div className="cart-icon">
                <span className="material-icons">shopping_cart</span>
                <span className="cart-count">0</span>
              </div>
            </div>
          </div>
        </div>
        <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
          <ul className="nav-menu">
            <li onClick={navigateToHome}>Home 首頁</li>
            <li onClick={navigateToAuraPost}>Aura Post 專欄</li>
            <li onClick={navigateToEvent}>Event 活動公告</li>
            <li onClick={navigateToBabyMember}>寶寶會員專區</li>
          </ul>
        </nav>
      </header>

      {currentPage === 'home' ? (
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
              <ProductGrid onProductClick={navigateToProduct} />
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
                <p>國際認證，品質有保障</p>
              </div>
              <div className="feature-item">
                <span className="material-icons">support_agent</span>
                <h3>專業諮詢</h3>
                <p>營養師線上諮詢服務</p>
              </div>
              <div className="feature-item">
                <span className="material-icons">loop</span>
                <h3>七天鑑賞</h3>
                <p>不滿意七天內可退換貨</p>
              </div>
            </section>


          </main>
        </>
      ) : currentPage === 'product' ? (
        <DynamicProductPage product={selectedProduct} onNavigateHome={navigateToHome} />
      ) : currentPage === 'probiotic' ? (
        <ProbioticProductPage />
      ) : currentPage === 'liver' ? (
        <LiverProductPage />
      ) : currentPage === 'pearldew' ? (
        <PearlDewProductPage />
      ) : currentPage === 'royaljelly' ? (
        <RoyalJellyProductPage />
      ) : currentPage === 'enzymejelly' ? (
        <EnzymeJellyProductPage />
      ) : currentPage === 'q10' ? (
        <Q10ProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'turmericfishoil' ? (
        <TurmericFishOilProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'jointcare' ? (
        <JointCareProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'lutein' ? (
        <LuteinProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'sleepgaba' ? (
        <SleepGABAProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'fatburner' ? (
        <FatBurnerProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'blackmaca' ? (
        <BlackMacaProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'calciumpowder' ? (
        <CalciumPowderProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'vitamingummies' ? (
        <VitaminGummiesProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'bittermelon' ? (
        <BitterMelonProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'guthealth' ? (
        <GutHealthProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'metabolismb' ? (
        <MetabolismBProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'beautydrink' ? (
        <BeautyDrinkProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'vitamind3' ? (
        <VitaminD3ProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'vitaminczinc' ? (
        <VitaminCZincProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'collagenpeptide' ? (
        <CollagenPeptideProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'slimcup' ? (
        <SlimCupProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'peacetablet' ? (
        <PeaceTabletProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'nattokinase' ? (
        <NattokinaseProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'enzymeslimjelly' ? (
        <EnzymeSlimJellyProductPage onNavigateHome={navigateToHome} />
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : currentPage === 'brandstory' ? (
        <BrandStoryPage />
      ) : currentPage === 'aurapost' ? (
        <AuraPostPage />
      ) : currentPage === 'event' ? (
        <EventPage />
      ) : currentPage === 'babymember' ? (
        <BabyMemberPage />
      ) : null}

      <footer className="App-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>關於我們</h3>
            <ul>
              <li onClick={navigateToBrandStory} style={{ cursor: 'pointer' }}>品牌故事</li>
              <li>經營理念</li>
              <li>團隊介紹</li>
              <li>媒體報導</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>顧客服務</h3>
            <ul>
              <li>購物說明</li>
              <li>付款方式</li>
              <li>配送資訊</li>
              <li>退換貨政策</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>會員專區</h3>
            <ul>
              <li>會員權益</li>
              <li>點數說明</li>
              <li>訂單查詢</li>
              <li>會員登入</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>聯絡資訊</h3>
            <ul>
              <li><span className="material-icons">phone</span> 0800-123-456</li>
              <li><span className="material-icons">email</span> service@aurawayshop.com</li>
              <li><span className="material-icons">schedule</span> 週一至週五 9:00-18:00</li>
              <li><span className="material-icons">location_on</span> 台北市信義區信義路五段7號</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p><strong>Auraway Shop - 因為健康，值得最好的呵護</strong></p>
          <p>&copy; 2025 Auraway Shop. 版權所有。</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
