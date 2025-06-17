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
import AuraPostPage from './components/AuraPostPage';
import EventPage from './components/EventPage';
import BabyMemberPage from './components/BabyMemberPage';
import WomenCards from './components/WomenCards';

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
              <div className="products-grid">
                <div className="product-card">
                  <div className="badge">熱銷</div>
                  <div className="product-tumb" onClick={navigateToProduct}>
                    <img src="/images/波森/sg-11134201-23010-iw5fi43owwlv07.webp" alt="波森莓濃縮飲PLUS" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">健康保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToProduct(); }}>波森莓濃縮飲PLUS</a></h4>
                    <p>富含抗氧化成分，提升免疫力</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 2,000</small>NT$ 1,280</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">新上市</div>
                  <div className="product-tumb" onClick={navigateToProbioticProduct}>
                    <img src="/images/原生/main.avif" alt="日本-原生菌" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">腸道保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToProbioticProduct(); }}>日本-原生菌</a></h4>
                    <p>22種乳酸菌，腸道健康守護</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,880</small>NT$ 1,580</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">熱銷</div>
                  <div className="product-tumb" onClick={navigateToLiverProduct}>
                    <img src="/images/肝精/肝經main.jpg" alt="專業肝精保健食品" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">肝臟保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToLiverProduct(); }}>專業肝精保健食品</a></h4>
                    <p>肝臟保健，促進新陳代謝</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 2,200</small>NT$ 1,680</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美麗秘密</div>
                  <div className="product-tumb" onClick={navigateToPearlDewProduct}>
                    <img src="/images/珍珠露/4bf10c3038a770b3d4af941f36e77dde (1).jpg" alt="珍珠露美麗膠原蛋白" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">美容保養</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToPearlDewProduct(); }}>珍珠露美麗膠原蛋白</a></h4>
                    <p>日本製造，由內而外散發自然光采</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,590</small>NT$ 1,290</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">日本進口</div>
                  <div className="product-tumb" onClick={navigateToRoyalJellyProduct}>
                    <img src="/images/日本蜂王乳/e9cc017fd6ade38af291acf2d319f1dc.jpg" alt="日本蜂王乳" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">美容保養</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToRoyalJellyProduct(); }}>日本蜂王乳</a></h4>
                    <p>天然美容聖品，由內而外散發光彩</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,780</small>NT$ 1,480</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">酵素新品</div>
                  <div className="product-tumb" onClick={navigateToEnzymeJellyProduct}>
                    <img src="/images/青之酵素果凍/4e541dda27431efc8d93a5adbed63ff0.jpg" alt="青之酵素果凍" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">消化保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToEnzymeJellyProduct(); }}>青之酵素果凍</a></h4>
                    <p>清爽果凍口感，輕鬆補充酵素營養</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,580</small>NT$ 1,280</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">心血管保健</div>
                  <div className="product-tumb" onClick={navigateToQ10Product}>
                    <img src="/images/日本q10/5bc33a45db7e74693e442838dff85d6b.jpg" alt="日本Q10" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">心血管保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToQ10Product(); }}>日本Q10</a></h4>
                    <p>細胞能量代謝，維持心血管健康</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,590</small>NT$ 1,290</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">加拿大進口</div>
                  <div className="product-tumb" onClick={navigateToTurmericFishOilProduct}>
                    <img src="/images/加拿大-薑黃魚油/f9a4ddbad103efea855a2af355dc97c2.jpg" alt="加拿大薑黃魚油" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">健康保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToTurmericFishOilProduct(); }}>加拿大薑黃魚油</a></h4>
                    <p>深海魚油×薑黃素雙重配方</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,590</small>NT$ 1,290</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToJointCareProduct}>
                    <img src="/images/美國-關舒活/4ed8b1b1f856a37ca2951f5154b8f6aa.jpg" alt="美國關舒活" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">關節保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToJointCareProduct(); }}>美國關舒活</a></h4>
                    <p>葡萄糖胺三重關節保健配方</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,590</small>NT$ 1,290</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">日本進口</div>
                  <div className="product-tumb" onClick={navigateToLuteinProduct}>
                    <img src="/images/日本-葉黃素/c6077bb6abb93db08f907e4d95ac0ae2.jpg" alt="日本葉黃素" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">眼部保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToLuteinProduct(); }}>日本葉黃素</a></h4>
                    <p>金盞花萃取護眼專業配方</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,450</small>NT$ 1,150</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToSleepGABAProduct}>
                    <img src="/images/美國-夜舒眠GABA/6c1ea9955b8cc16a1e72a661f1e2f5f2.jpg" alt="美國夜舒眠GABA" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">睡眠保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToSleepGABAProduct(); }}>美國夜舒眠GABA</a></h4>
                    <p>專業助眠配方，深度睡眠支持</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,490</small>NT$ 1,190</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">燃脂專家</div>
                  <div className="product-tumb" onClick={navigateToFatBurnerProduct}>
                    <img src="/images/美國-燃纖脂/c3c6e7d6079320a3f5577e12295fbc58.jpg" alt="美國燃纖脂" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">體重管理</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToFatBurnerProduct(); }}>美國燃纖脂</a></h4>
                    <p>專業燃脂配方，健康體態管理</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 3,400</small>NT$ 3,100</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">男性活力</div>
                  <div className="product-tumb" onClick={navigateToBlackMacaProduct}>
                    <img src="/images/美國-黑馬卡精氨酸/91ce0a777ac90611c870c9caedd179f7.jpg" alt="美國黑馬卡精氨酸" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">男性保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToBlackMacaProduct(); }}>美國黑馬卡精氨酸</a></h4>
                    <p>男性活力配方，提升體能表現</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,550</small>NT$ 1,250</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToCalciumPowderProduct}>
                    <img src="/images/美國-檸檬酸鈣粉/1f51a977a5e989940a06ae39c8e01c52.jpg" alt="美國檸檬酸鈣粉" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">骨骼保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToCalciumPowderProduct(); }}>美國檸檬酸鈣粉</a></h4>
                    <p>高濃度鈣質，易於人體吸收</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,580</small>NT$ 1,280</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToVitaminGummiesProduct}>
                    <img src="/images/美國-綜合維生素軟糖/2a06e4486bb2944dbbaf1319cc5f3505.jpg" alt="美國綜合維生素軟糖" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">營養補充</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToVitaminGummiesProduct(); }}>美國綜合維生素軟糖</a></h4>
                    <p>Q彈美味軟糖，綜合維生素營養</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,350</small>NT$ 1,050</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToBitterMelonProduct}>
                    <img src="/images/美國-苦瓜胜肽/2749cfb0ba4558cbe2b17157d7dd9f48.jpg" alt="美國苦瓜胜肽" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">代謝調節</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToBitterMelonProduct(); }}>美國苦瓜胜肽</a></h4>
                    <p>高純度苦瓜胜肽，調節代謝</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,550</small>NT$ 1,250</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToGutHealthProduct}>
                    <img src="/images/美國-固益清/96fe13d991f0703660f9a06f69974378.jpg" alt="美國固益清" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">腸道保健</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToGutHealthProduct(); }}>美國固益清</a></h4>
                    <p>腸道保健專業配方，溫和有效</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,480</small>NT$ 1,180</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美國進口</div>
                  <div className="product-tumb" onClick={navigateToMetabolismBProduct}>
                    <img src="/images/美國-代謝b群plus/76d12961d9d8193df8b81920a8865b5b.jpg" alt="美國代謝b群plus" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">營養補充</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToMetabolismBProduct(); }}>美國代謝b群plus</a></h4>
                    <p>8種B群維生素，提升能量代謝</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,480</small>NT$ 1,180</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-card">
                  <div className="badge">美肌養顏</div>
                  <div className="product-tumb" onClick={navigateToBeautyDrinkProduct}>
                    <img src="/images/美妍飲/875589f1c2a794f35f547c2e08580c0f.jpg" alt="美妍飲" />
                  </div>
                  <div className="product-details">
                    <span className="product-catagory">美容保養</span>
                    <h4><a href="#" onClick={(e) => { e.preventDefault(); navigateToBeautyDrinkProduct(); }}>美妍飲</a></h4>
                    <p>膠原蛋白美肌飲，由內而外散發光彩</p>
                    <div className="product-bottom-details">
                      <div className="product-price"><small>NT$ 1,680</small>NT$ 1,380</div>
                      <div className="product-links">
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-heart"></i></a>
                        <a href="#" onClick={(e) => e.preventDefault()}><i className="fa fa-shopping-cart"></i></a>
                      </div>
                    </div>
                  </div>
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
