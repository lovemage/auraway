import React, { useState, useEffect } from 'react';
import './App.css';
import { buildApiUrl } from './config/api';
import ProductGrid from './components/ProductGrid';
import DynamicProductPage from './components/DynamicProductPage';
import AboutPage from './components/AboutPage';
import BrandStoryPage from './components/BrandStoryPage';
import HeaderInfo from './components/HeaderInfo';
import AuraPostPage from './components/AuraPostPage';
import EventPage from './components/EventPage';
import BabyMemberPage from './components/BabyMemberPage';
import WomenCards from './components/WomenCards';
import AurawayRecommendPage from './components/AurawayRecommendPage';
import FloatingAiButton from './components/FloatingAiButton';
import AiQuestionnaireModal from './components/AiQuestionnaireModal';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Admin UI 隱藏入口功能
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [logoClickTimer, setLogoClickTimer] = useState(null);

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
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    setMenuOpen(false);
  };

  // Logo 隱藏入口功能
  const handleLogoClick = (e) => {
    e.stopPropagation(); // 防止事件冒泡
    
    // 添加點擊動畫效果
    const logoElement = e.currentTarget;
    logoElement.classList.add('clicking');
    setTimeout(() => {
      logoElement.classList.remove('clicking');
    }, 300);
    
    // 清除之前的計時器
    if (logoClickTimer) {
      clearTimeout(logoClickTimer);
    }
    
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    // 如果點擊 5 次，跳轉到 Admin UI
    if (newCount >= 5) {
      // 重置計數
      setLogoClickCount(0);
      
      // 添加特殊動畫效果
      logoElement.classList.add('admin-hint');
      setTimeout(() => {
        logoElement.classList.remove('admin-hint');
      }, 500);
      
      // 顯示提示訊息
      setTimeout(() => {
        const confirmAccess = window.confirm('🎉 恭喜發現隱藏入口！\n🔐 是否要進入後台管理系統？');
        
        if (confirmAccess) {
          // 跳轉到本地 Admin UI
          if (process.env.NODE_ENV === 'development') {
            window.open('http://localhost:5001/admin.html', '_blank');
          } else {
            // 生產環境跳轉到 Vercel Admin UI
            window.open('https://auraway.vercel.app/admin', '_blank');
          }
        }
      }, 600);
      
      return;
    }
    
    // 顯示進度提示（3次以上時）
    if (newCount >= 3) {
      logoElement.classList.add('admin-hint');
      setTimeout(() => {
        logoElement.classList.remove('admin-hint');
      }, 500);
      
      // 顯示進度提示
      if (newCount === 3) {
        console.log('🔍 繼續點擊發現隱藏功能...');
      } else if (newCount === 4) {
        console.log('🔐 再點擊一次即可進入管理系統！');
      }
    }
    
    // 設置 3 秒後重置計數
    const timer = setTimeout(() => {
      setLogoClickCount(0);
    }, 3000);
    
    setLogoClickTimer(timer);
    
    // 如果不是第 5 次點擊，執行原本的導航功能
    if (newCount < 5) {
      navigateToHome();
    }
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

  const navigateToAurawayRecommend = () => {
    setCurrentPage('aurawayrecommend');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 搜尋功能
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
              const response = await fetch(buildApiUrl('/api/products/active'));
      const products = await response.json();
      
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        (product.tags && product.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        )) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(filteredProducts);
      setShowSearchResults(true);
    } catch (error) {
      console.error('搜尋錯誤:', error);
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    handleSearch(query);
  };

  const handleSearchResultClick = (product) => {
    navigateToProduct(product);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const handleSearchInputBlur = () => {
    // 延遲隱藏搜尋結果，讓用戶有時間點擊結果
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const handleSearchInputFocus = () => {
    if (searchQuery.trim() !== '' && searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
          <div className="logo-section" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img 
              src="/images/asset/logo-auraway.png" 
              alt="Auraway Shop" 
              style={{ height: '60px', width: 'auto' }}
            />
          </div>
          <div className="header-actions">
            <div className="search-box">
              <span className="material-icons">search</span>
              <input 
                type="text" 
                placeholder="搜尋產品..." 
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleSearchInputFocus}
                onBlur={handleSearchInputBlur}
              />
              {showSearchResults && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div 
                        key={product._id} 
                        className="search-result-item"
                        onClick={() => handleSearchResultClick(product)}
                      >
                        <img 
                          src={product.images && product.images.length > 0 ? product.images[0] : '/images/white-rainforest-qCDK3DN7lOs-unsplash.jpg'} 
                          alt={product.name}
                        />
                        <div className="search-result-info">
                          <h4>{product.name}</h4>
                          <p>NT$ {product.price}</p>
                          <span className="search-result-category">{product.category}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="search-no-results">
                      <span className="material-icons">search_off</span>
                      <p>找不到相關產品</p>
                    </div>
                  )}
                </div>
              )}
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
            <li onClick={navigateToAurawayRecommend}>Auraway推薦</li>
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
              <ProductGrid 
                onProductClick={navigateToProduct} 
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
      ) : currentPage === 'aurawayrecommend' ? (
        <AurawayRecommendPage onProductClick={navigateToProduct} />
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

      <FloatingAiButton onClick={handleOpenModal} />
      <AiQuestionnaireModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onProductSelect={navigateToProduct}
      />
    </div>
  );
}

export default App;
