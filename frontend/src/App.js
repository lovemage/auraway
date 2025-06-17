import React, { useState, useEffect } from 'react';
import './App.css';
import ProductPage from './components/ProductPage';
import ProbioticProductPage from './components/ProbioticProductPage';
import LiverProductPage from './components/LiverProductPage';
import PearlDewProductPage from './components/PearlDewProductPage';
import RoyalJellyProductPage from './components/RoyalJellyProductPage';
import EnzymeJellyProductPage from './components/EnzymeJellyProductPage';
import Q10ProductPage from './components/Q10ProductPage';
import AboutPage from './components/AboutPage';
import BrandStoryPage from './components/BrandStoryPage';
import HeaderInfo from './components/HeaderInfo';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // 全局處理頁面切換時滾動到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateToProduct = () => {
    setCurrentPage('product');
    setMenuOpen(false);
  };

  const navigateToProbioticProduct = () => {
    setCurrentPage('probiotic');
    setMenuOpen(false);
  };

  const navigateToLiverProduct = () => {
    setCurrentPage('liver');
    setMenuOpen(false);
  };

  const navigateToPearlDewProduct = () => {
    setCurrentPage('pearldew');
    setMenuOpen(false);
  };

  const navigateToRoyalJellyProduct = () => {
    setCurrentPage('royaljelly');
    setMenuOpen(false);
  };

  const navigateToEnzymeJellyProduct = () => {
    setCurrentPage('enzymejelly');
    setMenuOpen(false);
  };

  const navigateToQ10Product = () => {
    setCurrentPage('q10');
    setMenuOpen(false);
  };

  const navigateToTurmericFishOilProduct = () => {
    setCurrentPage('turmericfishoil');
    setMenuOpen(false);
  };

  const navigateToJointCareProduct = () => {
    setCurrentPage('jointcare');
    setMenuOpen(false);
  };

  const navigateToLuteinProduct = () => {
    setCurrentPage('lutein');
    setMenuOpen(false);
  };

  const navigateToSleepGABAProduct = () => {
    setCurrentPage('sleepgaba');
    setMenuOpen(false);
  };

  const navigateToFatBurnerProduct = () => {
    setCurrentPage('fatburner');
    setMenuOpen(false);
  };

  const navigateToBlackMacaProduct = () => {
    setCurrentPage('blackmaca');
    setMenuOpen(false);
  };

  const navigateToCalciumPowderProduct = () => {
    setCurrentPage('calciumpowder');
    setMenuOpen(false);
  };

  const navigateToVitaminGummiesProduct = () => {
    setCurrentPage('vitamingummies');
    setMenuOpen(false);
  };

  const navigateToBitterMelonProduct = () => {
    setCurrentPage('bittermelon');
    setMenuOpen(false);
  };

  const navigateToGutHealthProduct = () => {
    setCurrentPage('guthealth');
    setMenuOpen(false);
  };

  const navigateToMetabolismBProduct = () => {
    setCurrentPage('metabolismb');
    setMenuOpen(false);
  };

  const navigateToBeautyDrinkProduct = () => {
    setCurrentPage('beautydrink');
    setMenuOpen(false);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setMenuOpen(false);
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
    setMenuOpen(false);
  };

  const navigateToBrandStory = () => {
    setCurrentPage('brandstory');
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
            <li onClick={navigateToHome}>首頁</li>
            <li>全部商品</li>
            <li>免疫力提升</li>
            <li>美肌養顏</li>
            <li>活力能量</li>
            <li>全方位保健</li>
            <li onClick={navigateToAbout}>關於我們</li>
            <li>會員專區</li>
            <li>聯絡我們</li>
          </ul>
        </nav>
      </header>

      {currentPage === 'home' ? (
        <>
          <section className="hero-section">
            <div className="hero-slider">
              <div className="hero-slide" style={{ backgroundImage: `url('/images/white-rainforest-qCDK3DN7lOs-unsplash.jpg')` }}>
                <div className="hero-content">
                  <h2>守護健康 從今開始</h2>
                  <p>專業營養師團隊嚴選，給您最優質的保健食品</p>
                  <button className="cta-button" onClick={navigateToProduct}>立即選購</button>
                </div>
              </div>
            </div>
          </section>

          <main className="main-content">
            <section className="categories-section">
              <h2>熱門分類</h2>
              <div className="category-grid">
                <div className="category-card" onClick={navigateToProduct}>
                  <div className="category-icon">
                    <span className="material-icons">health_and_safety</span>
                  </div>
                  <h3>免疫力提升</h3>
                  <p>強化身體防禦系統</p>
                </div>
                <div className="category-card" onClick={navigateToProduct}>
                  <div className="category-icon">
                    <span className="material-icons">spa</span>
                  </div>
                  <h3>美肌養顏</h3>
                  <p>由內而外調理</p>
                </div>
                <div className="category-card" onClick={navigateToProduct}>
                  <div className="category-icon">
                    <span className="material-icons">fitness_center</span>
                  </div>
                  <h3>活力能量</h3>
                  <p>維持最佳體能狀態</p>
                </div>
                <div className="category-card" onClick={navigateToProduct}>
                  <div className="category-icon">
                    <span className="material-icons">local_florist</span>
                  </div>
                  <h3>全方位保健</h3>
                  <p>均衡營養補給</p>
                </div>
              </div>
            </section>

            <section className="featured-products">
              <h2>精選商品</h2>
              <div className="products-grid">
                <div className="product-card" onClick={navigateToProduct}>
                  <div className="product-badge">熱銷</div>
                  <img src="/images/波森/sg-11134201-23010-iw5fi43owwlv07.webp" alt="波森莓濃縮飲PLUS" />
                  <h3>波森莓濃縮飲PLUS</h3>
                  <p className="product-description">富含抗氧化成分，提升免疫力</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,280</span>
                    <span className="original-price">NT$ 2,000</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToProbioticProduct}>
                  <div className="product-badge">新上市</div>
                  <img src="/images/原生/main.avif" alt="日本-原生菌" />
                  <h3>【新上市】日本-原生菌</h3>
                  <p className="product-description">22種乳酸菌，腸道健康守護</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,580</span>
                    <span className="original-price">NT$ 1,880</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToLiverProduct}>
                  <div className="product-badge">熱銷</div>
                  <img src="/images/肝精/肝經main.jpg" alt="專業肝精保健食品" />
                  <h3>專業肝精保健食品</h3>
                  <p className="product-description">肝臟保健，促進新陳代謝</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,680</span>
                    <span className="original-price">NT$ 2,200</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToPearlDewProduct}>
                  <div className="product-badge">美麗秘密</div>
                  <img src="/images/珍珠露/4bf10c3038a770b3d4af941f36e77dde (1).jpg" alt="珍珠露美麗膠原蛋白" />
                  <h3>珍珠露 - 美麗膠原蛋白</h3>
                  <p className="product-description">日本製造，由內而外散發自然光采</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,290</span>
                    <span className="original-price">NT$ 1,590</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToRoyalJellyProduct}>
                  <div className="product-badge">日本進口</div>
                  <img src="/images/日本蜂王乳/e9cc017fd6ade38af291acf2d319f1dc.jpg" alt="日本蜂王乳" />
                  <h3>日本蜂王乳</h3>
                  <p className="product-description">天然美容聖品，由內而外散發光彩</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,480</span>
                    <span className="original-price">NT$ 1,780</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToEnzymeJellyProduct}>
                  <div className="product-badge">酵素新品</div>
                  <img src="/images/青之酵素果凍/4e541dda27431efc8d93a5adbed63ff0.jpg" alt="青之酵素果凍" />
                  <h3>青之酵素果凍</h3>
                  <p className="product-description">清爽果凍口感，輕鬆補充酵素營養</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,280</span>
                    <span className="original-price">NT$ 1,580</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToQ10Product}>
                  <div className="product-badge">心血管保健</div>
                  <img src="/images/日本q10/5bc33a45db7e74693e442838dff85d6b.jpg" alt="日本Q10" />
                  <h3>日本Q10</h3>
                  <p className="product-description">細胞能量代謝，維持心血管健康</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,290</span>
                    <span className="original-price">NT$ 1,590</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToTurmericFishOilProduct}>
                  <div className="product-badge">加拿大進口</div>
                  <img src="/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg" alt="加拿大薑黃魚油" />
                  <h3>加拿大薑黃魚油</h3>
                  <p className="product-description">深海魚油×薑黃素雙重配方</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,290</span>
                    <span className="original-price">NT$ 1,590</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToJointCareProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg" alt="美國關舒活" />
                  <h3>美國關舒活</h3>
                  <p className="product-description">葡萄糖胺三重關節保健配方</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,290</span>
                    <span className="original-price">NT$ 1,590</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToLuteinProduct}>
                  <div className="product-badge">日本進口</div>
                  <img src="/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg" alt="日本葉黃素" />
                  <h3>日本葉黃素</h3>
                  <p className="product-description">金盞花萃取護眼專業配方</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,150</span>
                    <span className="original-price">NT$ 1,450</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToSleepGABAProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-夜舒眠GABA/6c1ea9955b8cc16a1e72a661f1e2f5f2.jpg" alt="美國夜舒眠GABA" />
                  <h3>美國夜舒眠GABA</h3>
                  <p className="product-description">專業助眠配方，深度睡眠支持</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,190</span>
                    <span className="original-price">NT$ 1,490</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToFatBurnerProduct}>
                  <div className="product-badge">燃脂專家</div>
                  <img src="/images/美國-燃纖脂/c3c6e7d6079320a3f5577e12295fbc58.jpg" alt="美國燃纖脂" />
                  <h3>美國燃纖脂</h3>
                  <p className="product-description">專業燃脂配方，健康體態管理</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 3,100</span>
                    <span className="original-price">NT$ 3,400</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToBlackMacaProduct}>
                  <div className="product-badge">男性活力</div>
                  <img src="/images/美國-黑馬卡精氨酸/91ce0a777ac90611c870c9caedd179f7.jpg" alt="美國黑馬卡精氨酸" />
                  <h3>美國黑馬卡精氨酸</h3>
                  <p className="product-description">男性活力配方，提升體能表現</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,250</span>
                    <span className="original-price">NT$ 1,550</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToCalciumPowderProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-檸檬酸鈣粉/1f51a977a5e989940a06ae39c8e01c52.jpg" alt="美國檸檬酸鈣粉" />
                  <h3>美國檸檬酸鈣粉</h3>
                  <p className="product-description">高濃度鈣質，易於人體吸收</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,280</span>
                    <span className="original-price">NT$ 1,580</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToVitaminGummiesProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-綜合維生素軟糖/2a06e4486bb2944dbbaf1319cc5f3505.jpg" alt="美國綜合維生素軟糖" />
                  <h3>美國綜合維生素軟糖</h3>
                  <p className="product-description">Q彈美味軟糖，綜合維生素營養</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,050</span>
                    <span className="original-price">NT$ 1,350</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToBitterMelonProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-苦瓜胜肽/2749cfb0ba4558cbe2b17157d7dd9f48.jpg" alt="美國苦瓜胜肽" />
                  <h3>美國苦瓜胜肽</h3>
                  <p className="product-description">高純度苦瓜胜肽，調節代謝</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,250</span>
                    <span className="original-price">NT$ 1,550</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToGutHealthProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-固益清/96fe13d991f0703660f9a06f69974378.jpg" alt="美國固益清" />
                  <h3>美國固益清</h3>
                  <p className="product-description">腸道保健專業配方，溫和有效</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,180</span>
                    <span className="original-price">NT$ 1,480</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToMetabolismBProduct}>
                  <div className="product-badge">美國進口</div>
                  <img src="/images/美國-代謝b群plus/76d12961d9d8193df8b81920a8865b5b.jpg" alt="美國代謝b群plus" />
                  <h3>美國代謝b群plus</h3>
                  <p className="product-description">8種B群維生素，提升能量代謝</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 1,180</span>
                    <span className="original-price">NT$ 1,480</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
                <div className="product-card" onClick={navigateToBeautyDrinkProduct}>
                  <div className="product-badge">美肌養顏</div>
                  <img src="/images/美妍飲/875589f1c2a794f35f547c2e08580c0f.jpg" alt="美妍飲" />
                  <h3>美妍飲</h3>
                  <p className="product-description">膠原蛋白美肌飲，由內而外散發光彩</p>
                  <div className="price-info">
                    <span className="discount-price">NT$ 850</span>
                    <span className="original-price">NT$ 1,150</span>
                  </div>
                  <button className="add-to-cart-btn">加入購物車</button>
                </div>
              </div>
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
        <ProductPage />
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
      ) : currentPage === 'about' ? (
        <AboutPage />
      ) : currentPage === 'brandstory' ? (
        <BrandStoryPage />
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
